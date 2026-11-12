"""Build the FBCB Friendsgiving print files. Run through ./build.sh."""

from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
import tempfile
import tomllib
from pathlib import Path
from urllib.parse import urlparse

import segno
from jinja2 import Environment, FileSystemLoader, select_autoescape
from markupsafe import Markup, escape
from weasyprint import HTML

ROOT = Path(__file__).resolve().parent
CONFIG = ROOT / "event.toml"
OUT = ROOT / "out"
PLACEHOLDER_URL = "https://example.com/FBCB-PLACEHOLDER"

# QR ink is the church green. On the prints it sits on a cream tile, the way the
# cover photo sits in a cream mat on the website; standalone files use white.
QR_DARK = "#0f2f25"
QR_CREAM = "#f4eddc"


def set_url(url: str) -> None:
    parsed = urlparse(url)
    if parsed.scheme not in ("http", "https") or not parsed.netloc:
        sys.exit(f"--url must be a full http(s) address, got: {url!r}")
    text = CONFIG.read_text()
    text, n = re.subn(r'(?m)^site_url = ".*"$', f'site_url = "{url}"', text)
    if n != 1:
        sys.exit("Could not find the site_url line in event.toml")
    CONFIG.write_text(text)
    print(f"Saved site_url = {url} to event.toml")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--url", help="final website URL for the QR code (saved to event.toml)")
    args = ap.parse_args()
    if args.url:
        set_url(args.url.strip())

    cfg = tomllib.loads(CONFIG.read_text())
    missing: list[str] = []

    def field(key: str, label: str) -> Markup:
        value = str(cfg.get(key, "")).strip()
        if value:
            return escape(value)
        if label not in missing:
            missing.append(label)
        return Markup(f'<span class="ph">[ {escape(label)} ]</span>')

    url = str(cfg.get("site_url", "")).strip()
    final = bool(url)
    qr_data = url or PLACEHOLDER_URL
    if final:
        label = cfg.get("site_label", "").strip() or re.sub(
            r"^www\.", "", urlparse(url).netloc
        ) + urlparse(url).path.rstrip("/")
        site_label = escape(label)
    else:
        missing.append("WEBSITE URL")
        site_label = Markup('<span class="ph">[ WEBSITE URL ]</span>')

    # ---- QR code ---------------------------------------------------------
    qr = segno.make(qr_data, error="q", micro=False)
    qr_dir = OUT / "qr"
    if qr_dir.exists():
        shutil.rmtree(qr_dir)
    qr_dir.mkdir(parents=True)
    stem = "fbcb-website-qr" if final else "fbcb-website-qr-PLACEHOLDER"
    qr_svg = qr_dir / f"{stem}.svg"
    qr_png = qr_dir / f"{stem}.png"
    qr_pdf = qr_dir / f"{stem}-print.pdf"
    qr.save(qr_svg, scale=10, border=4, dark=QR_DARK, light="#ffffff")
    # 40 px per module: about 2,000 px wide, sharp at any print size used here.
    qr.save(qr_png, scale=40, border=4, dark=QR_DARK, light="#ffffff")
    # Vector copy for the print shop: 2 in. square, scales to any size.
    qr.save(qr_pdf, scale=144 / (qr.symbol_size(border=4)[0]), border=4, dark=QR_DARK)
    qr_inline = Markup(
        qr.svg_inline(scale=1, border=4, dark=QR_DARK, light=QR_CREAM, omitsize=True, svgclass="qr")
    )

    # ---- Render ----------------------------------------------------------
    env = Environment(
        loader=FileSystemLoader(ROOT / "templates"),
        autoescape=select_autoescape(["html"]),
    )
    # "9:30 a.m." -> "9:30 <small>a.m.</small>", the way the website sets times.
    env.filters["ampm"] = lambda v: Markup(
        re.sub(r"\s*([ap]\.m\.)", "&#8202;<small>\\1</small>", str(v))
    )
    method = str(cfg.get("rsvp_method", "text")).strip().lower()
    if method not in ("text", "call"):
        sys.exit(f'rsvp_method must be "text" or "call", got: {method!r}')
    ctx = dict(
        rsvp_text=method == "text",
        final=final,
        qr=qr_inline,
        site_label=site_label,
        rsvp_deadline=field("rsvp_deadline", "RSVP DEADLINE"),
        venue_address=field("venue_address", "COMMUNITY BUILDING ADDRESS"),
        church_address=field("church_address", "CHURCH STREET ADDRESS"),
        sunday_school_time=field("sunday_school_time", "TIME"),
        sunday_worship_time=field("sunday_worship_time", "TIME"),
        wednesday_study_time=field("wednesday_study_time", "TIME"),
        phone=escape(cfg["church_phone"]),
        pastor=escape(cfg["pastor"]),
        fonts=(ROOT / "fonts").as_uri(),
    )
    # The three weekly times share one label; report them separately.
    for key, name in [
        ("sunday_school_time", "SUNDAY SCHOOL TIME"),
        ("sunday_worship_time", "SUNDAY WORSHIP TIME"),
        ("wednesday_study_time", "WEDNESDAY BIBLE STUDY TIME"),
    ]:
        if not str(cfg.get(key, "")).strip():
            missing.append(name)
    if "TIME" in missing:
        missing.remove("TIME")

    jobs = [
        ("poster.html", "poster-11x14.pdf", dict(page_w="11in", page_h="14in")),
        ("poster.html", "poster-11x17-tabloid.pdf", dict(page_w="11in", page_h="17in")),
        ("door-hanger.html", "door-hanger-4.25x11.pdf", dict(two_up=False)),
        ("door-hanger.html", "door-hanger-2up-letter.pdf", dict(two_up=True)),
        ("table-tent.html", "table-tent-letter.pdf", {}),
    ]
    html_dir = OUT / "html"
    html_dir.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("*.pdf"):
        old.unlink()
    pdfs = []
    for template, pdf_name, extra in jobs:
        html = env.get_template(template).render(**ctx, **extra)
        html_path = html_dir / pdf_name.replace(".pdf", ".html")
        html_path.write_text(html)
        pdf_path = OUT / pdf_name
        HTML(string=html, base_url=str(ROOT)).write_pdf(pdf_path)
        pdfs.append(pdf_path)
        print(f"  wrote {pdf_path.relative_to(ROOT)}")

    # ---- Scan test -------------------------------------------------------
    print("\nScan test (zbarimg):")
    ok = scan(qr_png, qr_data)
    with tempfile.TemporaryDirectory() as tmp:
        svg_png = Path(tmp) / qr_svg.name
        subprocess.run(["rsvg-convert", "-w", "600", str(qr_svg), "-o", str(svg_png)], check=True)
        ok &= scan(svg_png, qr_data)
    for pdf in pdfs:
        ok &= scan_pdf(pdf, qr_data)
    if not ok:
        sys.exit("QR scan test FAILED")

    print()
    if missing:
        print("Still placeholders (shown as yellow boxes on the prints):")
        for m in missing:
            print(f"  - {m}")
        if not final:
            print(f"  QR currently encodes the dummy address {PLACEHOLDER_URL}")
    else:
        print("No placeholders left. Files in out/ are ready for the print shop.")


def zbar(path: Path) -> list[str]:
    r = subprocess.run(
        ["zbarimg", "--quiet", "--raw", "-Sdisable", "-Sqrcode.enable", str(path)],
        capture_output=True,
        text=True,
    )
    return [line for line in r.stdout.splitlines() if line]


def scan(path: Path, expected: str) -> bool:
    found = zbar(path)
    good = bool(found) and all(f == expected for f in found)
    print(f"  {'PASS' if good else 'FAIL'}  {path.name}: {found or 'no code found'}")
    return good


def scan_pdf(pdf: Path, expected: str) -> bool:
    # 150 dpi is a rough stand-in for a phone camera at arm's length.
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(
            ["pdftoppm", "-r", "150", "-png", str(pdf), f"{tmp}/p"], check=True
        )
        pages = sorted(Path(tmp).glob("p-*.png"))
        # Every PDF must carry the code somewhere, and every code must match.
        total = 0
        good = True
        for i, page in enumerate(pages, 1):
            found = zbar(page)
            total += len(found)
            page_ok = all(f == expected for f in found)
            good &= page_ok
            print(
                f"  {'PASS' if page_ok else 'FAIL'}  {pdf.name} p{i}: "
                f"{len(found)} code(s) {sorted(set(found)) if found else ''}"
            )
        if total == 0:
            print(f"  FAIL  {pdf.name}: no QR code found on any page")
        return good and total > 0


if __name__ == "__main__":
    main()
