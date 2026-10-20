import { useState } from "react";

function NewTaskInput() {
  const [text, setText] = useState("");

  return (
    <input
      value={text}
      onChange={(event) => setText(event.target.value)}
      placeholder="Add a task..."
      aria-label="New task title"
    />
  );
}

export default NewTaskInput;
