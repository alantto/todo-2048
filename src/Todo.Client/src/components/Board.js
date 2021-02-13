import React, { useState, useEffect } from "react";
import Tile from "./Tile";

const copyBoard = (board) => {
  const newBoard = [];
  for (let i = 0; i < board.length; i++) {
    newBoard.push(board[i].slice());
  }
  return newBoard;
};

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

const updateBoardState = (oldState, key) => {
  let newState = [];
  if (key === "ArrowLeft") {
    for (let i = 0; i < oldState.length; i++) {
      newState.push(updateVector(oldState[i]));
    }
  }

  if (key == "ArrowRight") {
    for (let i = 0; i < oldState.length; i++) {
      newState.push(updateReversedVector(oldState[i]));
    }
  }

  if (key == "ArrowUp") {
    let pivotedBoard = pivotBoard(oldState);

    for (let i = 0; i < oldState.length; i++) {
      newState.push(updateVector(pivotedBoard[i]));
    }

    newState = pivotBoard(newState);
  }
  if (key == "ArrowDown") {
    let pivotedBoard = pivotBoard(oldState);

    for (let i = 0; i < oldState.length; i++) {
      newState.push(updateReversedVector(pivotedBoard[i]));
    }

    newState = pivotBoard(newState);
  }

  if (hasFreeTiles(newState)) return addNewTile(newState);
  return newState;
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
