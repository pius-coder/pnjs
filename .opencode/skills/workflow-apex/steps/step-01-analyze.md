---
name: step-01-analyze
description: DOX-guided current-state analysis - resolve DOX chain, extract context, verify pointers
next_step: steps/step-02-plan.md
---

# Step 1: Analyze (DOX-Guided Context Gathering)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 Call `set_mode({ mode: "plan" })` before starting this step
- 🛑 NEVER plan or design solutions - that's step 2
- 🛑 NEVER create todos or implementation tasks
- 🛑 NEVER decide HOW to implement anything
- ✅ ALWAYS resolve DOX chain before exploring code
- ✅ ALWAYS verify DOX pointers in code (detect drift)
- ✅ ALWAYS report findings with file paths and anchors
- 📋 YOU ARE AN EXPLORER, not a planner
- 💬 FOCUS on "What does DOX say? Is it accurate? What exists?"
- 🚫 FORBIDDEN to suggest implementations or approaches

## EXECUTION PROTOCOLS:

- 🎯 DOX resolution first, code verification second
- 🎯 Progressive reading (surface, not full file)
- 💾 Append findings to output file (if save_mode)
- 📖 Document DOX drift when pointers are stale
- 🚫 FORBIDDEN to proceed until DOX chain is resolved

## CONTEXT BOUNDARIES:

- Root DOX from step-00 is loaded as `{root_dox}`
- Child DOX Index points to domain docs
- Codebase state is discovered via DOX + verification
- Don't assume DOX is accurate - verify in code

## YOUR TASK:

Resolve the DOX chain applicable to the task, extract current contracts and capabilities, verify DOX pointers in code, and build verified change surfaces.

---

<available_state>
From step-00-init:

| Variable | Description |
|----------|-------------|
| `{task_description}` | What to implement |
| `{task_id}` | Kebab-case identifier |
| `{root_dox}` | Root DOX contract loaded |
| `{applicable_dox_chains}` | DOX chains (starts empty, filled here) |
| `{auto_mode}` | Skip confirmations |
| `{examine_mode}` | Auto-proceed to review |
| `{save_mode}` | Save outputs to files |
| `{test_mode}` | Include test steps |
| `{economy_mode}` | No subagents, direct tools |
| `{output_dir}` | Path to output (if save_mode) |
</available_state>

---

## EXECUTION SEQUENCE:

### 1. Initialize Save Output (if save_mode)

**If `{save_mode}` = true:**

```bash
bash {skill_dir}/scripts/update-progress.sh "{task_id}" "01" "analyze" "in_progress"
```

Append findings to `{output_dir}/01-analyze.md` as you work.

### 2. Phase 1 — DOX Resolution

**Purpose:** Find every DOX document that owns capabilities related to the task.

**2.1 Parse task for domains and capabilities**

From the task description, extract:
- **Domains**: auth, user, payment, orders, etc.
- **Capabilities**: login, register, suspend, create, etc.
- **Affected areas**: frontend, backend, API, database, etc.

**2.2 Consult Child DOX Index**

Start from the root DOX Child DOX Index and walk down:

```
1. Read Child DOX Index from root AGENTS.md
2. For each child, check if its Purpose/Ownership covers the task domain
3. If yes: read that child AGENTS.md
4. If that child has its own Child DOX Index: recurse
5. Build {applicable_dox_chains} as the list of all applicable docs

Example:
  - "Add user suspension"
  → root AGENTS.md has child "backend/AGENTS.md"
  → backend/AGENTS.md Purpose includes "user management"
  → applicable chain: [AGENTS.md, backend/AGENTS.md]
```

**2.3 Handle missing DOX coverage**

If no DOX doc covers the task domain:

```
1. Note the gap: "No DOX coverage for {domain}"
2. Explore codebase using Glob/Grep as fallback
3. Document findings as provisional (will need DOX creation at closeout)
```

### 3. Phase 2 — Extract Current Context

**Purpose:** Extract all actionable information from the DOX chain.

**For each applicable DOX document, extract:**

```markdown
## From {path}

### Capabilities owned
- {capability}: {one-line description}

### Source paths
- {path} :: {entry anchors (symbols, routes)}

### Local Contracts
- {contract rule 1}
- {contract rule 2}

### Verification commands
- {command 1}
- {command 2}
```

**Synthesize into consolidated context:**

```markdown
## Applicable DOX

- `AGENTS.md`
- `backend/AGENTS.md`

## Current Contracts

- Suspended users cannot create sessions.
- Order creation requires an active user.
```

### 4. Phase 3 — Verify in Code

**Purpose:** Every DOX pointer must be verified. Code is the source of truth.

**4.1 Verify each anchor**

```
For each {path} :: {anchor} found in DOX:
  1. Grep for the anchor symbol: "grep -rn 'anchor_name' path/"
  2. If found: mark as VERIFIED
  3. If not found: search more broadly, note as DOX DRIFT
```

**4.2 Handle drift**

```
If symbol moved:
  - Document new location
  - Flag as "DOX drift detected"
  - This will be repaired at step-09 closeout

If symbol removed:
  - Check if replaced by equivalent
  - Document finding
```

**4.3 Build verified anchor set**

```
For each capability, collect:
  - Original DOX path
  - Verified/existing path
  - Verified anchor (symbol name + line)
  - Related tests
```

### 5. Phase 4 — Progressive Reading

**Purpose:** Read only what you need. Full-file reading is the exception.

**Default read scope (read in this order):**

```
1. Target symbol body (the function/class/route DOX points to)
2. Types and contracts it consumes (imports from this project)
3. Directly called local functions
4. Module registration (if relevant: routes, providers, etc.)
5. Affected test files
```

**Read full file only when:**

- The file is small (< 50 lines)
- The modification affects file structure (imports, exports, module bootstrap)
- No stable anchor exists to isolate the area (no symbol, no route)
- Local dependency ambiguity remains after targeted reading

**For each change surface candidate:**

```markdown
### Surface: {capability.name}

| Field | Value |
|-------|-------|
| DOX path | `{dox_path}` |
| Source path | `{verified_path}` |
| Anchor | `{symbol_name}` (line {N}) |
| Contracts consumed | `{imported_types}` |
| Direct dependencies | `{called_functions}` |
| Related tests | `{test_paths}` |
| Verified | ✓ / ✗ |
```

### 6. Phase 5 — Parallel Agents (if needed)

**If `{economy_mode}` = true:**
→ Skip this phase entirely. Use DOX data directly.

**If `{economy_mode}` = false:**

**Determine if agents are needed:**

```
Launch 0 agents when:
  - DOX pointers are verified and sufficient
  - Capability is well-understood
  - All dependencies are clear from reading

Launch 1 agent (codebase) when:
  - Multiple local capabilities need verification
  - DOX pointers are stale and need broader search

Launch 1 agent (documentation) when:
  - External API is genuinely unfamiliar
  - Library version-specific behavior matters

Launch 2-3 agents maximum when:
  - Cross-cutting change across frontend + backend
  - Both codebase and external docs needed
```

**Agent count is determined by unresolved questions after DOX, NOT by a generic complexity matrix.**

If agents are launched, launch ALL in ONE message.

Each subagent receives a bounded question and the DOX-identified paths. It must NOT scan the entire repository — only the area indicated by DOX.

### 7. Phase 6 — Build Output

**Synthesize final analysis:**

**If `{save_mode}` = true:** Append to 01-analyze.md.

```markdown
## Applicable DOX

- `AGENTS.md`
- `backend/AGENTS.md`

## Current Contracts

- Suspended users cannot create sessions.
- Order creation requires an active user.

## Verified Change Surfaces

### {capability.name}
- Path: `{verified_path}`
- Anchors: `{symbol1}`, `{symbol2}`
- Related tests: `{test_path}`
- DOX chain: `{dox_chain}`

## DOX Drift

- {old_path}:{old_anchor} → {new_path}:{new_anchor} (stale pointer)

## Unresolved Questions

- None

## Acceptance Criteria Mapping

- [ ] AC1: {capability} via {surface}
```

**If `{save_mode}` = false:** Present in chat with same structure.

### 8. Proceed to Planning

**Always (regardless of auto_mode):**

```
**Context Gathering Complete**

**DOX chains resolved:** {count}
**Change surfaces identified:** {count}
**DOX drift items:** {count}

**Key findings:**
- {summary of capabilities}
- {DOX pointers requiring attention}

→ Proceeding to planning phase...
```

<critical>
Do NOT ask for user confirmation here - always proceed directly to step-02-plan.
Do NOT load full files by default - read only the surface.
</critical>

### 9. Complete Save Output (if save_mode)

**If `{save_mode}` = true:**

Append summary to `{output_dir}/01-analyze.md` then:

```bash
bash {skill_dir}/scripts/update-progress.sh "{task_id}" "01" "analyze" "complete"
bash {skill_dir}/scripts/update-progress.sh "{task_id}" "02" "plan" "in_progress"
```

Store `{applicable_dox_chains}` with the resolved list.

---

## SUCCESS METRICS:

✅ DOX chain resolved before any code exploration
✅ All DOX anchors verified in code (drift detected if stale)
✅ Change surfaces built from DOX + verified anchors
✅ Progressive reading (surface-level, not full files)
✅ Agents launched only for truly unresolved questions
✅ NO planning or implementation decisions made
✅ Output saved (if save_mode)
✅ DOX drift documented for step-09 repair

## FAILURE MODES:

❌ Starting to plan or design (that's step 2!)
❌ Suggesting implementations or approaches
❌ Skipping DOX resolution phase
❌ Reading full files by default instead of surface
❌ Launching agents without checking DOX first
❌ Missing DOX drift (trusting DOX without verification)
❌ Using subagents when economy_mode is true
❌ **CRITICAL**: Blocking workflow with unnecessary confirmation prompts

## ANALYZE PROTOCOLS:

- DOX resolution is always the first phase
- Code verification is always the second phase
- Full-file reading is the exception, not the default
- Only launch agents for genuinely unresolved questions

---

## NEXT STEP:

Always proceed directly to `./step-02-plan.md` after presenting context summary.

<critical>
Remember: Analysis is "What does DOX say? Is it accurate? What exists?"
Save all planning for step-02! Do NOT ask for confirmation - proceed directly!
</critical>
