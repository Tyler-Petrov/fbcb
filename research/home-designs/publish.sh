#!/bin/sh
# Publishes the three round-3 home page mocks to Page Drop as standalone pages.
# The stand-in photo is inlined, because Page Drop serves single files.
set -e
cd "$(dirname "$0")"
photo="data:image/svg+xml;base64,$(base64 -w0 photo-standin.svg)"
for name in 1-says-it-straight 2-one-screen 3-family-photo; do
	python3 -I -c 'import sys; sys.stdout.write(open(sys.argv[1]).read().replace("photo-standin.svg", sys.argv[2]))' \
		"$name.html" "$photo" | pagedrop publish - "fbcb/home-mocks/r3-$name" --replace
done
