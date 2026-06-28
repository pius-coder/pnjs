---
name: step-09-finish
description: DOX closeout and optional pull request - inspect diff, reconcile DOX, create PR
previous_step: step-08-run-tests.md (or step-04-validate.md if no tests)
---

# Step 9: Closeout, DOX Reconciliation & Optional PR

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 Call `set_mode({ mode: "plan" })` before starting this step (inspect diff, reconcile DOX)
- 🛑 After DOX reconciliation, call `set_mode({ mode: "build" })` before editing AGENTS.md
- 🛑 NEVER push without user confirmation (unless auto_mode)
- 🛑 NEVER create PR if there are uncommitted changes
- 🛑 NEVER skip DOX reconciliation (required every run)
- ✅ ALWAYS inspect the real diff (not the plan, not the todos)
- ✅ ALWAYS resolve DOX owners for every changed path
- ✅ ALWAYS reconcile DOX before optional PR
- 📋 YOU ARE A CLOSEOUT ENGINEER - reconcile, verify, then optionally ship
- 💬 FOCUS on "What actually changed? Does DOX still reflect reality?"
- 🚫 FORBIDDEN to make code changes (AGENTS.md edits are allowed)

## EXECUTION PROTOCOLS:

- 🎯 Inspect real diff first
- 💾 Save DOX reconciliation log (if save_mode)
- 📖 Resolve owning AGENTS.md for each changed path
- 🚫 FORBIDDEN to skip DOX reconciliation

## CONTEXT BOUNDARIES:

- All implementations and validations are complete
- `{actual_touched_paths}` contains every path that was modified
- DOX may need updates if contracts, paths, or capabilities changed
- Git holds the complete history - DOX holds current state only

---

<available_state>
From previous steps:

| Variable | Description |
|----------|-------------|
| `{task_description}` | What was implemented |
| `{task_id}` | Kebab-case identifier |
| `{auto_mode}` | Auto-approve decisions |
| `{save_mode}` | Save outputs to files |
| `{pr_mode}` | Create pull request at end |
| `{branch_name}` | Git branch name |
| `{actual_touched_paths}` | Paths actually modified |
| `{applicable_dox_chains}` | DOX chains from analysis |
| `{output_dir}` | Path to output (if save_mode) |
</available_state>

---

## EXECUTION SEQUENCE:

### 1. Initialize Save Output (if save_mode)

**If `{save_mode}` = true:**

```bash
bash {skill_dir}/scripts/update-progress.sh "{task_id}" "09" "finish" "in_progress"
```

Append closeout log to `{output_dir}/09-finish.md` as you work.

### 2. Phase 1 — Inspect the Real Change

**Do NOT rely on:**
- The plan
- The todos
- The agent's memory

**Use git to see what actually happened:**

```bash
git status --short
git diff --name-status
git diff
```

Record:
```markdown
## Final Diff

**Files changed:** {count} files

| Status | Path |
|--------|------|
| M      | `src/auth.ts` |
| A      | `src/suspension.ts` |
| D      | `src/old-auth.ts` |
```

### 3. Phase 2 — Resolve DOX Owners

**For every changed path, find the nearest owning AGENTS.md:**

```
Walk from changed path up to root:
  src/auth/users.ts
    → src/auth/ has no AGENTS.md
    → src/ has no AGENTS.md
    → backend/AGENTS.md owns it
    → root AGENTS.md is parent
```

```markdown
## DOX Ownership Resolution

| Path | Owning AGENTS.md |
|------|-----------------|
| `src/auth.ts` | `backend/AGENTS.md` |
| `src/suspension.ts` | `backend/AGENTS.md` |
```

For newly created paths, use the parent directory's DOX chain.

### 4. Phase 3 — Classify DOX Impact

| Class | Action | When |
|-------|--------|------|
| `NONE` | No change needed | Implementation detail, no contract/path/capability change |
| `UPDATE_LOCAL` | Edit the owning AGENTS.md | Contract, path, or verification changed |
| `UPDATE_PARENT` | Edit parent or its Child DOX Index | Ownership boundary or index changed |
| `CREATE_CHILD` | Create new child AGENTS.md | New durable boundary with its own rules |
| `MOVE` | Update source, remove old ref | Capability moved to new path |
| `REMOVE` | Remove stale capability/contract | Feature removed |

Assess each owning doc:

```markdown
## DOX Impact Classification

| Doc | Class | Reason |
|-----|-------|--------|
| `backend/AGENTS.md` | `UPDATE_LOCAL` | New suspension capability added |
| `AGENTS.md` | `NONE` | Root unchanged, child index unaffected |
```

### 5. Phase 4 — Reconcile DOX

**For each doc classified as UPDATE_LOCAL, UPDATE_PARENT, CREATE_CHILD, MOVE, or REMOVE:**

**5.1 Re-read the affected AGENTS.md**

**5.2 Apply changes:**

- Update capabilities with current paths
- Update contracts to reflect new behavior
- Fix stale paths and anchors
- Remove deleted references
- Update verification commands
- Update Child DOX Index if needed

**5.3 DOX rules for editing:**

- Add current capabilities: what exists now
- Modify contracts: what the code actually enforces now
- Correct locations: where things actually live
- Remove stale references: delete, don't annotate
- Update verification: commands that actually pass
- NO historical notes: "Was previously in...", "Changed on..."

**5.4 Example reconciliation blocks:**

```markdown
### User suspension
- Owns user suspension and status management.
- Source: `src/suspension.ts`
- Entry anchors: `suspendUser`, `reactivateUser`, `UserStatus`
- Contract: Suspended users cannot create sessions.
- Verification: `bun test src/suspension.test.ts`
```

### 6. Phase 5 — Verify DOX Integrity

For each modified DOX document:

- [ ] Every referenced path exists
- [ ] Every anchor symbol/route is findable (Grep)
- [ ] Every verification command exists
- [ ] Child DOX Index points to existing files
- [ ] No duplicated rules across docs
- [ ] Only current state, no history

### 7. Phase 6 — Report No-Change

When no DOX document requires modification:

```markdown
## Intentionally Unchanged Documentation

DOX reviewed: unchanged.
Reason: implementation detail changed without modifying a durable contract,
ownership boundary, workflow, path or verification command.
```

### 8. Phase 7 — Final Checks

Before committing, verify:
- No temporary work files are included.
- `.claude/output/apex/` is NOT included in the commit (unless explicitly required by project policy).
- All acceptance criteria are covered.
- No debug artifacts or secrets remain.

### 9. Phase 8 — Commit Changes

**If DOX files were modified:**
```bash
git add AGENTS.md backend/AGENTS.md  # (the modified DOX files)
git commit -m "docs: reconcile DOX after {task_id}"
```

**If implementation changes are uncommitted:**
```bash
git add -A
git commit -m "feat({task_id}): {task_description}"
```

### 10. Phase 9 — Optional Pull Request

**If `{pr_mode}` = true:**

**9.1 Check commits to push:**
```bash
git log origin/{branch_name}..HEAD --oneline 2>/dev/null || git log --oneline -5
```

**9.2 Confirm push (if not auto_mode)**

**If `{auto_mode}` = true:**
→ Auto-push to remote

**If `{auto_mode}` = false:**

```yaml
questions:
  - header: "Push"
    question: "Ready to push {branch_name} and create PR?"
    options:
      - label: "Push and create PR (Recommended)"
        description: "Push commits to remote and open pull request"
      - label: "Push only"
        description: "Push to remote without creating PR"
      - label: "Review commits first"
        description: "Show me the full diff before pushing"
      - label: "Cancel"
        description: "Don't push or create PR"
    multiSelect: false
```

**9.3 Push:**
```bash
git push -u origin {branch_name}
```

**9.4 Create PR:**
```bash
gh pr create --title "feat({task_id}): {task_description}" --body "$(cat <<'EOF'
## Summary

{task_description}

## Changes

{list of key changes}

## Testing

{how changes were validated}

---
_Generated by APEX workflow_
EOF
)"
```

**9.5 Capture PR URL:**
```bash
gh pr view --json url -q '.url'
```

**If `{pr_mode}` = false:**
→ Skip push and PR, finish locally

### 10. Save Output (if save_mode)

**If `{save_mode}` = true:**

Append to `{output_dir}/09-finish.md`: diff summary, DOX reconciliation results, PR URL (if created).

```bash
bash {skill_dir}/scripts/update-progress.sh "{task_id}" "09" "finish" "complete"
```

### 11. Final Summary

```
═══════════════════════════════════════════════════════
  APEX WORKFLOW COMPLETE
═══════════════════════════════════════════════════════

  Task: {task_description}
  ID: {task_id}

  ✓ Analysis (DOX-guided)
  ✓ Plan (change surfaces)
  ✓ Implementation complete
  ✓ Validation passed
  ✓ DOX reconciled
  {if pr_mode: "✓ PR created: {pr_url}"}

  DOX changes:
  - backend/AGENTS.md: updated suspension capability
  - AGENTS.md: unchanged

═══════════════════════════════════════════════════════
```

---

## SUCCESS METRICS:

✅ Real diff inspected (not plan, not memory)
✅ DOX owners resolved for every changed path
✅ DOX impact classified correctly
✅ DOX reconciled to reflect current state only
✅ DOX integrity verified (paths, anchors, commands)
✅ Unchanged docs reported with reason
✅ Changes committed with proper messages
✅ PR created (if pr_mode)
✅ Output saved (if save_mode)

## FAILURE MODES:

❌ Skipping DOX reconciliation
❌ Using plan/todos instead of real diff
❌ Adding history notes to DOX ("was previously...")
❌ Creating PR with uncommitted changes
❌ Pushing without user confirmation (when not auto_mode)
❌ Making code changes in this step (AGENTS.md is allowed)
❌ Force pushing without explicit user request
❌ **CRITICAL**: Using plain text prompts instead of AskUserQuestion

---

## WORKFLOW COMPLETE

This is the final step. No next step to load.

<critical>
Remember: This step reconciles DOX before optional PR.
DOX holds current state only - no history.
Inspect the real diff, not your memory of the plan.
</critical>
