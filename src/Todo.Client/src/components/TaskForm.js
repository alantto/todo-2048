import React, { useState } from "react";

const TaskForm = ({addNew}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    addNew(newTaskTitle).then(() => {
      setNewTaskTitle("");
    });
  }

  const handleChange = (event) => setNewTaskTitle(event.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={newTaskTitle} onChange={handleChange} />
      </label>
      <input type="submit" value="Add task" />
    </form>
  );
};

export default TaskForm;
