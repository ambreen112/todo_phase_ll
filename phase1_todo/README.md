# Todo CLI App - Reusable Intelligence Architecture

A console-based todo application demonstrating hierarchical agent architecture with reusable skills and subagent development patterns.

## Features

- **Add Tasks**: Create items with title, description, priority, tags, due dates, and recurrence.
- **Advanced Metadata**:
  - **Priority Levels**: HIGH (🔴), MEDIUM (🟡), LOW (🟢).
  - **Tags/Categories**: Assign multiple labels (e.g., work, home).
  - **Due Dates**: Set deadlines with overdue (⚠) and today (⏰) indicators.
  - **Recurring Tasks**: Auto-reschedule (daily, weekly, monthly) with 🔄 indicator.
- **Search & Filter**: Search by keyword; filter by status, priority, tags, or due date.
- **Sort**: Reorder by ID, Priority, Title, or Completion Status.
- **Soft-Delete**: Delete with reasons and restore from "Deleted" list.
- **Task Management**: Mark as Complete (✅) or Incomplete.

## Project Structure

```
todo-phase1/
├── src/
│   ├── agents/          # Agent implementations (Main + Subagents)
│   │   ├── main_agent.py
│   │   ├── add_update_agent.py
│   │   ├── list_search_agent.py
│   │   └── delete_complete_agent.py
│   ├── skills/          # Reusable skill modules
│   │   ├── storage_skill.py
│   │   ├── id_generator_skill.py
│   │   └── formatter_skill.py
│   ├── models/          # Data models (Todo entity)
│   │   └── todo.py
│   └── cli/            # CLI entry point
├── specs/              # Feature specifications (SDD)
├── history/            # Prompt History Records (PHRs)
├── .specify/          # Framework templates and configuration
├── .claude/           # Claude CLI commands
└── CLAUDE.md          # Project AI instructions
```

## Architecture

### Agent Hierarchy
- **MainAgent**: Orchestrator for parsing commands and delegation.
- **AddUpdateAgent**: Manages task creation and editing.
- **ListSearchAgent**: Handles searching, filtering, and sorting logic.
- **DeleteCompleteAgent**: Manages status toggles and removals.

### Reusable Skills
- **StorageSkill**: Central memory for todos with advanced query methods.
- **FormatterSkill**: Table formatting with visual status/priority indicators.
- **IDGeneratorSkill**: Persistent incremental ID management.

---

## Setup Instructions

### Installation
1. Clone the repository and navigate to the directory.
2. Initialize environment:
```bash
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```
3. Run the application:
```bash
python3 -m src.cli.todo_app
```

---

## Commands

### Adding Tasks
`add <title> --desc <description> --priority <high/med/low> --tag <tag1,tag2> --due <YYYY-MM-DD> --recur <daily/weekly/monthly>`

### Managing List
- `list`: Show all active todos.
- `list --sort <priority/title/status>`: Sort the view.
- `list --priority high`: Filter by priority.
- `list --tag work`: Filter by tag.
- `list --status complete`: Filter by status.
- `list --due overdue`: Show late tasks.

### Searching
- `search <keyword>`: Find tasks matching title, description, or tags.

### Updating & Actions
- `update <id> --priority high --title "New Title"`: Update specific fields.
- `complete <id>` / `incomplete <id>`: Toggle completion.
- `stop-recur <id>`: Stop a task from repeating.
- `remind`: Check for overdue or due today alerts.

### Deletion
- `delete <id> <reason>`: Soft-delete a task.
- `list-deleted`: View deleted tasks.
- `restore <id>`: Bring a deleted task back.

---

## Example Usage

```bash
Todo> add Buy Milk --priority high --tag grocery
Added todo: Title 'Buy Milk', Priority: HIGH, Tags: grocery with ID 1

Todo> add Weekly Sync --recur weekly --due 2026-01-01
Added todo: Title 'Weekly Sync', Due: 2026-01-01, Recurring: weekly with ID 2

Todo> list
ID  | Pri  | Title                | Tags            | Due          | Status
------------------------------------------------------------------------------
1   | 🔴 HI | Buy Milk             | grocery         |              | Incomplete
2   | 🟡 ME | Weekly Sync          |                 | 2026-01-01   | 🔄 Incomple
```

---

## Development (Spec-Driven)
This project follows **SDD methodology**:
1. **Spec** (`specs/`): Requirements.
2. **Plan**: Architecture decisions.
3. **Tasks**: Implementation steps.
4. **PHR** (`history/`): Traceability records.
