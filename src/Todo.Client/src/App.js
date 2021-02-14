import React from "react";
import Board from "./components/Board";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import useTaskList from "./hooks/useTaskList";

const App = () => {
  const [todoList, doneList, markAsDone, addTask] = useTaskList();

  return (
    <>
      <h1>Things to do</h1>
      <Board todoList={todoList} />
      <TaskForm addNew={addTask} />
      <TaskList todoList={todoList} doneList={doneList} markAsDone={markAsDone}/>
    </>
  );
};

export default App;
