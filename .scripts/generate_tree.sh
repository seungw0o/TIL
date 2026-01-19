#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
readme="$ROOT/README.md"
template="$ROOT/.scripts/readme_template.md"

TREE_BIN="${TREE_BIN:-$(command -v tree || true)}"
SED_BIN="${SED_BIN:-$(command -v gsed || true)}"

if [[ -z "$TREE_BIN" ]]; then
  echo "tree not found. Install with 'brew install tree'." >&2
  exit 1
fi

if [[ -z "$SED_BIN" ]]; then
  echo "gsed not found. Install with 'brew install gnu-sed'." >&2
  exit 1
fi

generate_project_tree() {
  # Only include theory directories (이론) and their Markdown files
  LC_ALL=C LC_COLLATE=C LC_CTYPE=en_US.UTF-8 LANG=en_US.UTF-8 \
  "$TREE_BIN" "$ROOT/Language" -f --dirsfirst --noreport --charset ascii -N \
    --matchdirs -P "*이론*|*.md" --prune |
    "$SED_BIN" -e 's/[|]-\+/┗━/g' \
              -e 's/[|]/┃/g' \
              -e 's/[`]/┗━/g' \
              -e 's/[-]/━/g' \
              -e "s:\(━ \)\(\(.*/\)\([^/]\+\)\):\1[**\4**](<\2>)</br>:g" \
              -e "s:\[\*\*\(.*\)\.md\*\*\]:[\1]:g" \
              -e "s=$ROOT/=./=g" \
              -e "s=$ROOT=./TIL</br>=g" \
              -e 's/━━━/━/g' \
              -e 's/[ ]/　/g' \
              -e ':a;s/\(<[^>]*\)　/\1 /g;ta'
}

generate_readme() {
  cp -f "$template" "$readme"
  generate_project_tree |
    LANG="UTF-8" perl -p0e 's/__PROJECT_TREE__/`cat`/se' -i "$readme"
}

generate_readme
git add "$readme"