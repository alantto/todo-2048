import { useEffect, useState } from "react";

const baseItemUrl = "https://localhost:5001/Item";

const createNewTask = async function (title) {
  const url = `${baseItemUrl}?title=${title}`;
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const fetchAllTasks = async function () {
  const response = await fetch(baseItemUrl, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const sendMarkAsDone = async function (id) {
  const url = `${baseItemUrl}/Done/${id}`;
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const useTaskList = () => {
  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  useEffect(() => {
    fetchAllTasks().then((data) => {
      const todo = [];
      const done = [];
      for (const task of data) {
        if (task.state === 0) {
          todo.push(task);
        } else {
          done.push(task);
        }
      }
      setTodoList(todo);
      setDoneList(done);
    });
  }, []);

  const markAsDone = (taskId) => {
    return sendMarkAsDone(taskId).then((data) => {
      setTodoList((oldList) => oldList.filter((t) => t.id !== taskId));
      setDoneList((oldList) => [data, ...oldList]);
    });
  };

  const addTask = (taskTitle) => {
    return createNewTask(taskTitle).then((data) => {
      setTodoList((oldList) => [data, ...oldList]);
    });
  };

  return [todoList, doneList, markAsDone, addTask];
};

export default useTaskList;
