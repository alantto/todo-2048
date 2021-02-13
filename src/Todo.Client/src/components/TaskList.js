import React, { useEffect, useState } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  useEffect(() => {
    fetch("https://localhost:5001/Item", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const todo = [];
        const done = [];
        for (const task of data) {
          if (task.state === 0) {
            todo.push(task);
          } else {
            done.push(task);
          }
        }
        setTasks(todo);
        setDoneTasks(done);
      });
  }, []);

  const markAsDone = async function (id) {
    const url = `https://localhost:5001/Item/Done/${id}`;
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  const handleDoneClick = (id) => {
    markAsDone(id).then((data) => {
      setTasks(tasks.filter((t) => t.id != id));
      setDoneTasks([data, ...doneTasks]);
    });
  };

  return (
    <>
      <h1>Things to do</h1>
      {tasks.map((task) => (
        <div key={task.id}>
          <button onClick={() => handleDoneClick(task.id)}>Done</button>{" "}
          {task.title}
        </div>
      ))}
      <h2>Already done</h2>
      {doneTasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </>
  );
};

export default TaskList;
