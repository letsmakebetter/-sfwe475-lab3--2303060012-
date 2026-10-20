import type { Task } from "./schemas";
import TaskCard from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
};

function TaskList({ tasks }: TaskListProps) {
  return (
    <section aria-label="Tasks">
      {tasks.map((task) => (
        <TaskCard key={task.id} title={task.title} done={task.done} />
      ))}
    </section>
  );
}

export default TaskList;
