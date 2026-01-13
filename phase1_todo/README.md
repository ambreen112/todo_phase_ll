# Todo App - Full Stack Task Management

A modern full-stack todo application built with FastAPI (backend) and Next.js (frontend).

## Features

- **Task Management**: Create, edit, and delete tasks
- **Priority Levels**: HIGH, MEDIUM, LOW with visual indicators
- **Due Dates**: Set deadlines with overdue and due-today alerts
- **Recurring Tasks**: Auto-reschedule (daily, weekly, monthly)
- **Tags**: Organize tasks with multiple labels
- **Search & Filter**: Search by keyword; filter by status, priority, tags, or due date
- **Sort**: Reorder by created date, due date, priority, or title
- **Soft-Delete**: Delete with reasons and restore from deleted list
- **Notifications**: Browser notifications for overdue and due-today tasks

## Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **SQLModel**: Database ORM with SQLAlchemy
- **SQLite**: Database (easily switchable to PostgreSQL)
- **UVicorn**: ASGI server
- **Python-Jose**: JWT authentication

### Frontend
- **Next.js 14**: React framework with App Router
- **React**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **TanStack Query**: Data fetching and caching
- **Axios**: HTTP client

## Project Structure

```
phase1_todo/
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── routes/          # API endpoints
│   │   │   │   ├── auth.py
│   │   │   │   └── tasks.py
│   │   │   └── deps.py          # Dependencies
│   │   ├── core/
│   │   │   ├── security.py      # JWT handling
│   │   │   └── config.py        # Settings
│   │   ├── models/
│   │   │   ├── schemas.py       # Pydantic schemas
│   │   │   ├── task.py          # Task model
│   │   │   └── user.py          # User model
│   │   └── main.py              # App entry point
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/          # Auth pages (login, signup)
│   │   │   └── (dashboard)/     # Dashboard page
│   │   ├── components/          # React components
│   │   │   ├── Button.tsx
│   │   │   ├── CreateTaskForm.tsx
│   │   │   ├── EditTaskForm.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   └── TaskList.tsx
│   │   ├── lib/                 # Utilities
│   │   │   ├── api.ts           # API client
│   │   │   ├── auth-provider.tsx
│   │   │   └── notifications.tsx
│   │   └── types/               # TypeScript types
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.12+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the server:
```bash
uvicorn src.main:app --reload
```

Backend runs at: http://localhost:8000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend runs at: http://localhost:3000

### Environment Variables

#### Backend (.env)
```
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

#### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_USE_MOCK=false  # Set to true for mock API
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login and get JWT token

### Tasks
- `GET /api/{user_id}/tasks` - List tasks with filters
- `GET /api/{user_id}/tasks/deleted` - List deleted tasks
- `GET /api/{user_id}/tasks/{task_id}` - Get single task
- `POST /api/{user_id}/tasks` - Create task
- `PUT /api/{user_id}/tasks/{task_id}` - Update task
- `DELETE /api/{user_id}/tasks/{task_id}` - Soft-delete task
- `POST /api/{user_id}/tasks/{task_id}/restore` - Restore deleted task
- `PATCH /api/{user_id}/tasks/{task_id}/complete` - Toggle completion

## Filter Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `completed` | boolean | Filter by completion status |
| `priority` | string | Filter by priority (HIGH, MEDIUM, LOW) |
| `tag` | string | Filter by exact tag match |
| `due_status` | string | Filter by due status (overdue, due_today, future) |
| `search` | string | Search in title and description |
| `sort_by` | string | Sort field (created_at, due_date, priority, title) |
| `sort_order` | string | Sort order (asc, desc) |

## Development

This project follows **Spec-Driven Development (SDD)** methodology:

1. **Specs** (`specs/`): Feature requirements
2. **Plan**: Architecture decisions
3. **Tasks**: Implementation steps
4. **PHR** (`history/prompts/`): Prompt History Records for traceability
5. **ADR** (`history/adr/`): Architecture Decision Records
