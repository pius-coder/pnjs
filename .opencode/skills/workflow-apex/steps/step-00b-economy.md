---
name: step-00b-economy
description: Economy mode overrides - DOX-guided direct tool usage, no subagents
load_condition: economy_mode = true
---

# Economy Mode Overrides

**This file is ONLY loaded when `-e` or `--economy` flag is active.**

These instructions OVERRIDE the default behavior in all steps to save tokens by avoiding subagent launches.

---

<why_economy_mode>
**Purpose:** Reduce token usage for users with limited plans.

**Trade-offs:**
- ✅ Uses ~70% fewer tokens
- ✅ Faster execution (no agent overhead)
- ⚠️ Less thorough exploration
- ⚠️ No parallel research
- ⚠️ May miss some context

**When to use:**
- Limited monthly token budget
- Simple, well-defined tasks
- Familiar codebase with good DOX coverage
- Quick fixes or small features
</why_economy_mode>

---

<override_rules>

## CRITICAL: Apply These Overrides to ALL Steps

**When `{economy_mode}` = true, these rules OVERRIDE the default instructions:**

---

### Override 1: No Subagent Launches

**DEFAULT behavior (when economy_mode = false):**
```
Launch parallel agents:
- Agent 1: explore-codebase
- Agent 2: explore-docs
- Agent 3: websearch
```

**ECONOMY behavior (when economy_mode = true):**
```
Use DOX-guided direct tools instead:
1. Read the DOX chain (already loaded from step-00)
2. Identify Child DOX for the task domain
3. Extract paths, symbols, routes, and tests from DOX
4. Verify with Grep or symbolic navigation
5. Read only the necessary ranges
6. Expand only in case of uncertainty
```

**NEVER use Task tool with subagent_type in economy mode.**

---

### Override 2: DOX-Guided Tool Pattern

Instead of launching exploration agents, use this pattern:

```
1. DOX chain already loaded - consult it first
2. Extract from DOX:
   - Capability owner paths
   - Entry anchors (symbols, routes)
   - Related test files
   - Verification commands
3. Verify existence:
   - Grep for each anchor symbol
   - ls for each path
4. Read only the surface (symbol body + contracts + direct deps)
5. Do NOT read complete files by default
```

---

### Override 3: Reduced Exploration Scope

**DEFAULT:** Explore comprehensively, find all related code
**ECONOMY:** Focus on what DOX already points to

```
Economy exploration strategy:
1. Start with DOX-indicated paths
2. Grep for exact anchor symbols from DOX
3. Read only symbol ranges + consumed contracts
4. Skip "nice to have" context
5. Expand read scope only if DOX pointers are stale
```

---

### Override 4: Skip Optional Steps

**In economy mode, skip or minimize:**
- Extensive documentation research (use existing knowledge)
- Web searches for common patterns (use best practices you know)
- Multiple rounds of exploration (one round is enough)
- Deep pattern analysis (quick scan is sufficient)

**Always do:**
- Load DOX chain
- Verify DOX pointers in code
- Read the target surface
- Create the plan

---

### Override 5: Leaner Validation

**DEFAULT:** Launch code-reviewer agent for adversarial review
**ECONOMY:** Self-review without subagent

```
Economy validation:
1. Use DOX Verification section first
2. Run typecheck and lint (required)
3. Run affected tests (required)
4. Quick self-review checklist:
   - [ ] No obvious bugs
   - [ ] Follows existing patterns
   - [ ] Error handling present
   - [ ] No security issues
5. Skip adversarial review agent
```

---

### Override 6: Test Mode Adjustments

**If both `{economy_mode}` and `{test_mode}` are true:**

```
Economy test strategy:
1. Use DOX Verification section for test commands
2. Identify tests associated with touched capabilities
3. Read 1-2 similar test files for patterns if needed
4. Create essential tests only:
   - 1 happy path test
   - 1 error case test
   - Skip edge cases unless critical
5. Run tests directly (no agent)
```

</override_rules>

---

<step_specific_overrides>

## Step-by-Step Economy Overrides

### Step 01: Analyze (Economy)
```
INSTEAD OF: 3 parallel exploration agents
DO:
1. Read root DOX (already loaded)
2. Identify relevant Child DOX documents
3. Extract paths, anchors, contracts from DOX
4. Verify pointers with Grep
5. Read only necessary symbol ranges
6. Expand only if DOX is stale
```

### Step 02: Plan (Economy)
```
Same as default - planning doesn't use agents
```

### Step 03: Execute (Economy)
```
Same as default - execution doesn't use agents
```

### Step 04: Validate (Economy)
```
INSTEAD OF: Comprehensive validation
DO:
1. Use DOX Verification section first
2. Run typecheck + lint
3. Run only affected tests
4. Quick manual review
5. Skip coverage analysis
```

### Step 05: Examine (Economy)
```
INSTEAD OF: code-reviewer agent
DO:
1. Self-review with checklist:
   - Security: no injection, no secrets
   - Logic: handles errors, edge cases
   - Quality: follows patterns, readable
   - DOX: contracts still valid
2. Note any concerns
3. Move to resolve if issues found
```

### Step 07: Tests (Economy)
```
INSTEAD OF: Deep test analysis with agents
DO:
1. Use DOX Verification section
2. Identify tests for touched capabilities
3. Read 1 similar test file if pattern is unknown
4. Create minimal test coverage
5. Focus on critical paths only
```

### Step 08: Run Tests (Economy)
```
Same as default - test running doesn't use agents
```

</step_specific_overrides>

---

<economy_indicator>
**When economy mode is active, start each step with:**

```
⚡ ECONOMY MODE - DOX-guided, no subagents
```

This reminds both Claude and the user that economy mode is active.
</economy_indicator>

---

<success_metrics>
Economy mode is successful when:
- No Task tool calls with subagent_type
- DOX consulted before any file operation
- Direct Glob/Grep/Read usage instead of agents
- Fewer than 3 WebSearch calls total
- Implementation still correct and working
- Tests pass (if test_mode enabled)
</success_metrics>
