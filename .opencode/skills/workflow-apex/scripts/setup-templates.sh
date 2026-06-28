#!/usr/bin/env bash
set -euo pipefail

# APEX Template Setup Script
# Creates output directory structure and initializes template files
#
# Usage: setup-templates.sh FEATURE_NAME TASK_DESCRIPTION AUTO EXAMINE SAVE TEST ECONOMY BRANCH PR INTERACTIVE BRANCH_NAME ORIGINAL_INPUT

FEATURE_NAME="${1:-}"
TASK_DESCRIPTION="${2:-}"
AUTO_MODE="${3:-false}"
EXAMINE_MODE="${4:-false}"
SAVE_MODE="${5:-false}"
TEST_MODE="${6:-false}"
ECONOMY_MODE="${7:-false}"
BRANCH_MODE="${8:-false}"
PR_MODE="${9:-false}"
INTERACTIVE_MODE="${10:-false}"
BRANCH_NAME="${11:-}"
ORIGINAL_INPUT="${12:-}"

if [[ -z "$FEATURE_NAME" ]]; then echo "Error: FEATURE_NAME is required"; exit 1; fi
if [[ -z "$TASK_DESCRIPTION" ]]; then echo "Error: TASK_DESCRIPTION is required"; exit 1; fi

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Resolve project root via git
PROJECT_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
APEX_OUTPUT_DIR="${PROJECT_ROOT}/.claude/output/apex"
mkdir -p "$APEX_OUTPUT_DIR"

# Find next available task number
NEXT_NUM=1
if [[ -d "$APEX_OUTPUT_DIR" ]]; then
  HIGHEST="$(ls -1 "$APEX_OUTPUT_DIR" 2>/dev/null | grep -oE '^[0-9]+' | sort -n | tail -1)"
  if [[ -n "$HIGHEST" ]]; then
    NEXT_NUM=$((10#$HIGHEST + 1))
  fi
fi

TASK_NUM=$(printf "%02d" "$NEXT_NUM")
TASK_ID="${TASK_NUM}-${FEATURE_NAME}"
OUTPUT_DIR="${APEX_OUTPUT_DIR}/${TASK_ID}"

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMPLATE_DIR="${SKILL_DIR}/templates"

mkdir -p "$OUTPUT_DIR"

render_template() {
  local template_file="$1"
  local output_file="$2"

  local examine_status="⏭ Skip"
  [[ "$EXAMINE_MODE" == "true" ]] && examine_status="⏸ Pending"

  local test_status="⏭ Skip"
  [[ "$TEST_MODE" == "true" ]] && test_status="⏸ Pending"

  # 09-finish is always created
  local finish_status="⏸ Pending"

  python3 - "${template_file}" "${output_file}" \
    "${TASK_ID}" "${TASK_DESCRIPTION}" "${TIMESTAMP}" \
    "${AUTO_MODE}" "${EXAMINE_MODE}" "${SAVE_MODE}" "${TEST_MODE}" \
    "${ECONOMY_MODE}" "${BRANCH_MODE}" "${PR_MODE}" "${INTERACTIVE_MODE}" \
    "${BRANCH_NAME}" "${ORIGINAL_INPUT}" \
    "${examine_status}" "${test_status}" "${finish_status}" <<'PY'
import sys, re
from pathlib import Path

tmpl, out = Path(sys.argv[1]), Path(sys.argv[2])
args = sys.argv[3:]
keys = [
    "task_id", "task_description", "timestamp",
    "auto_mode", "examine_mode", "save_mode", "test_mode",
    "economy_mode", "branch_mode", "pr_mode", "interactive_mode",
    "branch_name", "original_input",
    "examine_status", "test_status", "finish_status",
]

text = tmpl.read_text()
for k, v in zip(keys, args):
    text = text.replace("{{" + k + "}}", v)
out.write_text(text)
PY
}

render_template "${TEMPLATE_DIR}/00-context.md" "${OUTPUT_DIR}/00-context.md"
render_template "${TEMPLATE_DIR}/01-analyze.md" "${OUTPUT_DIR}/01-analyze.md"
render_template "${TEMPLATE_DIR}/02-plan.md" "${OUTPUT_DIR}/02-plan.md"
render_template "${TEMPLATE_DIR}/03-execute.md" "${OUTPUT_DIR}/03-execute.md"
render_template "${TEMPLATE_DIR}/04-validate.md" "${OUTPUT_DIR}/04-validate.md"

if [[ "$EXAMINE_MODE" == "true" ]]; then
  render_template "${TEMPLATE_DIR}/05-examine.md" "${OUTPUT_DIR}/05-examine.md"
  render_template "${TEMPLATE_DIR}/06-resolve.md" "${OUTPUT_DIR}/06-resolve.md"
fi

if [[ "$TEST_MODE" == "true" ]]; then
  render_template "${TEMPLATE_DIR}/07-tests.md" "${OUTPUT_DIR}/07-tests.md"
  render_template "${TEMPLATE_DIR}/08-run-tests.md" "${OUTPUT_DIR}/08-run-tests.md"
fi

# Always create 09-finish.md (DOX closeout + optional PR)
render_template "${TEMPLATE_DIR}/09-finish.md" "${OUTPUT_DIR}/09-finish.md"

echo "TASK_ID=${TASK_ID}"
echo "OUTPUT_DIR=${OUTPUT_DIR}"
exit 0
