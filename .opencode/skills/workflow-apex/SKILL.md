---
name: apex
description: Systematic implementation using APEX methodology (Analyze-Plan-Execute-eXamine) with DOX-guided context, change-surface planning, self-validation, and optional adversarial review. Use when implementing features, fixing bugs, or making code changes that benefit from structured workflow.
license: MIT
compatibility: opencode
metadata:
  methodology: APEX
  context: DOX
  runtime: opencode
argument-hint: "[-a] [-x] [-s] [-t] [-b] [-pr] [-i] [-r <task-id>] <task description>"
---

<objective>
Execute systematic implementation workflows using the APEX methodology integrated with DOX. This skill uses DOX as the primary navigation contract, progressive step loading to minimize context usage, and supports saving outputs for review and resumption.
</objective>

<dox_contract>

DOX is the primary navigation contract for all APEX executions.

- Read the applicable DOX chain before any code exploration.
- Use DOX to locate code, never as a replacement for code verification.
- Reconcile DOX after the final validated change.
- DOX represents current state only.

</dox_contract>

<quick_start>
**Basic usage:**

```bash
/apex add authentication middleware
```

**Recommended workflow (autonomous with save):**

```bash
/apex -a -s implement user registration
```

**With adversarial review:**

```bash
/apex -a -x -s fix login bug
```

**Flags:**

- `-a` (auto): Skip confirmations
- `-s` (save): Save outputs to `.claude/output/apex/`
- `-x` (examine): Include adversarial code review
- `-t` (test): Create and run tests
- `-pr` (pull-request): Create PR at end

See `<parameters>` for complete flag list.
</quick_start>

<parameters>

<flags>
**Enable flags (turn ON):**
| Short | Long | Description |
|-------|------|-------------|
| `-a` | `--auto` | Autonomous mode: skip confirmations, auto-approve plans |
| `-x` | `--examine` | Auto-examine mode: proceed to adversarial review |
| `-s` | `--save` | Save mode: output each step to `.claude/output/apex/` |
| `-t` | `--test` | Test mode: include test creation and runner steps |
| `-e` | `--economy` | Economy mode: no subagents, save tokens (for limited plans) |
| `-r` | `--resume` | Resume mode: continue from a previous task |
| `-b` | `--branch` | Branch mode: verify not on main, create branch if needed |
| `-pr` | `--pull-request` | PR mode: create pull request at end (enables -b) |
| `-i` | `--interactive` | Interactive mode: configure flags via AskUserQuestion |

**Disable flags (turn OFF):**
| Short | Long | Description |
|-------|------|-------------|
| `-A` | `--no-auto` | Disable auto mode |
| `-X` | `--no-examine` | Disable examine mode |
| `-S` | `--no-save` | Disable save mode |
| `-T` | `--no-test` | Disable test mode |
| `-E` | `--no-economy` | Disable economy mode |
| `-B` | `--no-branch` | Disable branch mode |
| `-PR` | `--no-pull-request` | Disable PR mode |
</flags>

<examples>
```bash
# Basic
/apex add auth middleware

# Autonomous (skip confirmations)
/apex -a add auth middleware

# Save outputs + examine
/apex -a -x -s add auth middleware

# Full workflow with tests
/apex -a -x -s -t add auth middleware

# With PR creation
/apex -a -pr add auth middleware

# Resume previous task
/apex -r 01-auth-middleware
/apex -r 01  # Partial match

# Economy mode (save tokens)
/apex -e add auth middleware

# Interactive flag config
/apex -i add auth middleware

# Disable flags (uppercase)
/apex -A add auth middleware  # Disable auto
```
</examples>

<parsing_rules>
**Flag parsing:**

1. Defaults loaded from `steps/step-00-init.md` `<defaults>` section
2. Command-line flags override defaults (enable with lowercase `-x`, disable with uppercase `-X`)
3. Flags removed from input, remainder becomes `{task_description}`
4. Task ID generated as `NN-kebab-case-description`

For detailed parsing algorithm, see `steps/step-00-init.md`.
</parsing_rules>

</parameters>

<output_structure>
**When `{save_mode}` = true:**

All outputs saved to PROJECT directory (where Claude Code is running):
```

.claude/output/apex/{task-id}/
├── 00-context.md # Params, user request, timestamp, DOX
├── 01-analyze.md # DOX-guided analysis findings
├── 02-plan.md # Change-surface implementation plan
├── 03-execute.md # Surface-driven execution log
├── 04-validate.md # Validation results
├── 05-examine.md # Review findings (if -x)
├── 06-resolve.md # Resolution log (if -x)
├── 07-tests.md # Test analysis and creation (if --test)
├── 08-run-tests.md # Test runner log (if --test)
└── 09-finish.md # DOX closeout and optional PR creation

````

**00-context.md structure:**
```markdown
# APEX Task: {task_id}

**Created:** {timestamp}
**Task:** {task_description}

## Flags
- Auto mode: {auto_mode}
- Examine mode: {examine_mode}
- Save mode: {save_mode}
- Test mode: {test_mode}

## DOX
- Root contract: `AGENTS.md`
- Reconciliation: pending

## User Request
{original user input}

## Acceptance Criteria
- [ ] AC1: {inferred criterion}
- [ ] AC2: {inferred criterion}
````

</output_structure>

<resume_workflow>
**Resume mode (`-r {task-id}`):**

When provided, step-00 will:

1. Locate the task folder in `.claude/output/apex/`
2. Restore state from `00-context.md`
3. Find the last completed step
4. Continue from the next step

Supports partial matching (e.g., `-r 01` finds `01-add-auth-middleware`).

DOX is re-read on resume (never cached from a previous session).

For implementation details, see `steps/step-00-init.md`.
</resume_workflow>

<workflow>
**Standard flow:**
1. Parse flags and task description
2. If `-r`: Execute resume workflow
3. If `-s`: Create output folder and 00-context.md
4. Load step-01-analyze.md → DOX-guided current-state analysis
5. Load step-02-plan.md → change-surface planning
6. Load step-03-execute.md → surface-driven implementation
7. Load step-04-validate.md → verify
8. If `--test`: Load step-07-tests.md → analyze and create tests
9. If `--test`: Load step-08-run-tests.md → run until green
10. If `-x` or user requests: Load step-05-examine.md → adversarial review
11. If findings: Load step-06-resolve.md → fix findings
12. Always load step-09-finish.md → DOX closeout and optional pull request
</workflow>

<state_variables>
**Persist throughout all steps:**

| Variable                | Type    | Description                                            |
| ----------------------- | ------- | ------------------------------------------------------ |
| `{task_description}`    | string  | What to implement (flags removed)                      |
| `{feature_name}`        | string  | Kebab-case name without number (e.g., `add-auth-middleware`) |
| `{task_id}`             | string  | Full identifier with number (e.g., `01-add-auth-middleware`) |
| `{acceptance_criteria}` | list    | Success criteria (inferred or explicit)                |
| `{auto_mode}`           | boolean | Skip confirmations, use recommended options            |
| `{examine_mode}`        | boolean | Auto-proceed to adversarial review                     |
| `{save_mode}`           | boolean | Save outputs to .claude/output/apex/                   |
| `{test_mode}`           | boolean | Include test steps (07-08)                             |
| `{economy_mode}`        | boolean | No subagents, direct tool usage only                   |
| `{branch_mode}`         | boolean | Verify not on main, create branch if needed            |
| `{pr_mode}`             | boolean | Create pull request at end                             |
| `{interactive_mode}`    | boolean | Configure flags interactively                          |
| `{resume_task}`         | string  | Task ID to resume (if -r provided)                     |
| `{output_dir}`          | string  | Full path to output directory                          |
| `{branch_name}`         | string  | Created branch name (if branch_mode)                   |
| `{applicable_dox_chains}` | list  | DOX chains identified in analysis                      |
| `{change_surfaces}`     | list    | Semantic change surfaces from plan                     |
| `{actual_touched_paths}` | list   | Paths actually modified during execution               |
| `{actual_touched_anchors}` | list | Symbols, routes, or regions actually modified          |
| `{dox_drift}`           | list    | DOX pointers that were stale at verification time      |
| `{validation_results}`  | map     | Command results from the validation step               |

</state_variables>

<entry_point>

**FIRST ACTION:** Load `steps/step-00-init.md`

Step 00 handles:

- Flag parsing (-a, -x, -s, -r, --test)
- Resume mode detection and task lookup
- Root DOX load and validation
- Output folder creation (if save_mode)
- 00-context.md creation (if save_mode)
- State variable initialization

After initialization, step-00 loads step-01-analyze.md.

</entry_point>

<step_files>
**Progressive loading - only load current step:**

| Step | File                         | Purpose                                              |
| ---- | ---------------------------- | ---------------------------------------------------- |
| 00   | `steps/step-00-init.md`      | Parse flags, load root DOX, create output folder     |
| 01   | `steps/step-01-analyze.md`   | DOX-guided current-state analysis                    |
| 02   | `steps/step-02-plan.md`      | Change-surface planning                              |
| 03   | `steps/step-03-execute.md`   | Surface-driven implementation                        |
| 04   | `steps/step-04-validate.md`  | DOX-guided self-check and validation                 |
| 05   | `steps/step-05-examine.md`   | Adversarial code review (optional)                   |
| 06   | `steps/step-06-resolve.md`   | Finding resolution (optional)                        |
| 07   | `steps/step-07-tests.md`     | Test analysis and creation (if --test)               |
| 08   | `steps/step-08-run-tests.md` | Test runner loop until green (if --test)             |
| 09   | `steps/step-09-finish.md`    | DOX closeout and optional pull request               |

</step_files>

<execution_rules>

- **Load one step at a time** - Only load the current step file
- **ULTRA THINK** before major decisions
- **Persist state variables** across all steps
- **Follow next_step directive** at end of each step
- **Save outputs** if `{save_mode}` = true (append to step file)
- **Use parallel agents** for independent exploration tasks
- **DOX first** - Read DOX chain before code exploration

## Mode Switching (Plugin-Enforced)

APEX uses the `apex-mode` plugin to enforce read-only restrictions during analysis/planning phases.

**At the start of each step, call `set_mode` with the correct mode for that phase:**

| Step | Phase | Mode | Reason |
|------|-------|------|--------|
| 00 | Init | `"plan"` | Parsing flags, reading DOX — no edits |
| 01 | Analyze | `"plan"` | DOX chain resolution, exploration |
| 02 | Plan | `"plan"` | Change-surface planning |
| 03 | Execute | `"plan"`→`"build"` | Read context in plan, then switch to build to implement |
| 04 | Validate | `"build"` | Verification may need fixes |
| 05 | Examine | `"plan"` | Adversarial review — read-only |
| 06 | Resolve | `"build"` | Fixing review findings |
| 07 | Tests | `"plan"`→`"build"` | Analyze patterns in plan, then switch to build to create |
| 08 | Run Tests | `"build"` | Fixing test failures |
| 09 | Finish | `"plan"`→`"build"` | Inspect diff/reconcile DOX in plan, then switch to build for AGENTS.md |

**How it works:**
- `set_mode({ mode: "plan" })` → plugin blocks `edit`/`write`/`apply_patch` with an error
- `set_mode({ mode: "build" })` → all tools allowed
- The model controls the switch by calling the custom tool — no user intervention needed

**If an edit is denied in plan mode:** Call `set_mode({ mode: "build" })` first, then retry.

## DOX-Guided Execution

APEX uses DOX as its primary navigation system:

1. Load root `AGENTS.md` at init (step-00)
2. Walk Child DOX Index during analysis (step-01)
3. Build change surfaces from DOX contracts (step-02)
4. Execute by surface, tracking touched paths (step-03)
5. Reconcile DOX after the final change (step-09)

## 🧠 Smart Agent Strategy in Analyze Phase

The analyze phase (step-01) uses **adaptive agent launching** (unless economy_mode):

**Available agents:**
- `explore-codebase` - Find existing patterns, files, utilities
- `explore-docs` - Research library docs (use when unfamiliar with API)
- `websearch` - Find approaches, best practices, gotchas

**Agent count is determined by unresolved questions after DOX reading:**

| Unresolved Context | Agents | When |
|------------|--------|------|
| DOX sufficient, no unknowns | 0 | Clear task in indexed codebase |
| Verify local capability | 1 | Single DOX pointer to verify |
| Verify + external API | 2 | Capability + unfamiliar library |
| Cross-cutting unknowns | 2-3 | Multiple systems, many unknowns |

**BE SMART:** Analyze what you actually need before launching. Don't over-launch for simple tasks, don't under-launch for complex ones.

</execution_rules>

<save_output_pattern>
**When `{save_mode}` = true:**

Step-00 runs `scripts/setup-templates.sh` to initialize all output files from `templates/` directory.

**Each step then:**

1. Run `scripts/update-progress.sh {task_id} {step_num} {step_name} "in_progress"`
2. Append findings/outputs to the pre-created step file
3. Run `scripts/update-progress.sh {task_id} {step_num} {step_name} "complete"`

**Template system benefits:**

- Reduces token usage by ~75% (1,350 tokens saved per workflow)
- Templates in `templates/` directory (not inline in steps)
- Scripts handle progress tracking automatically
- See `templates/README.md` for details

</save_output_pattern>

<success_criteria>

- Root DOX loaded and valid before any code work
- Each step loaded progressively
- Change surfaces drive the plan, not arbitrary file boundaries
- All validation checks passing
- Outputs saved if `{save_mode}` enabled
- Tests passing if `{test_mode}` enabled
- DOX reconciled after the final change
- Clear completion summary provided
  </success_criteria>
