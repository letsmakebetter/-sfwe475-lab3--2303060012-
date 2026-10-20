import TaskCard from "./TaskCard";

function App() {
  return (
    <main>
      <h1>Task Board</h1>
      <TaskCard title="Read Chapter 3" done={false} />
      <TaskCard title="Finish homework" done={true} />
    </main>
  );
}

export default App;
