---
name: step-03-execute
description: Surface-driven implementation - execute the plan by change surface
prev_step: steps/step-02-plan.md
next_step: steps/step-04-validate.md
---

# Step 3: Execute (Surface-Driven Implementation)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 Call `set_mode({ mode: "plan" })` before starting this step (read context first)
- 🛑 After reading surface context, call `set_mode({ mode: "build" })` before editing
- 🛑 NEVER deviate from the approved plan
- 🛑 NEVER add features not in the plan (scope creep)
- 🛑 NEVER modify a surface without reading its context first
- ✅ ALWAYS follow the plan by change surface
- ✅ ALWAYS mark todos complete immediately after each task
- ✅ ALWAYS track actual touched paths and symbols
- 📋 YOU ARE AN IMPLEMENTER following a plan, not a designer
- 💬 FOCUS on executing the plan exactly as approved
- 🚫 FORBIDDEN to add "improvements" not in the plan

## EXECUTION PROTOCOLS:

- 🎯 Create todos by surface before starting
- 💾 Track `{actual_touched_paths}` and `{actual_touched_symbols}`
- 📖 Read surface context (not full file) before editing
- 🚫 FORBIDDEN to have multiple todos in_progress simultaneously

## CONTEXT BOUNDARIES:

- Plan from step-02 is approved and must be followed
- Change surfaces with anchors are known from the plan
- Read surface context, not complete files

## YOUR TASK:

Execute the approved plan by change surface, tracking what is actually modified.

---

<available_state>
From previous steps:

| Variable | Description |
|----------|-------------|
| `{task_description}` | What to implement |
| `{task_id}` | Kebab-case identifier |
| `{auto_mode}` | Skip confirmations |
| `{save_mode}` | Save outputs to files |
| `{change_surfaces}` | Planned surfaces from step-02 |
| `{output_dir}` | Path to output (if save_mode) |
| `{actual_touched_paths}` | Starts empty, filled during execution |
| DOX chains | From step-01 analysis |
</available_state>

---

## EXECUTION SEQUENCE:

### 1. Initialize Save Output (if save_mode)

**If `{save_mode}` = true:**

```bash
bash {skill_dir}/scripts/update-progress.sh "{task_id}" "03" "execute" "in_progress"
```

Append logs to `{output_dir}/03-execute.md` as you work.

### 2. Create Surface Todos

Convert each surface from the plan into todos:

```
Surface entry:
### Surface: users.suspension
**Changes:**
- Add suspended status to UserStatus
- Reject invalid state transitions
- Persist the status

Becomes:
- [ ] users.suspension: update state contract
- [ ] users.suspension: persist status
- [ ] auth.session-policy: reject suspended users
```

Use TodoWrite to create the full list.

### 3. Execute by Surface

For each surface:

**3.1 Read Surface Context**

```
Read the surface context (NOT the full file):
1. DOX chain applicable to this surface
2. Target anchor symbol/route
3. Types and contracts consumed (imports)
4. Directly called local functions
5. Affected test files
```

**Full-file reading only when:**
- File is small (< 50 lines)
- Modification affects file structure (imports, exports, bootstrap)
- No stable anchor exists

**3.2 Implement Changes**

```
Make changes for this surface:
- Follow patterns from DOX + analysis
- Use exact names from plan
- Handle error cases as specified
- NO comments unless truly necessary
```

**3.3 Track Actual Changes**

After each modification, update:

```
{actual_touched_paths} += path
{actual_touched_symbols} += symbol_name
```

**3.4 Mark Complete Immediately**
- Mark todo complete RIGHT AFTER finishing
- Don't batch completions

**3.5 Log Progress (if save_mode)**
```markdown
### ✓ {surface_name}
- Modified `{path}`: `{symbol}` (what changed)
**Timestamp:** {ISO}
```

### 3.6 Database changes (if applicable)

When modifying persistence:
- Express the same logical change across supported dialects.
- Do not assume SQL compatibility without verification.
- Update migrations and tests actually needed.
- Do not scan migration history if a reliable current snapshot exists.
- Use Git for history, DOX for current state.

### 4. Handle Plan Deviations

When a new file must be modified but wasn't in the plan:

```
1. Suspend the current todo
2. Resolve its DOX chain (find the owning AGENTS.md)
3. Read the relevant DOX
4. Identify the surface
5. Add to execution plan
6. Note in {plan_deviations}
7. Continue
```

**If `{auto_mode}` = true:**
→ Make reasonable decision and continue

**If `{auto_mode}` = false:**

```yaml
questions:
  - header: "Deviation"
    question: "New file discovered outside plan. How proceed?"
    options:
      - label: "Add to execution (Recommended)"
        description: "Include the new file in current task"
      - label: "Skip"
        description: "Continue without this change"
      - label: "Discuss"
        description: "I want to review before proceeding"
    multiSelect: false
```

### 5. Verify Implementation

After completing all todos:

```bash
pnpm run typecheck && pnpm run lint --fix
# OR use DOX Verification section first
```

Fix any errors immediately.

### 6. Implementation Summary

```
**Implementation Complete**

**Surfaces completed:** {count}
**Files modified:**
- `{path}` - {changes summary}

**Plan deviations:** {count}
- {description of each deviation}

**Touched paths tracked:** {count}
**Pending validation:** typecheck, lint, tests
```

**If `{auto_mode}` = true:**
→ Proceed to validation

**If `{auto_mode}` = false:**

```yaml
questions:
  - header: "Execute"
    question: "Implementation complete. Ready to validate?"
    options:
      - label: "Proceed to validation (Recommended)"
        description: "Run typecheck, lint, and tests"
      - label: "Review changes"
        description: "I want to review what was changed"
      - label: "Make adjustments"
        description: "I want to modify something"
    multiSelect: false
```

### 7. Complete Save Output (if save_mode)

**If `{save_mode}` = true:**

Append to `{output_dir}/03-execute.md`:
```markdown
---
## Step Complete
**Status:** ✓ Complete
**Surfaces completed:** {count}
**Actual touched paths:** {list}
**Actual touched anchors:** {list}
**Plan deviations:** {count}
**Next:** step-04-validate.md
**Timestamp:** {ISO timestamp}
```

---

## SUCCESS METRICS:

✅ All surfaces implemented
✅ Surface context read before modification (not full file)
✅ Actual touched paths and symbols tracked
✅ No scope creep - only plan items
✅ Plan deviations documented
✅ Typecheck and lint pass
✅ Progress logged (if save_mode)

## FAILURE MODES:

❌ Adding features not in the plan
❌ Reading full files by default instead of surface context
❌ Not tracking actual_touched_paths
❌ Not updating todos as you work
❌ Multiple todos in_progress simultaneously
❌ Ignoring type or lint errors
❌ **CRITICAL**: Not using AskUserQuestion for blockers

## EXECUTION PROTOCOLS:

- Follow the plan EXACTLY
- Read surface context, not full file
- One surface at a time
- Track actual touched paths
- Update todos in real-time
- Fix errors immediately

---

## NEXT STEP:

After implementation complete, load `./step-04-validate.md`

<critical>
Remember: Execution is about following the plan by surface - don't redesign or add features!
Read surface context, not complete files!
</critical>
