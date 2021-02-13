import React, { useEffect } from "react";
import Tile from "./Tile";
import direction from "../utils/direction";
import useBoard from "../hooks/useBoard";

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
const Board = () => {
  const [board, updateBoard] = useBoard();

  useEffect(() => {
    const onKeyDown = ({ key }) => {
      const moveDirection = keyToDirection(key)
      if (moveDirection) {
        updateBoard(moveDirection);
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="board-wrapper">
      {" "}
      {board.map((row, rowIndex) =>
        row.map((col, colIndex) => (
          <Tile key={`${rowIndex}-${colIndex}`} value={col} />
        ))
      )}
    </div>
  );
};

export default Board;
