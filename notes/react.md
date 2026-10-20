
The title is a prop because it is passed to TaskCard by its parent component. The done value is state because TaskCard can change it when the user clicks the checkbox. A component should not directly modify its props, but it can update its own state using useState.
