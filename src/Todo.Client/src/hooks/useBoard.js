import { useState } from "react";
import direction from "../utils/direction";

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
    if (i === values.length - 1 || values[i] !== values[i + 1]) {
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



const makeMoveInBoard = (board, moveDirection) => {
  const isVerticalMove =
    moveDirection === direction.up || moveDirection === direction.down;
  const sourceBoard = isVerticalMove ? pivotBoard(board) : board;

  const isReverseMove =
    moveDirection === direction.left || moveDirection === direction.up;
  const updateFunc = isReverseMove ? updateVector : updateReversedVector;

  let newState = sourceBoard.map(updateFunc);

  if (isVerticalMove) {
    newState = pivotBoard(newState);
  }
  return newState;
};

const hasAllowedMoves = (board) => {
  if (hasFreeTiles(board)) {
    return true;
  }
  for (const dir in direction) {
      const moveDirection = direction[dir];
      const newBoard = makeMoveInBoard(board, moveDirection);
      if (hasFreeTiles(newBoard)) {
        return true;
      }
  }
  return false;
};

const updateBoardState = (board, moveDirection, noAllowedMovesCallback) => {
  let newState = makeMoveInBoard(board, moveDirection);

  if (hasFreeTiles(newState)) {
    newState = addNewTile(newState);
  }
  if (!hasAllowedMoves(newState)) {
    noAllowedMovesCallback();
  }
  return newState;
};

const emptyBoard = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const useBoard = (noMoreMovesCallback) => {
  const [board, setBoard] = useState(addNewTile(addNewTile(emptyBoard)));

  const updateBoard = (moveDirection) => {
    setBoard((oldBoard) =>
      updateBoardState(oldBoard, moveDirection, noMoreMovesCallback)
    );
  };
  return [board, updateBoard];
};

export default useBoard;
