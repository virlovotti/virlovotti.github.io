#!/bin/sh
# Renders scripts/og/og.html to public/og.png (1200×630) with headless Chrome.
set -e
cd "$(dirname "$0")/../.."

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
TMP="$(mktemp -d)"

"$CHROME" --headless=new --hide-scrollbars --disable-gpu \
  --force-device-scale-factor=2 --window-size=1200,630 \
  --virtual-time-budget=3000 \
  --screenshot="$TMP/og@2x.png" "file://$PWD/scripts/og/og.html" >/dev/null 2>&1

sips -z 630 1200 "$TMP/og@2x.png" --out public/og.png >/dev/null
rm -rf "$TMP"
echo "public/og.png"
