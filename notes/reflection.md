# Lab 4 Reflection

## Shared filter state

FilterBar and TaskList are sibling components, so neither can directly control the other's state. TaskBoard can own the filter state and pass the same value to both components.

## Stable keys

An array index changes when a list is filtered or reordered. React could then reuse a TaskCard and show its local checkbox state for a different task.

## Props down, requests up

TaskBoard sends tasks and the onAddTask callback down to its child components as props. NewTaskInput sends a request up by calling onAddTask when the Add button is clicked.
