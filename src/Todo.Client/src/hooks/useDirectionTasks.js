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
    if (this.task) {
      return this.task.id;
    }
    return null;
  }

  get taskTitle() {
    return this.task.title;
  }

  withNewTask(task) {
    return new DirectionTask(task, this.movesLeft + movesPerTask);
  }

  move() {
    return new DirectionTask(this.task, this.movesLeft - 1);
  }
}

const randomTask = (taskList) => {
  return taskList[Math.floor(Math.random() * taskList.length)];
};

const MOVE = "move";
const INITIALIZE = "initialize";
const TASK_LIST_CHANGED = "task-list-changed";

const useDirectionTasks = (taskList) => {
  const reducer = (state, action) => {
    const move = (moveDirection) => {
      const original = state[moveDirection];
      if (taskList.some((x) => x.id === original.taskId)) {
        return original.move();
      }
      return original.move().withNewTask(randomTask(taskList));
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
        canMove: state[moveDirection].canMove,
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
