#!/usr/bin/env bash
# Cursor Cloud portable-core contract (keep twins in lockstep):
#   1. No Mini secrets, App tokens, board PATs, MainVault, or .env copies.
#   2. Fail closed if a required prove tool is missing.
#   3. Prove is the repo's secret-free core — not a Mini-only path.
#   4. GitHub Actions job cursor-cloud-setup on ubuntu-latest must stay green.
# Portable Cloud prove: static site files present. No build toolchain.
set -euo pipefail

ROOT_DIR="${CURSOR_CLOUD_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"

required=(
  "$ROOT_DIR/index.html"
  "$ROOT_DIR/docs/DESIGN.md"
  "$ROOT_DIR/assets/styles/theme.css"
  "$ROOT_DIR/visualizations/webgl-formations.html"
)

for path in "${required[@]}"; do
  if [ ! -s "$path" ]; then
    echo "setup-cursor-cloud: missing or empty $path" >&2
    exit 1
  fi
done

echo "setup-cursor-cloud: static site files ok"
echo "setup-cursor-cloud: environment ready"
