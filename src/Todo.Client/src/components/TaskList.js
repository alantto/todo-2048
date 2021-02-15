import React from "react";

const TodoTask = ({ id, title, done }) => {
  return (
    <div key={id} className="task task-todo">
      <button onClick={() => done(id)}>Done</button> {title}
    </div>
  );
};

const DoneTask = ({ id, title }) => {
  return (
    <div key={id} className="task task-done">
      {title}
    </div>
  );
};

const TaskList = ({ todoList, doneList, markAsDone }) => {
  return (
    <>
      <h1>Still to do</h1>
      {todoList.map((task) => (
        <TodoTask done={markAsDone} {...task} />
      ))}
      <h2>Already done</h2>
      {doneList.map((task) => (
        <DoneTask {...task} />
      ))}
    </>
  );
};

export default TaskList;
