---
description: "Phase 2 Todo Agent - Implementation task list (agent behavior + tool-driven orchestration)"
---

# Tasks: Phase 2 Todo Agent (Web + Tools)

**Input**:
- Agent constitution: `specs/agents/todo-agent.md`
- Tool rules: `specs/agents/tools.md`
- Execution plan: `specs/agents/planning.md`
- Product parity context: `specs/006-todo-web-app/spec-updated.md`

**Constraints**:
- Specification-only tasks (no application code in this tasks file)
- Stateless per request (no reliance on prior conversation state)
- All task operations are performed via tools; agent does not access DB/UI

## Format: `[ID] [P?] [Area] Description`

- **[P]**: Can be done in parallel (different files, no dependencies)
- **[Area]**: Domain area (Intent, Tools, Validation, UX, Security, Errors)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Documentation Infrastructure)

**Purpose**: Ensure agent spec docs exist and are internally consistent.

- [ ] A001 [Docs] Confirm `specs/agents/todo-agent.md` covers all required behaviors (stateless, non-fabrication, ownership, non-goals)
- [ ] A002 [Docs] Confirm `specs/agents/tools.md` defines tool list and hard rules (tool-only ops, fetch-before-modify, no auto-retry)
- [ ] A003 [Docs] Confirm `specs/agents/planning.md` defines execution flow (intent → validate → tool(s) → interpret → respond)

---

## Phase 2: Foundational (Behavioral Contracts)

**Purpose**: Define canonical “contracts” for how the agent behaves, independent of any implementation.

- [ ] A004 [Intent] Define an intent taxonomy table (create/list/get/update/toggle/delete/restore) in `specs/agents/planning.md`
- [ ] A005 [Security] Define required auth precondition checks and safe non-enumeration patterns (not found vs not owned) in `specs/agents/todo-agent.md`
- [ ] A006 [Validation] Define input validation rules the agent must enforce before tool calls (title, priority enum, due date format, deletion reason) in `specs/agents/planning.md`

**Checkpoint**: Agent has a complete, testable behavioral contract in docs.

---

## Phase 3: Tool-Oriented Execution Patterns (Core)

**Purpose**: For each supported user intent, specify the exact tool call sequence patterns.

### Create

- [ ] A007 [Tools] Specify create flow (validate → `create_task` → confirm) in `specs/agents/planning.md`
- [ ] A008 [UX] Define response template for created task confirmation (minimal fields, no sensitive IDs unless needed) in `specs/agents/planning.md`

### List

- [ ] A009 [Tools] Specify list flows for common views (active, completed, deleted, overdue, due-today) using `list_tasks` in `specs/agents/planning.md`
- [ ] A010 [UX] Define response template for list results (counts + brief summaries; pagination hint if applicable) in `specs/agents/planning.md`

### Get

- [ ] A011 [Tools] Specify get flow (must have task_id; else list/disambiguate) using `get_task` in `specs/agents/planning.md`

### Update

- [ ] A012 [Tools] Specify update flow (identify task → `update_task` with patch semantics → confirm) in `specs/agents/planning.md`
- [ ] A013 [Validation] Specify “do not overwrite unspecified fields” rule examples in `specs/agents/tools.md` or `specs/agents/planning.md`

### Toggle completion

- [ ] A014 [Tools] Specify toggle flow (identify task → `toggle_task_completion` → confirm) in `specs/agents/planning.md`
- [ ] A015 [Intent] Specify how to handle ambiguous phrasing (“mark it done”, “undo”) requiring clarification in `specs/agents/planning.md`

### Soft delete + restore

- [ ] A016 [Tools] Specify delete flow with ambiguity handling (list → choose → `soft_delete_task`) in `specs/agents/planning.md`
- [ ] A017 [Validation] Specify deletion reason requirement handling (if applicable to product spec) and clarify whether it’s a tool input in `specs/agents/tools.md`
- [ ] A018 [Tools] Specify restore flow (list deleted if unsure → choose → `restore_task`) in `specs/agents/planning.md`

---

## Phase 4: Advanced Intent & Disambiguation

**Purpose**: Ensure the agent can safely resolve ambiguity without inventing state.

- [ ] A019 [Intent] Define disambiguation question patterns when multiple tasks match (what identifiers to show; user selects) in `specs/agents/planning.md`
- [ ] A020 [Intent] Define how to handle multi-action requests (“add 3 tasks”, “complete all overdue”) including when to require explicit confirmation for bulk/destructive actions in `specs/agents/planning.md`
- [ ] A021 [Errors] Define “tool error translation” table (not found, validation error, unauthorized, conflict) in `specs/agents/planning.md`

---

## Phase 5: Feature-Parity Alignment (From 006 spec)

**Purpose**: Ensure agent behaviors support the richer task fields required by full Phase 1 parity.

- [ ] A022 [Validation] Add validation rules for priority (high/medium/low) and tags/categories to `specs/agents/planning.md`
- [ ] A023 [Validation] Add due date interpretation rules (ISO-8601, ambiguous natural language → clarify) to `specs/agents/planning.md`
- [ ] A024 [Intent] Document conceptual recurrence handling limitations consistent with `specs/agents/todo-agent.md` (no background scheduling claims)

---

## Phase 6: Polish & Consistency Checks

- [ ] A025 [Docs] Ensure `specs/agents/todo-agent.md`, `specs/agents/tools.md`, and `specs/agents/planning.md` do not contradict each other
- [ ] A026 [Docs] Add an “Acceptance Checks” section to `specs/agents/tasks.md` ensuring the tasks are themselves verifiable

---

## Dependencies & Execution Order

- Phase 1 must complete before Phases 2–6.
- Phase 2 defines contracts required before detailing tool sequences.
- Phases 3–4 can be partially parallelized by intent areas, but must not edit the
  same file sections concurrently.
- Phase 5 depends on Phase 3 patterns being defined so parity constraints can be
  mapped into validation + responses.

---

## Acceptance Checks (for this tasks file)

- [ ] Tasks reference exact file paths under `specs/agents/`
- [ ] Tasks enforce statelessness and tool-only operations
- [ ] Tasks include ambiguity handling and safe error translation
- [ ] Tasks include parity alignment for priority/tags/due dates/recurrence
