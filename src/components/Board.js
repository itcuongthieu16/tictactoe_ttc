import React, { useState, useEffect } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import Square from "./Square";

const Board = ({ boards }) => {
  const [board, setBoard] = useState(boards);
  const [nextPlayer, setNextPlayer] = useState("X");
  const [location, setLocation] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (checkWin(board, nextPlayer)) {
      const playAgain = window.confirm(
        `${nextPlayer} has won! Do you want to play again?`
      );
      if (playAgain) {
        setBoard(board);
        setNextPlayer("X");
        setLocation([]);
        setCurrentStep(0);
      }
    }
  }, [board, nextPlayer, boards]);

  const handleClick = (row, col) => {
    const newBoard = board.map((boardRow, rowIndex) => {
      if (rowIndex === row) {
        return boardRow.map((value, colIndex) => {
          if (colIndex === col && value === null) {
            return nextPlayer;
          }
          return value;
        });
      }
      return boardRow;
    });
    const newLocation = [...location, [row, col]];
    setBoard(newBoard);
    setNextPlayer(nextPlayer === "X" ? "O" : "X");
    setLocation(newLocation);
    setCurrentStep(newLocation.length);
  };

  const checkWin = (board, player) => {
    // Kiểm tra hàng
    for (let i = 0; i < board.length; i++) {
      if (board[i].every((square) => square === player)) {
        return true;
      }
    }

    // Kiểm tra cột
    for (let i = 0; i < board.length; i++) {
      if (board.every((row) => row[i] === player)) {
        return true;
      }
    }

    // Kiểm tra đường chéo chính
    const leftToRight = [];
    for (let i = 0; i < board.length; i++) {
      leftToRight.push(board[i][i]);
    }
    if (leftToRight.every((square) => square === player)) {
      return true;
    }

    // Kiểm tra đường chéo phụ
    const rightToLeft = [];
    for (let i = 0; i < board.length; i++) {
      rightToLeft.push(board[i][board.length - i - 1]);
    }
    if (rightToLeft.every((square) => square === player)) {
      return true;
    }

    return false;
  };

  return (
    <div className="flex gap-20">
      <div>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((square, colIndex) => (
              <Square
                key={colIndex}
                value={square}
                onClick={() => handleClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="float-right">
        <Scrollbars style={{ width: 150, height: 250 }}>
          <ol>
            {location.map((item, index) => (
              <li key={index}>
                <button
                  className={
                    index === currentStep - 1
                      ? "font-bold mb-3 border rounded w-50 mt-3 h-7"
                      : ""
                  }
                  onClick={() => setCurrentStep(index + 1)}
                >
                  {`Lượt ${index + 1}:  (${item[0]}, ${item[1]})`}
                </button>
              </li>
            ))}
          </ol>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Board;
