import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import direction from "../utils/direction";
import useBoard from "../hooks/useBoard";
import useAlert from "../hooks/useAlert";
import useDirectionTasks from "../hooks/useDirectionTasks";

const keyToDirection = (key) => {
  switch (key) {
    case "ArrowUp":
      return direction.up;
    case "ArrowDown":
      return direction.down;
    case "ArrowLeft":
      return direction.left;
    case "ArrowRight":
      return direction.right;
    default:
      return null;
  }
};

const Board = ({ todoList }) => {
  const [alertHtml, updateAlert] = useAlert();
  const setGameOver = () =>
    updateAlert("Game over! Reload to start a new game", true);
  const [board, updateBoard] = useBoard(setGameOver);
  const [move, directionInfo] = useDirectionTasks(todoList);

  useEffect(() => {
    const onKeyDown = ({ key }) => {
      const moveDirection = keyToDirection(key);
      if (moveDirection === null) {
        return;
      }

      const status = directionInfo(moveDirection);
      if (status.canMove) {
        move(moveDirection);
        updateBoard(moveDirection);
      } else {
        updateAlert(
          "You must do " + status.taskTitle + " before moving to this direction"
        );
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const StatsRow = ({ directionName, direction }) => {
    const { taskTitle, canMove, movesLeft } = directionInfo(direction);
    return (
      <tr>
        <td>{directionName}</td>
        <td>{taskTitle}</td>
        <td>{canMove ? "Yes" : "NO"}</td>
        <td>{movesLeft}</td>
      </tr>
    );
  };

  const StatsTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Direction</th>
            <th>Task</th>
            <th>Allowed?</th>
            <th>Moves left</th>
          </tr>
        </thead>
        <tbody>
          <StatsRow directionName={"Left"} direction={direction.left} />
          <StatsRow directionName={"Up"} direction={direction.up} />
          <StatsRow directionName={"Right"} direction={direction.right} />
          <StatsRow directionName={"Down"} direction={direction.down} />
        </tbody>
      </table>
    );
  };
  return (
    <>
      <div></div>
      <div className="board-wrapper">
        {" "}
        {board.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <Tile key={`${rowIndex}-${colIndex}`} value={col} />
          ))
        )}
      </div>
      <StatsTable />
      {alertHtml}
    </>
  );
};

export default Board;
