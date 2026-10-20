import { useState } from "react";

type NewTaskInputProps = {
  onAddTask: (title: string) => void;
};

function NewTaskInput({ onAddTask }: NewTaskInputProps) {
  const [text, setText] = useState("");

  function handleAdd() {
    const title = text.trim();

    if (title === "") {
      return;
    }

    onAddTask(title);
    setText("");
  }

  return (
    <div>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Add a task..."
        aria-label="New task title"
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default NewTaskInput;
