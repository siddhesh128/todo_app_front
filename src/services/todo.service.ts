import axios from "axios";
import { Todo } from "../interface/Todo";
import Alert from "../components/common/Alert/Alert";
import { TODO_API_URL, TOGGLE_TODO_API_URL } from "../constants/api-urls";
import {
  FETCH_TODOS_ERROR,
  FAILED_TO_ADD_TASK_ERROR,
  TASK_CANNOT_BE_EMPTY_ERROR,
  DELETE_TASK_ERROR,
  UNEXPECTED_ERROR,
} from "../constants/console-errors";
import {
  TASK_CANNOT_BE_EMPTY_ALERT,
  DELETE_TASK_ALERT,
} from "../constants/alerts";

class TodoServices {
  private static instance: TodoServices;

  public static getInstance(): TodoServices {
    if (!TodoServices.instance) {
      TodoServices.instance = new TodoServices();
    }
    return TodoServices.instance;
  }

  public async fetchTodos(
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  ) {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get<Todo[]>(TODO_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched Todos Data:", response.data);

      setTodos(response.data);
    } catch (error) {
      console.error({ FETCH_TODOS_ERROR }, error);
    }
  }

  public async handleAddTask(
    newTask: string,
    expectedTime: string,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    setNewTask: React.Dispatch<React.SetStateAction<string>>,
    taskImage: string | null
  ) {
    const trimmedTask = newTask.trim();

    if (!trimmedTask) {
      Alert({ alertType: TASK_CANNOT_BE_EMPTY_ALERT });
      console.error({ TASK_CANNOT_BE_EMPTY_ERROR });
      return;
    }

    const token = localStorage.getItem("token");

    console.log("Adding task:", { task: trimmedTask, expectedTime, image: taskImage }); // Log statement

    try {
      const response = await axios.post(
        TODO_API_URL,
        { task: trimmedTask, expectedTime, image: taskImage }, // Include expectedTime and image in the request payload
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodos([...todos, response.data]);
      setNewTask("");
    } catch (error) {
      console.error({ FAILED_TO_ADD_TASK_ERROR }, error);
    }
  }

  public async deleteTask(
    id: number,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    todos: Todo[],
    token: string | null
  ) {
    console.log("Deleting task with ID:", id); // Log statement

    try {
      await axios.delete(`${TODO_API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(DELETE_TASK_ERROR, error.response?.data || error.message);
      } else {
        console.error({ UNEXPECTED_ERROR }, error);
      }
    }
  }

  public handleDeleteTask(
    id: number,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    todos: Todo[]
  ) {
    const token = localStorage.getItem("token");

    Alert({
      alertType: DELETE_TASK_ALERT,
      onConfirm: () => this.deleteTask(id, setTodos, todos, token),
    });
  }

  public handleEditTask(
    todo: Todo,
    setEditingTask: React.Dispatch<React.SetStateAction<Todo | null>>,
    setNewTask: React.Dispatch<React.SetStateAction<string>>
  ) {
    setEditingTask(todo);
    setNewTask(todo.task);
  }

  public async handleToggleCompleted(
    id: number,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    todos: Todo[]
  ) {
    const token = localStorage.getItem("token");

    console.log("Toggling completion status for task with ID:", id); // Log statement

    await axios.put(
      `${TOGGLE_TODO_API_URL}/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  public async handleUpdateTask(
    editingTask: Todo | null,
    newTask: string,
    expectedTime: string,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    todos: Todo[],
    setNewTask: React.Dispatch<React.SetStateAction<string>>,
    setEditingTask: React.Dispatch<React.SetStateAction<Todo | null>>,
    taskImage: string | null // Added taskImage parameter
  ) {
    if (!editingTask) return;

    const token = localStorage.getItem("token");

    console.log("Updating task:", { id: editingTask.id, task: newTask, expectedTime, image: taskImage }); // Log statement

    try {
      await axios.put(
        `${TODO_API_URL}/${editingTask.id}`,
        { task: newTask, expectedTime, image: taskImage }, // Include expectedTime and image in the request payload
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos(
        todos.map((todo) =>
          todo.id === editingTask.id ? { ...todo, task: newTask, expectedTime, image: taskImage } : todo
        )
      );
      setNewTask("");
      setEditingTask(null);
    } catch (error) {
      console.error({ UNEXPECTED_ERROR }, error);
    }
  }
}

export default TodoServices.getInstance();