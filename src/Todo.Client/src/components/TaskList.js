import React from "react";

const TodoTask = ({ id, title, done, deleteTask }) => {
  return (
    <div className="task task-todo">
      <button onClick={() => done(id)}>Done</button> {title}{" "}
      <button onClick={() => deleteTask(id)}>Delete me</button>
    </div>
  );
};

const DoneTask = ({ id, title, deleteTask }) => {
  return (
    <div className="task task-done">
      {title}
      <button onClick={() => deleteTask(id)}>Delete me</button>
    </div>
  );
};

const TaskList = ({ todoList, doneList, markAsDone, deleteTask }) => {
  return (
    <>
      <h1>Still to do</h1>
      {todoList.map((task) => (
        <TodoTask key={task.id} done={markAsDone} deleteTask={deleteTask} {...task} />
      ))}
      <h2>Already done</h2>
      {doneList.map((task) => (
        <DoneTask key={task.id} deleteTask={deleteTask} {...task} />
      ))}
    </>
  );
};

export default TaskList;
