import { useEffect, useReducer } from "react";
import direction from "../utils/direction";

const movesPerTask = 5;

class DirectionTask {
  constructor(task, movesLeft = movesPerTask) {
    this.task = task;
    this.moves = movesLeft;
  }

  get movesLeft() {
    return this.moves;
  }

  get canMove() {
    return this.movesLeft > 0;
  }

  get taskId() {
    return this.task?.id;
  }

  get taskTitle() {
    return this.task?.title;
  }

  withNewTask(task) {
    return new DirectionTask(task, this.movesLeft + movesPerTask);
  }

  move() {
    if (this.task) {
      return new DirectionTask(this.task, this.movesLeft - 1);
    }
    return new DirectionTask(null, movesPerTask);
  }
}

const randomTask = (taskList) => {
  if (!taskList || taskList.length === 0) {
    return null;
  }
  return taskList[Math.floor(Math.random() * taskList.length)];
};

const MOVE = "move";
const INITIALIZE = "initialize";
const TASK_LIST_CHANGED = "task-list-changed";

const useDirectionTasks = (taskList) => {
  const reducer = (state, action) => {
    const move = (moveDirection) => {
      const original = state[moveDirection];
      if (!original) {
        return null;
      }
      if (taskList.some((x) => x.id === original.taskId)) {
        return original.move();
      }
      return original.withNewTask(randomTask(taskList)).move();
    };
    switch (action.type) {
      case INITIALIZE:
        if (state.initialized) {
          return state;
        }
        for (let dirKey in direction) {
          state[direction[dirKey]] = new DirectionTask(randomTask(taskList));
        }
        state.initialized = true;
        break;
      case MOVE:
        state[action.payload.direction] = move(action.payload.direction);
        break;
      case TASK_LIST_CHANGED:
        for (let dirKey in direction) {
          const directionTask = state[direction[dirKey]];
          if (!directionTask) {
            state[direction[dirKey]] = new DirectionTask(randomTask(taskList));
          }
          if (taskList.some((task) => task.id === directionTask.taskId)) {
            continue;
          }
          state[direction[dirKey]] = directionTask.withNewTask(
            randomTask(taskList)
          );
        }
        break;
      default:
        throw new Error();
    }
    return state;
  };
  const [state, dispatch] = useReducer(reducer, { initialized: false });

  useEffect(() => {
    if (!taskList || taskList.length === 0) {
      return;
    }
    if (state.initialized) {
      dispatch({
        type: TASK_LIST_CHANGED,
      });
    } else {
      dispatch({
        type: INITIALIZE,
      });
    }
  }, [taskList]);

  const move = (moveDirection) => {
    dispatch({
      type: MOVE,
      payload: {
        direction: moveDirection,
      },
    });
  };

  const stats = (moveDirection) => {
    if (state[moveDirection]) {
      return {
        canMove:
          state[moveDirection].canMove ||
          !taskList.some((task) => task.id === state[moveDirection].taskId), // Check if task is already done
        taskTitle: state[moveDirection].taskTitle,
        movesLeft: state[moveDirection].movesLeft,
      };
    } else {
      return {
        canMove: true,
        taskTitle: "",
        movesLeft: -1,
      };
    }
  };

  return [move, stats];
};

export default useDirectionTasks;
