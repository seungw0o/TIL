#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
readme="$ROOT/README.md"
template="$ROOT/.scripts/readme_template.md"
USE_INDEX="${SYNC_META_USE_INDEX:-0}"

declare -a INDEX_MD_FILES=()
declare -a INDEX_ALL_FILES=()

load_index_files() {
  local path

  while IFS= read -r -d '' path; do
    INDEX_ALL_FILES+=("$path")
    if [[ "$path" == *.md ]]; then
      INDEX_MD_FILES+=("$path")
    fi
  done < <(git -C "$ROOT" ls-files --cached -z)
}

list_index_immediate_files() {
  local prefix="$1"
  local file

  for file in "${INDEX_MD_FILES[@]}"; do
    if [[ "$file" == "$prefix"/* ]]; then
      local remainder="${file#"$prefix"/}"
      if [[ "$remainder" != */* ]]; then
        printf '%s\n' "$file"
      fi
    fi
  done | sort
}

list_index_immediate_dirs() {
  local prefix="$1"
  local file

  for file in "${INDEX_MD_FILES[@]}"; do
    if [[ "$file" == "$prefix"/* ]]; then
      local remainder="${file#"$prefix"/}"
      if [[ "$remainder" == */* ]]; then
        printf '%s\n' "${remainder%%/*}"
      fi
    fi
  done | sort -u
}

has_index_markdown_descendant() {
  local prefix="$1"
  local file

  for file in "${INDEX_MD_FILES[@]}"; do
    if [[ "$file" == "$prefix"/* ]]; then
      return 0
    fi
  done

  return 1
}

repeat_prefix() {
  local depth="$1"
  local prefix=""
  local i

  for ((i = 0; i < depth; i++)); do
    prefix+="┃   "
  done

  printf '%s' "$prefix"
}

print_link_line() {
  local depth="$1"
  local label="$2"
  local rel_path="$3"

  printf '%s┗━ [%s](<./%s>)</br>\n' "$(repeat_prefix "$depth")" "$label" "$rel_path"
}

has_markdown_descendant() {
  local dir="$1"

  if [[ "$USE_INDEX" == "1" ]]; then
    has_index_markdown_descendant "${dir#"$ROOT"/}"
    return
  fi

  find "$dir" -type f -name "*.md" -print -quit | grep -q .
}

render_flat_section() {
  local section="$1"
  local abs_dir="$ROOT/$section"
  local file

  if [[ "$USE_INDEX" == "1" ]]; then
    if ! list_index_immediate_files "$section" | grep -q .; then
      return
    fi

    print_link_line 0 "$section" "$section/"

    while IFS= read -r file; do
      local base
      local title
      base="$(basename "$file")"
      title="${base%.md}"
      print_link_line 1 "$title" "$file"
    done < <(list_index_immediate_files "$section")
    return
  fi

  if [[ ! -d "$abs_dir" ]]; then
    return
  fi

  print_link_line 0 "$section" "$section/"

  while IFS= read -r file; do
    local base
    local title
    base="$(basename "$file")"
    title="${base%.md}"
    print_link_line 1 "$title" "$section/$base"
  done < <(find "$abs_dir" -maxdepth 1 -type f -name "*.md" | sort)
}

render_recursive_section() {
  local abs_dir="$1"
  local rel_dir="$2"
  local depth="$3"
  local child_dir
  local file

  if [[ "$USE_INDEX" == "1" ]]; then
    if ! has_index_markdown_descendant "$rel_dir" && ! list_index_immediate_files "$rel_dir" | grep -q .; then
      return
    fi

    print_link_line "$depth" "$(basename "$rel_dir")" "$rel_dir/"

    while IFS= read -r child_dir; do
      render_recursive_section "$ROOT/$rel_dir/$child_dir" "$rel_dir/$child_dir" $((depth + 1))
    done < <(list_index_immediate_dirs "$rel_dir")

    while IFS= read -r file; do
      local base
      local title
      base="$(basename "$file")"
      title="${base%.md}"
      print_link_line $((depth + 1)) "$title" "$file"
    done < <(list_index_immediate_files "$rel_dir")
    return
  fi

  if [[ ! -d "$abs_dir" ]]; then
    return
  fi

  print_link_line "$depth" "$(basename "$abs_dir")" "$rel_dir/"

  while IFS= read -r child_dir; do
    render_recursive_section "$child_dir" "$rel_dir/$(basename "$child_dir")" $((depth + 1))
  done < <(
    find "$abs_dir" -mindepth 1 -maxdepth 1 -type d | sort | while IFS= read -r dir; do
      if has_markdown_descendant "$dir"; then
        printf '%s\n' "$dir"
      fi
    done
  )

  while IFS= read -r file; do
    local base
    local title
    base="$(basename "$file")"
    title="${base%.md}"
    print_link_line $((depth + 1)) "$title" "$rel_dir/$base"
  done < <(find "$abs_dir" -maxdepth 1 -type f -name "*.md" | sort)
}

render_language_section() {
  local subject_dir
  local theory_dir
  local file

  if [[ "$USE_INDEX" == "1" ]]; then
    local subject_name

    if ! has_index_markdown_descendant "Language"; then
      return
    fi

    print_link_line 0 "Language" "Language/"

    while IFS= read -r subject_name; do
      print_link_line 1 "$subject_name" "Language/$subject_name/"

      while IFS= read -r file; do
        local base
        local title
        base="$(basename "$file")"
        title="${base%.md}"
        print_link_line 2 "$title" "$file"
      done < <(list_index_immediate_files "Language/$subject_name/이론")
    done < <(
      for file in "${INDEX_MD_FILES[@]}"; do
        if [[ "$file" == Language/*/이론/*.md ]]; then
          local remainder="${file#Language/}"
          printf '%s\n' "${remainder%%/*}"
        fi
      done | sort -u
    )
    return
  fi

  if [[ ! -d "$ROOT/Language" ]]; then
    return
  fi

  print_link_line 0 "Language" "Language/"

  while IFS= read -r subject_dir; do
    theory_dir="$subject_dir/이론"
    if [[ ! -d "$theory_dir" ]]; then
      continue
    fi

    if ! find "$theory_dir" -maxdepth 1 -type f -name "*.md" -print -quit | grep -q .; then
      continue
    fi

    print_link_line 1 "$(basename "$subject_dir")" "Language/$(basename "$subject_dir")/"

    while IFS= read -r file; do
      local base
      local title
      base="$(basename "$file")"
      title="${base%.md}"
      print_link_line 2 "$title" "Language/$(basename "$subject_dir")/이론/$base"
    done < <(find "$theory_dir" -maxdepth 1 -type f -name "*.md" | sort)
  done < <(find "$ROOT/Language" -mindepth 1 -maxdepth 1 -type d | sort)
}

generate_project_tree() {
  if [[ "$USE_INDEX" == "1" ]]; then
    load_index_files
  fi

  render_flat_section "Books"
  render_flat_section "CS"
  render_recursive_section "$ROOT/CodingTest" "CodingTest" 0
  render_language_section
}

generate_readme() {
  cp -f "$template" "$readme"
  generate_project_tree |
    LC_ALL=C LANG=C perl -p0e 's/(?:__PROJECT_TREE__|\*\*PROJECT_TREE\*\*)/`cat`/se' -i "$readme"
}

generate_readme
git add "$readme"
