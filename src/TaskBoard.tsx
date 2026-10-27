import { useEffect, useState } from "react";
import { simulateFetchTasks } from "./mockApi";
import NewTaskForm from "./NewTaskForm";
import type { CreateTaskInput, Task } from "./schemas";

type TaskBoardStatus = "loading" | "success" | "empty" | "error";

const minimumLoadingTimeMs = 400;

function waitForMinimumLoadingTime(startedAt: number) {
  const remainingTime = Math.max(
    0,
    minimumLoadingTimeMs - (Date.now() - startedAt),
  );

  return new Promise<void>((resolve) => {
    setTimeout(resolve, remainingTime);
  });
}

async function fetchTasksWithMinimumLoadingTime() {
  const startedAt = Date.now();

  try {
    return await simulateFetchTasks();
  } finally {
    await waitForMinimumLoadingTime(startedAt);
  }
}

function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul className="task-list" aria-label="Tasks">
      {tasks.map((task) => (
        <li key={task.id} className="task-card">
          <div>
            <h2>{task.title}</h2>
            {task.dueDate && <time dateTime={task.dueDate}>Due: {task.dueDate}</time>}
          </div>
          <span className={`task-status status-${task.status}`}>{task.status}</span>
        </li>
      ))}
    </ul>
  );
}

function TaskBoard() {
  const [status, setStatus] = useState<TaskBoardStatus>("loading");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    let isCurrent = true;

    void fetchTasksWithMinimumLoadingTime()
      .then((data) => {
        if (!isCurrent) {
          return;
        }

        setTasks(data);
        setStatus(data.length === 0 ? "empty" : "success");
      })
      .catch(() => {
        if (isCurrent) {
          setStatus("error");
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  function handleRetry() {
    setStatus("loading");
    void fetchTasksWithMinimumLoadingTime()
      .then((data) => {
        setTasks(data);
        setStatus(data.length === 0 ? "empty" : "success");
      })
      .catch(() => setStatus("error"));
  }

  function handleAddTask(newTask: CreateTaskInput) {
    setTasks((currentTasks) => {
      const nextId = Math.max(0, ...currentTasks.map((task) => task.id)) + 1;

      return [
        ...currentTasks,
        {
          id: nextId,
          title: newTask.title,
          dueDate: newTask.dueDate || undefined,
          status: newTask.status,
          done: newTask.status === "done",
        },
      ];
    });
    setStatus("success");
  }

  function renderTaskContent() {
    if (status === "loading") {
      return <p className="state-message">Loading tasks...</p>;
    }

    if (status === "error") {
      return (
        <div className="state-message">
          <p>We could not load your tasks.</p>
          <button type="button" onClick={handleRetry}>
            Try again
          </button>
        </div>
      );
    }

    if (status === "empty") {
      return <p className="state-message">No tasks yet. Add your first one below.</p>;
    }

    return <TaskList tasks={tasks} />;
  }

  return (
    <main className="task-board">
      <header className="page-header">
        <p className="eyebrow">Weekly planner</p>
        <h1>Task Board</h1>
        <p>Keep the next thing clear and manageable.</p>
      </header>

      <section className="board-content" aria-label="Task board">
        <div className="task-results" aria-live="polite">
          {renderTaskContent()}
        </div>

        {(status === "success" || status === "empty") && (
          <NewTaskForm onAddTask={handleAddTask} />
        )}
      </section>
    </main>
  );
}

export default TaskBoard;
