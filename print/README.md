# Friendsgiving print materials

All details live in `event.toml`. Blank values print as yellow `[ PLACEHOLDER ]` boxes.

```sh
./build.sh                                  # rebuild everything
./build.sh --url https://final-site.org     # save the website URL, then rebuild
```

Each build regenerates the QR code, every PDF, and `out/qr/`. It then scans the
QR code in the PNG, the SVG, and every PDF page with zbarimg and stops with an
error if any of them is wrong. When nothing is left to fill in, it prints
"No placeholders left".

## What to take to FedEx Office (copy everything in `out/` except `html/`)

| File | Paper | Notes |
| --- | --- | --- |
| `poster-11x17-tabloid.pdf` | 11×17, color, heavy paper or cardstock | Standard sheet, no trimming |
| `poster-11x14.pdf` | 11×14, color | Usually printed on 11×17 and trimmed |
| `door-hanger-2up-letter.pdf` | 8.5×11 cardstock (80–100 lb cover), color, **double-sided, flip on long edge** | Cut down the middle into two 4.25×11 hangers. Cut out the dashed hole and slit by hand or with a punch. |
| `door-hanger-4.25x11.pdf` | Same design, one per page | Use if the shop prefers to impose it themselves |
| `table-tent-letter.pdf` | 8.5×11 cardstock, color, **single-sided** | Fold across the middle (tick marks at the edges) |

The QR code is also in `out/qr/` as SVG and PNG, for the website, Facebook, or the bulletin.
