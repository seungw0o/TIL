#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
readme="$ROOT/README.md"
template="$ROOT/.scripts/readme_template.md"

# Build a simple tree with category headers (JavaScript/NextJs/React) and markdown links under '이론'
generate_project_tree() {
  while IFS= read -r THEORY_DIR; do
    CATEGORY_DIR="$(dirname "$THEORY_DIR")"
    CATEGORY_NAME="$(basename "$CATEGORY_DIR")"
    REL_CATEGORY="./${CATEGORY_DIR#"$ROOT/"}"
    echo "┗━ [${CATEGORY_NAME}](<${REL_CATEGORY}/>)</br>"

    # List markdown files directly under the theory directory
    while IFS= read -r FILE; do
      BASE="$(basename "$FILE")"
      TITLE="${BASE%.md}"
      REL_FILE="./${FILE#"$ROOT/"}"
      echo "┃   ┗━ [${TITLE}](<${REL_FILE}>)</br>"
    done < <(find "$THEORY_DIR" -maxdepth 1 -type f -name "*.md" | sort)
  done < <(find "$ROOT/Language" -type d -name "이론" | sort)
}

generate_readme() {
  cp -f "$template" "$readme"
  generate_project_tree |
    LC_ALL=C LANG=C perl -p0e 's/__PROJECT_TREE__/`cat`/se' -i "$readme"
}

generate_readme
git add "$readme"