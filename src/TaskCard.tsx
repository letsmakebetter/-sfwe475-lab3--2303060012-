
import { useState } from "react";
import type { Task } from "./schemas";

type TaskCardProps = Pick<Task, "title" | "done">;

function TaskCard({ title, done: initialDone }: TaskCardProps) {
  const [done, setDone] = useState(initialDone);

  return (
    <div className="task-card">
      <h3>{title}</h3>
      <label>
        <input
          type="checkbox"
          checked={done}
          onChange={(event) => setDone(event.target.checked)}
        />
        {done ? "Done" : "Not done yet"}
      </label>
    </div>
  );
}

export default TaskCard;
