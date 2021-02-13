import React, { useEffect, useState } from "react";
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("https://localhost:5001/Item", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <>
      <h1>Here will be tasks</h1>
      {tasks.map((task) => (
        <div>{task.title}</div>
      ))}
    </>
  );
};

export default TaskList;
