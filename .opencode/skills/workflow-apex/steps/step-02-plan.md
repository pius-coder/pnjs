---
name: step-02-plan
description: Change-surface planning - organize by semantic unit, not file boundaries
prev_step: steps/step-01-analyze.md
next_step: steps/step-03-execute.md
---

# Step 2: Plan (Change-Surface Strategy)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 Call `set_mode({ mode: "plan" })` before starting this step
- 🛑 NEVER start implementing - that's step 3
- 🛑 NEVER write or modify code in this step
- ✅ ALWAYS structure plan by CHANGE SURFACE, not by file
- ✅ ALWAYS include anchors (symbols, routes) from DOX analysis
- ✅ ALWAYS map acceptance criteria to surfaces
- ✅ ALWAYS note provisional DOX impact
- 📋 YOU ARE A PLANNER, not an implementer
- 💬 FOCUS on "What changes per capability? What surfaces are affected?"
- 🚫 FORBIDDEN to use Edit, Write, or Bash tools

## EXECUTION PROTOCOLS:

- 🎯 ULTRA THINK before creating the plan
- 💾 Save plan to output file (if save_mode)
- 📖 Use verified change surfaces from step-01
- 🚫 FORBIDDEN to proceed until user approves plan (unless auto_mode)

## CONTEXT BOUNDARIES:

- Verified change surfaces from step-01 are available
- Each surface has: DOX chain, path, anchors, contracts, tests
- Implementation has NOT started
- Plan must be complete before execution

## YOUR TASK:

Transform verified change surfaces into a comprehensive executable plan organized by semantic capability.

---

<available_state>
From previous steps:

| Variable | Description |
|----------|-------------|
| `{task_description}` | What to implement |
| `{task_id}` | Kebab-case identifier |
| `{acceptance_criteria}` | Success criteria from step-01 |
| `{auto_mode}` | Skip confirmations |
| `{save_mode}` | Save outputs to files |
| `{applicable_dox_chains}` | DOX chains from analysis |
| `{change_surfaces}` | Verified surfaces (filled here) |
| `{output_dir}` | Path to output (if save_mode) |
</available_state>

---

## EXECUTION SEQUENCE:

### 1. Initialize Save Output (if save_mode)

**If `{save_mode}` = true:**

```bash
bash {skill_dir}/scripts/update-progress.sh "{task_id}" "02" "plan" "in_progress"
```

Append plan to `{output_dir}/02-plan.md` as you work.

### 2. ULTRA THINK: Design Complete Strategy

**CRITICAL: Think through ENTIRE implementation before writing any plan.**

Mental simulation:
- Walk through each verified change surface
- Determine logical order (dependencies first)
- For each surface: what contracts change? what contracts stay?
- Consider edge cases and error handling
- Plan test coverage per surface
- Assess DOX impact: will contracts, paths, or verification change?

**Recommended dependency order:**
1. Contracts, schemas, types
2. Business logic and persistence
3. HTTP/UI integration
4. Tests
5. Validation

Adapt this order if the actual project structure requires it.

### 3. Clarify Ambiguities

**If `{auto_mode}` = true:**
→ Use recommended option for any ambiguity, proceed automatically

**If `{auto_mode}` = false AND multiple valid approaches exist:**

```yaml
questions:
  - header: "Approach"
    question: "Multiple approaches are possible. Which should we use?"
    options:
      - label: "Approach A (Recommended)"
        description: "Description and tradeoffs of A"
      - label: "Approach B"
        description: "Description and tradeoffs of B"
    multiSelect: false
```

### 4. Create Change-Surface Plan

**Structure by CHANGE SURFACE, not by file:**

```markdown
## Implementation Plan: {task_description}

### Overview
[1-2 sentences: High-level strategy and approach]

### Prerequisites
- [ ] Prerequisite 1 (if any)

---

### Surface: {capability.name}

**Capability**
- {what this surface achieves}

**DOX chain**
- `{dox_chain_paths}`

**Physical targets**
- `{source_path}`

**Anchors**
- `{symbol_or_route_1}`
- `{symbol_or_route_2}`

**Current contract**
- {what the code currently enforces}

**Changes**
- {specific change 1}
- {specific change 2}

**Context required**
- {symbol(s) to read}
- {contracts to verify}

**Verification**
- `{test_command}`

**Provisional DOX impact**
- {None / Update local AGENTS.md / Update parent index}

---

### Surface: {capability2.name}
...

---

### Surface: {capabilityN.name}
...

---

### Acceptance Criteria Mapping
- [ ] AC1: Satisfied by surface {name}
- [ ] AC2: Satisfied by surface {name}

---

### Risks & Considerations
- Risk 1: [potential issue and mitigation]
```

**Important rules:**
- A physical path is always required per surface
- Anchors (symbols, routes) are always required
- Line numbers are informative, never structural
- DOX impact is provisional — only the final diff confirms it
- A surface can span multiple files; a file can contain multiple surfaces
- Do NOT propose new AGENTS.md creation unless a genuine durable boundary exists

**If `{save_mode}` = true:** Append full plan to 02-plan.md

### 5. Verify Plan Completeness

Checklist:
- [ ] All change surfaces identified
- [ ] Logical dependency order
- [ ] Each surface has anchors + verification
- [ ] DOX impact assessed (provisionally)
- [ ] Acceptance criteria mapped
- [ ] No scope creep

### 6. Present Plan for Approval

```
**Implementation Plan Ready**

**Surfaces to modify:** {count}
**Files affected:** {count}
**DOX impact:** {provisional assessment}

**Surface overview:**
- {capability} → {changes summary}
```

**If `{auto_mode}` = true:**
→ Skip confirmation, proceed directly to execution

**If `{auto_mode}` = false:**

```yaml
questions:
  - header: "Plan"
    question: "Review the implementation plan. Ready to proceed?"
    options:
      - label: "Approve and execute (Recommended)"
        description: "Plan looks good, start implementation"
      - label: "Adjust plan"
        description: "I want to modify specific parts"
      - label: "Ask questions"
        description: "I have questions about the plan"
      - label: "Start over"
        description: "Revise the entire plan"
    multiSelect: false
```

### 7. Complete Save Output (if save_mode)

**If `{save_mode}` = true:**

Append to `{output_dir}/02-plan.md`:
```markdown
---
## Step Complete
**Status:** ✓ Complete
**Surfaces planned:** {count}
**DOX impact:** {assessment}
**Next:** step-03-execute.md
**Timestamp:** {ISO timestamp}
```

Store `{change_surfaces}` with the planned surfaces.

---

## SUCCESS METRICS:

✅ Plan organized by change surface, not file
✅ Each surface has DOX chain, anchors, and verification
✅ Provisional DOX impact assessed for each surface
✅ All acceptance criteria mapped to surfaces
✅ User approved plan (or auto-approved)
✅ NO code written or modified
✅ Output saved (if save_mode)

## FAILURE MODES:

❌ Organizing by file instead of semantic surface
❌ Vague actions like "add feature" or "fix issue"
❌ Missing anchor references (symbols, routes)
❌ Not assessing DOX impact
❌ Starting to write code (that's step 3!)
❌ Proposing unnecessary new AGENTS.md files
❌ **CRITICAL**: Not using AskUserQuestion for approval

## PLANNING PROTOCOLS:

- Structure by CAPABILITY, not by file
- Include anchor references from DOX analysis
- Every change must be specific and actionable
- Map every AC to specific surfaces
- Assess DOX impact provisionally

---

## NEXT STEP:

After user approves via AskUserQuestion (or auto-proceed), load `./step-03-execute.md`

<critical>
Remember: Planning is about designing the approach by capability - save all implementation for step-03!
Line numbers are informative, never structural.
</critical>
