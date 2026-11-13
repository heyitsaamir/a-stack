#!/usr/bin/env bash
# Symlink each skill in this repo into ~/.claude/skills (or $SKILLS_TARGET).
# Skips names already taken by something else, and removes links to skills
# that no longer exist here.
set -euo pipefail

repo="$(cd "$(dirname "$0")/.." && pwd)"
target="${SKILLS_TARGET:-$HOME/.claude/skills}"
mkdir -p "$target"

for dir in "$repo"/skills/*/; do
  dir="${dir%/}"
  [ -f "$dir/SKILL.md" ] || continue
  name="$(basename "$dir")"
  link="$target/$name"
  if [ -L "$link" ]; then
    [ "$(readlink "$link")" = "$dir" ] && continue
    echo "skip $name: $link already links to $(readlink "$link")" >&2
  elif [ -e "$link" ]; then
    echo "skip $name: $link already exists" >&2
  else
    ln -s "$dir" "$link"
    echo "linked $name"
  fi
done

for link in "$target"/*; do
  [ -L "$link" ] || continue
  case "$(readlink "$link")" in
    "$repo"/skills/*)
      if [ ! -e "$link" ]; then
        rm "$link"
        echo "removed stale link $(basename "$link")"
      fi
      ;;
  esac
done
