// Frontend TypeScript type definitions.

export type TaskPriority = "low" | "medium" | "high";
export type TaskRecurrence = "none" | "daily" | "weekly" | "monthly";

export interface User {
  id: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: TaskPriority;
  tags: string[] | null;
  due_date: string | null;
  recurrence: TaskRecurrence;
  parent_id: string | null;
  deleted_at: string | null;
  deletion_reason: string | null;
  owner_id: string;
  created_at: string;
  updated_at: string;
  // Computed fields from backend
  is_overdue: boolean;
  is_due_today: boolean;
  is_recurring: boolean;
}

export interface TaskCreate {
  title: string;
  description?: string;
  priority?: TaskPriority;
  tags?: string[];
  due_date?: string;
  recurrence?: TaskRecurrence;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: TaskPriority;
  tags?: string[];
  due_date?: string;
  recurrence?: TaskRecurrence;
}

export interface TaskDelete {
  deletion_reason: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user_id: string;
  email: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TaskListResponse {
  tasks: Task[];
  total: number;
  overdue_count: number;
  due_today_count: number;
}

export interface DeletedTaskListResponse {
  tasks: Task[];
  total: number;
}

export interface ErrorResponse {
  detail: string;
}

export interface TaskFilters {
  completed?: boolean;
  priority?: TaskPriority;
  tag?: string;
  due_status?: "overdue" | "due_today" | "future";
  search?: string;
  sort_by?: "created_at" | "due_date" | "priority" | "title";
  sort_order?: "asc" | "desc";
}
