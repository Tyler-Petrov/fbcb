#!/usr/bin/env bash
# Regenerate every Friendsgiving print file.
#   ./build.sh                       rebuild from event.toml
#   ./build.sh --url https://x.org   save the final website URL, then rebuild
set -euo pipefail
cd "$(dirname "$0")"
exec uv run --quiet --with weasyprint==70.0 --with segno==1.6.6 --with jinja2 python build.py "$@"
