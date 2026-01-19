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
  # Find only '이론' directories under Language and render each tree
  while IFS= read -r THEORY_DIR; do
    LC_ALL=C LC_COLLATE=C LC_CTYPE=en_US.UTF-8 LANG=en_US.UTF-8 \
    "$TREE_BIN" "$THEORY_DIR" -f --dirsfirst --noreport --charset ascii -N \
      | sed '1d' \
      | "$SED_BIN" -e 's/[|]-\+/┗━/g' \
                    -e 's/[|]/┃/g' \
                    -e 's/[`]/┗━/g' \
                    -e 's/[-]/━/g' \
                    -e "s:\(━ \)\(\(.*/\)\([^/]\+\)\):\1[**\4**](<\2>)</br>:g" \
                    -e "s:\[\*\*\(.*\)\.md\*\*\]:[\1]:g" \
                    -e "s=$ROOT/=./=g" \
                    -e 's/━━━/━/g' \
                    -e 's/[ ]/　/g' \
                    -e ':a;s/\(<[^>]*\)　/\1 /g;ta'
  done < <(find "$ROOT/Language" -type d -name "이론" | sort)
}

generate_readme() {
  cp -f "$template" "$readme"
  generate_project_tree |
    LC_ALL=C LANG=C perl -p0e 's/__PROJECT_TREE__/`cat`/se' -i "$readme"
}

generate_readme
git add "$readme"