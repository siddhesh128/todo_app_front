export interface Todo {
  id: number;
  task: string;
  completed: boolean;
  taskImage?: string| null; // Add this line to include the image property
}

export interface HeaderProps {
  username: string | null;
  onLogout: () => void;
}

export interface TaskInputProps {
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (todoData: { task: string; expectedTime: string; imageUrl: string | null }) => void;
  editingTask: boolean;
  setTaskImage:  React.Dispatch<React.SetStateAction<string | null>>;
}
export interface TaskListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  setEditingTask: React.Dispatch<React.SetStateAction<Todo | null>>;
  completed: boolean;
}

