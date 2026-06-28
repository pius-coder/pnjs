#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 3 ]]; then
  echo "Usage: $0 TASK_ID STEP_NUMBER STATUS" >&2
  exit 2
fi

TASK_ID="$1"
STEP_NUMBER="$2"
STATUS="$3"

PROJECT_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
CONTEXT="${PROJECT_ROOT}/.claude/output/apex/${TASK_ID}/00-context.md"

if [[ ! -f "$CONTEXT" ]]; then
  echo "Missing context file: ${CONTEXT}" >&2
  exit 1
fi

python3 - "$CONTEXT" "$STEP_NUMBER" "$STATUS" <<'PY'
from pathlib import Path
import re, sys

path = Path(sys.argv[1])
step = int(sys.argv[2])
status = sys.argv[3]

text = path.read_text()
pattern = re.compile(rf"^(\| {step:02d} [^|]+\|) [^|]+(\|)$", re.M)
new_text, count = pattern.subn(rf"\1 {status} \2", text)
if count != 1:
    raise SystemExit(f"Could not update step {step:02d} in {path}")

# Also update status display values
status_map = {
    "in_progress": "⏳ In Progress",
    "complete": "✓ Complete",
    "pending": "⏸ Pending",
    "skip": "⏭ Skip",
}
display = status_map.get(status, status)
new_text2, count2 = pattern.subn(rf"\1 {display} \2", new_text)

path.write_text(new_text2)
PY
