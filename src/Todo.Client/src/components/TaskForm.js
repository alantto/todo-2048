import React, { useState } from "react";

const TaskForm = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const createNewTask = async function (title) {
    const url = `https://localhost:5001/Item?title=${title}`;
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  function handleSubmit(event) {
    event.preventDefault();
    createNewTask(newTaskTitle).then(() => {
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
