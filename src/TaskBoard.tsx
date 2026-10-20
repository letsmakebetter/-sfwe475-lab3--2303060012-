import { useState } from "react";
import NewTaskInput from "./NewTaskInput";
import type { Task } from "./schemas";
import TaskList from "./TaskList";

function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Read Chapter 3", done: false },
    { id: 2, title: "Build TaskCard", done: true },
  ]);

  function handleAddTask(title: string) {
    setTasks((currentTasks) => [
      ...currentTasks,
      { id: currentTasks.length + 1, title, done: false },
    ]);
  }

  return (
    <main>
      <h1>Task Board</h1>
      <NewTaskInput onAddTask={handleAddTask} />
      <TaskList tasks={tasks} />
    </main>
  );
}

export default TaskBoard;
