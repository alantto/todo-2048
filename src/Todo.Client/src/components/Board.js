import React, { useEffect, useState } from "react";
import Tile from "./Tile";

const copyBoard = (board) => board.map((row) => row.slice());

const addNewTile = (board) => {
  const randomIndex = () => Math.floor(Math.random() * board.length);
  const newBoard = copyBoard(board);
  while (true) {
    const col = randomIndex();
    const row = randomIndex();

    if (newBoard[row][col] === 0) {
      newBoard[row][col] = Math.random() > 0.5 ? 4 : 2;
      return newBoard;
    }
  }
};

const updateVector = (arr) => {
  const result = [];
  const values = arr.filter((x) => x > 0);
  for (let i = 0; i < values.length; i++) {
    if (i == values.length - 1 || values[i] != values[i + 1]) {
      result.push(values[i]);
    } else {
      result.push(values[i] * 2);
      i++;
    }
  }
  while (result.length < arr.length) result.push(0);

  return result;
};

const pivotBoard = (board) => {
  let newBoard = new Array(board.length);
  for (let row = 0; row < board.length; row++) {
    newBoard[row] = new Array(board.length);
    for (let col = 0; col < board.length; col++) {
      newBoard[row][col] = board[col][row];
    }
  }
  return newBoard;
};

const updateReversedVector = (arr) => updateVector(arr.reverse()).reverse();

const hasFreeTiles = (board) => {
  return board.some((row) => row.some((colValue) => colValue === 0));
};

const updateBoardState = (board, key) => {
  const isVerticalMove = key === "ArrowUp" || key === "ArrowDown";
  const sourceBoard = isVerticalMove ? pivotBoard(board) : board;

  const isReverseMove = key === "ArrowLeft" || key == "ArrowUp";
  const updateFunc = isReverseMove ? updateVector : updateReversedVector;

  let newState = sourceBoard.map(updateFunc);

  if (isVerticalMove) {
    newState = pivotBoard(newState);
  }

  return hasFreeTiles(newState) ? addNewTile(newState) : newState;
};

const ArrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

const emptyBoard = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const Board = () => {
  const [values, setValues] = useState(addNewTile(addNewTile(emptyBoard)));

  useEffect(() => {
    const onKeyDown = ({ key }) => {
      if (ArrowKeys.includes(key)) {
        setValues((oldState) => updateBoardState(oldState, key));
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
      {values.map((row, rowIndex) =>
        row.map((col, colIndex) => (
          <Tile key={`${rowIndex}-${colIndex}`} value={col} />
        ))
      )}
    </div>
  );
};

export default Board;
