import { type FormEvent, useState } from "react";
import {
  CreateTaskSchema,
  type CreateTaskInput,
  type Task,
} from "./schemas";

type NewTaskFormProps = {
  onAddTask: (task: CreateTaskInput) => void;
};

function NewTaskForm({ onAddTask }: NewTaskFormProps) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<Task["status"]>("open");
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>(
    {},
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = CreateTaskSchema.safeParse({ title, dueDate, status });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    onAddTask(result.data);
    setTitle("");
    setDueDate("");
    setStatus("open");
  }

  return (
    <form className="new-task-form" onSubmit={handleSubmit} noValidate>
      <h2>Add a task</h2>

      <div className="form-field">
        <label htmlFor="title">Task title</label>
        <input
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          aria-invalid={errors.title ? true : undefined}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <p id="title-error" className="field-error" role="alert">
            {errors.title[0]}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="due-date">Due date</label>
        <input
          id="due-date"
          name="dueDate"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          aria-invalid={errors.dueDate ? true : undefined}
          aria-describedby={errors.dueDate ? "due-date-error" : undefined}
        />
        {errors.dueDate && (
          <p id="due-date-error" className="field-error" role="alert">
            {errors.dueDate[0]}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="task-status">Task status</label>
        <select
          id="task-status"
          name="status"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as Task["status"])
          }
          aria-invalid={errors.status ? true : undefined}
          aria-describedby={errors.status ? "status-error" : undefined}
        >
          <option value="open">Open</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        {errors.status && (
          <p id="status-error" className="field-error" role="alert">
            {errors.status[0]}
          </p>
        )}
      </div>

      <button type="submit" disabled={title.trim().length === 0}>
        Add task
      </button>
    </form>
  );
}

export default NewTaskForm;
