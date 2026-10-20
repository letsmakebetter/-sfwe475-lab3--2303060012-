React Notes

Props and state

The title is a prop because the parent passes it to TaskCard. The done value is state because TaskCard changes it after the checkbox is clicked. A component cannot change a prop directly, but it can update its own state.

Keys in a list

Using the array index as a key is risky when items are reordered or filtered. The index can then point to a different task, so React may keep the old checkbox state with the wrong card.

Controlled input experiment

Without onChange, the input became read-only. Its value still came from state, but the state did not change while typing.

Adding a task

TaskBoard owns the tasks state. NewTaskInput calls onAddTask, then TaskBoard updates the list and passes the new tasks to TaskList.
