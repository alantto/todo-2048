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
      <main role="main">
        <section class="2048-section">
          <Board todoList={todoList} />
        </section>
        <section class="task-lists-section">
          <TaskForm addNew={addTask} />
          <TaskList
            todoList={todoList}
            doneList={doneList}
            markAsDone={markAsDone}
          />
        </section>
        <section class="info">
          <h2>How to use</h2>
          <p>
            <strong>
              Add tasks to your task from left hand menu, and finally feel free
              to play while doing things!
            </strong>
          </p>
          <p>
            Each direction has a counter, and when counter runs to zero, you
            must do task attached to that direction before you can move again.
          </p>
          <p>
            If you do task before counter goes to zero, don't worry! You will
            still get more moves from it.
          </p>
        </section>
      </main>
    </>
  );
};

export default App;
