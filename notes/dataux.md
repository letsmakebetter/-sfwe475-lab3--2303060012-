1. During the first 800 milliseconds, the screen shows "Loading tasks..." because the request is still pending.

2. An empty list means the request succeeded but there are no tasks. An error means the request failed, so the UI offers a retry instead of suggesting that no data exists.

3. Keeping loading visible for at least 400 milliseconds prevents a distracting flash on very fast responses. It gives users stable feedback while the screen changes.

4. A disabled button helps users avoid an empty submission, but it does not validate data from other code paths. Zod remains the final validation when the form is submitted.

5. Keyboard check passed: Tab reaches every field and the Add task button, Shift+Tab moves backward, and Enter submits a valid form.

Reference: [ChatGPT conversation](https://chatgpt.com/share/6ae0e6bb-6d04-83ed-acec-4368c6b8e001)
