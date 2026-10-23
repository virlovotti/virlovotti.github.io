#!/bin/sh
# Renders public/favicon.svg to PNG/ICO assets (white mark, transparent outside).
set -e
cd "$(dirname "$0")/../.."

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
SRC="$PWD/public/favicon.svg"
TMP="$(mktemp -d)"

"$CHROME" --headless=new --hide-scrollbars --disable-gpu \
  --force-device-scale-factor=1 --window-size=512,512 \
  --default-background-color=00000000 \
  --virtual-time-budget=1000 \
  --screenshot="$TMP/base.png" "file://$SRC" >/dev/null 2>&1

for size in 16 32 180 192 512; do
  case "$size" in
    16) out=public/favicon-16x16.png ;;
    32) out=public/favicon-32x32.png ;;
    180) out=public/apple-touch-icon.png ;;
    192) out=public/android-chrome-192x192.png ;;
    512) out=public/android-chrome-512x512.png ;;
  esac
  sips -z "$size" "$size" "$TMP/base.png" --out "$out" >/dev/null
done

npx --yes -p png-to-ico node --input-type=module -e "
import pngToIco from 'png-to-ico';
import { writeFileSync } from 'fs';
const buf = await pngToIco(['public/favicon-16x16.png', 'public/favicon-32x32.png']);
writeFileSync('public/favicon.ico', buf);
" >/dev/null 2>&1

rm -rf "$TMP"
echo "Updated favicon PNG/ICO in public/"
