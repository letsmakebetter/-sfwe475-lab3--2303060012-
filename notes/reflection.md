1. An empty list is a successful response with no tasks, while an error means the request did not complete. The empty state invites the user to add a task, but the error state explains the problem and provides a retry action.

2. safeParse returns errors by field, so the title message is stored in errors.title. This lets the form place the message next to the input that needs correction.

3. aria-live asks a screen reader to announce changes inside the region. A loading message needs it because a screen reader user may not notice a visual update automatically.
