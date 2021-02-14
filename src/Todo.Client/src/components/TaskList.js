import React from "react";

const TaskList = ({todoList, doneList, markAsDone}) => {

  return (
    <>
      <h1>Still to do</h1>
      {todoList.map((task) => (
        <div key={task.id}>
          <button onClick={() => markAsDone(task.id)}>Done</button>{" "}
          {task.title}
        </div>
      ))}
      <h2>Already done</h2>
      {doneList.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </>
  );
};

export default TaskList;
