import React, { useEffect, useState, Suspense } from "react";
import { Todo } from "../interface/Todo";
import TodoService from "../services/todo.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import TaskInput from "../components/Todos/TaskInput";
import Header from "../components/Todos/TodoHeader";
import { PENDING_TASK, COMPLETED_TASK } from "../constants/labels";
import Spinner from "../components/common/Spinner/Spinner";
import {
  TasksContainer,
  TaskTitle,
  TodoContainer,
  TaskColumn,
} from "../styles/todo.style";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
const TaskList = React.lazy(() => import("../components/Todos/TaskList"));

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTask, setEditingTask] = useState<Todo | null>(null);
  const [taskImage, setTaskImage] = useState<string | null>(null); 
  const [expectedTime, setExpectedTime] = useState<string>(''); 
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    TodoService.fetchTodos(setTodos);
  }, []);

  useEffect(() => {
    if (submitted) {
      if (editingTask) {
        TodoService.handleUpdateTask(
          editingTask,
          newTask,
          expectedTime,
          setTodos,
          todos,
          setNewTask,
          setEditingTask,
          taskImage 
        );
      } else {
        TodoService.handleAddTask(
          newTask,
          expectedTime,
          todos,
          setTodos,
          setNewTask,
          taskImage 
        );
      }
      setTaskImage(null);
      setSubmitted(false); 
    }
  }, [submitted, taskImage, editingTask, newTask, expectedTime, todos]);

  const handleSubmit = (todoData: { task: string; expectedTime: string; imageUrl: string | null }) => {
    setNewTask(todoData.task);
    setExpectedTime(todoData.expectedTime);
    setTaskImage(todoData.imageUrl);
    setSubmitted(true); 
  };

  const handleUserLogout = () => {
    AuthService.handleLogout(navigate);
  };

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '#task-input',
          popover: {
            title: 'New Task',
            description: 'Enter a new task here.',
            side: 'bottom',
            align: 'start',
          },
        },
        {
          element: '#task-list-pending',
          popover: {
            title: 'Task List',
            description: 'Here you can see all your pending tasks.',
            side: 'bottom',
            align: 'start',
          },
        },
        {
          element: '#task-list-completed',
          popover: {
            title: 'Completed Task List',
            description: 'Here you can see all your completed tasks.',
            side: 'bottom',
            align: 'start',
          },
        },
      ],
    });

    driverObj.drive();
  };

  useEffect(() => {
    const isTourShown = localStorage.getItem("tourShown");

    if (!isTourShown) {
      startTour(); 
      localStorage.setItem("tourShown", "true"); 
    }
  }, []);

  return (
    <TodoContainer>
      
      <Header username={username} onLogout={handleUserLogout} />
      <button onClick={startTour}>Start Tour</button>
      <div id="task-input">
        <TaskInput
          newTask={newTask}
          setNewTask={setNewTask}
          onSubmit={handleSubmit}
          editingTask={!!editingTask}
          setTaskImage={setTaskImage}
        />
      </div>
      <TasksContainer>
        <TaskColumn>
          <div id="task-list-pending">
            <TaskTitle>{PENDING_TASK}</TaskTitle>
            <Suspense fallback={<Spinner />}>
              <TaskList
                todos={todos}
                setTodos={setTodos}
                setNewTask={setNewTask}
                setEditingTask={setEditingTask}
                completed={false}
              />
            </Suspense>
          </div>
        </TaskColumn>

        <TaskColumn>
          <div id="task-list-completed">
            <TaskTitle>{COMPLETED_TASK}</TaskTitle>
            <Suspense fallback={<Spinner />}>
              <TaskList
                todos={todos}
                setTodos={setTodos}
                setNewTask={setNewTask}
                setEditingTask={setEditingTask}
                completed={true}
              />
            </Suspense>
          </div>
        </TaskColumn>
      </TasksContainer>
    </TodoContainer>
  );
};

export default Todos;
