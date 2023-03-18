import React, { useState, useMemo, useCallback } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import Square from "./Square";

const Board = ({ boards }) => {
  const [board, setBoard] = useState(boards);
  const [nextPlayer, setNextPlayer] = useState("X");
  const [location, setLocation] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [winningSquares, setWinningSquares] = useState([]);
  const [gameResult, setGameResult] = useState(null);

  console.log(winningSquares);

  const resetGame = useCallback(() => {
    setBoard(boards);
    setNextPlayer("X");
    setLocation([]);
    setCurrentStep(0);
    setWinningSquares([]);
    setGameResult(null);
  }, [boards]);

  const checkWin = useMemo(() => {
    const fn = (board, player) => {
      // Kiểm tra hàng
      for (let i = 0; i < board.length; i++) {
        if (board[i].every((square) => square === player)) {
          setWinningSquares(board[i].map((square, index) => [i, index]));
          return true;
        }
      }

      // Kiểm tra cột
      for (let i = 0; i < board.length; i++) {
        if (board.every((row) => row[i] === player)) {
          setWinningSquares(board.map((row, index) => [index, i]));
          return true;
        }
      }

      // Kiểm tra đường chéo chính
      const leftToRight = [];
      for (let i = 0; i < board.length; i++) {
        leftToRight.push(board[i][i]);
      }
      if (leftToRight.every((square) => square === player)) {
        setWinningSquares(leftToRight.map((square, index) => [index, index]));
        return true;
      }

      // Kiểm tra đường chéo phụ
      const rightToLeft = [];
      for (let i = 0; i < board.length; i++) {
        rightToLeft.push(board[i][board.length - i - 1]);
      }
      if (rightToLeft.every((square) => square === player)) {
        setWinningSquares(
          rightToLeft.map((square, index) => [index, board.length - index - 1])
        );
        return true;
      }

      return false;
    };
    return fn;
  }, []);

  const checkTie = useMemo(() => {
    const fn = (board) => {
      return board.every((row) => row.every((square) => square !== null));
    };
    return fn;
  }, []);

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
    if (checkWin(newBoard, nextPlayer)) {
      setGameResult(`Người chơi ${nextPlayer} đã thắng!`);
      setTimeout(() => {
        if (window.confirm("Bạn có muốn chơi lại không?")) {
          resetGame();
        }
      }, 1000);
    } else if (checkTie(newBoard)) {
      setGameResult("Trò chơi kết thúc hoà.");
      setTimeout(() => {
        if (window.confirm("Bạn có muốn chơi lại không?")) {
          resetGame();
        }
      }, 1000);
    } else {
      setLocation(newLocation);
      setCurrentStep(newLocation.length);
      setNextPlayer(nextPlayer === "X" ? "O" : "X");
    }
  };
  return (
    <div className="flex gap-20">
      <div>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((square, colIndex) => {
              const isWinningSquare = winningSquares.some(
                ([winningRow, winningCol]) =>
                  winningRow === rowIndex && winningCol === colIndex
              );
              return (
                <Square
                  key={colIndex}
                  value={square}
                  onClick={() => handleClick(rowIndex, colIndex)}
                  resetGame={resetGame}
                  isWinningSquare={isWinningSquare}
                />
              );
            })}
          </div>
        ))}
        {gameResult ? (
          <p className="flex items-center justify-center mt-10 font-bold">
            {gameResult}
          </p>
        ) : (
          ""
        )}
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

// import React, { useState, useMemo, useCallback } from "react";
// import Scrollbars from "react-custom-scrollbars-2";
// import Square from "./Square";

// const Board = ({ boards }) => {
//   const [board, setBoard] = useState(boards);
//   const [nextPlayer, setNextPlayer] = useState("X");
//   const [location, setLocation] = useState([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [winningSquares, setWinningSquares] = useState([]);
//   const [gameResult, setGameResult] = useState(null);

//   const checkWin = useCallback((board, player) => {
//     // Kiểm tra hàng
//     for (let i = 0; i < board.length; i++) {
//       if (board[i].every((square) => square === player)) {
//         setWinningSquares(board[i].map((square, index) => [i, index]));
//         return true;
//       }
//     }

//     // Kiểm tra cột
//     for (let i = 0; i < board.length; i++) {
//       if (board.every((row) => row[i] === player)) {
//         setWinningSquares(board.map((row, index) => [index, i]));
//         return true;
//       }
//     }

//     // Kiểm tra đường chéo chính
//     const leftToRight = [];
//     for (let i = 0; i < board.length; i++) {
//       leftToRight.push(board[i][i]);
//     }
//     if (leftToRight.every((square) => square === player)) {
//       setWinningSquares(leftToRight.map((square, index) => [index, index]));
//       return true;
//     }

//     // Kiểm tra đường chéo phụ
//     const rightToLeft = [];
//     for (let i = 0; i < board.length; i++) {
//       rightToLeft.push(board[i][board.length - i - 1]);
//     }
//     if (rightToLeft.every((square) => square === player)) {
//       setWinningSquares(
//         rightToLeft.map((square, index) => [index, board.length - index - 1])
//       );
//       return true;
//     }

//     return false;
//   }, []);

//   const checkTie = useCallback((board) => {
//     return board.every((row) => row.every((square) => square !== null));
//   }, []);

//   const resetGame = useCallback(() => {
//     setBoard(boards);
//     setNextPlayer("X");
//     setLocation([]);
//     setCurrentStep(0);
//     setWinningSquares([]);
//     setGameResult(null);
//   }, [boards]);

//   const handleClick = (row, col) => {
//     if (gameResult) return;

//     const newBoard = board.map((boardRow, rowIndex) => {
//       if (rowIndex === row) {
//         return boardRow.map((value, colIndex) => {
//           if (colIndex === col && value === null) {
//             return nextPlayer;
//           }
//           return value;
//         });
//       }
//       return boardRow;
//     });

//     const newLocation = [...location, [row, col]];
//     setBoard(newBoard);
//     setLocation(newLocation);
//     setCurrentStep(newLocation.length);
//     setNextPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));

//     if (checkWin(newBoard, nextPlayer)) {
//       setGameResult(`${nextPlayer} wins!`);
//     } else if (checkTie(newBoard)) {
//       setGameResult("Tie!");
//     }
//   };

//   const jumpTo = useCallback(
//     (step) => {
//       setCurrentStep(step);
//       setBoard(boards.slice(0, step + 1));
//       setLocation(location.slice(0, step));
//       setNextPlayer(step % 2 === 0 ? "X" : "O");
//       setWinningSquares([]);
//       setGameResult(null);
//     },
//     [boards, location]
//   );

//   const renderSquare = (row, col) => {
//     const value = board[row][col];
//     const isWinningSquare = winningSquares.some(
//       (square) => square[0] === row && square[1] === col
//     );
//     return (
//       <Square
//         key={`${row}-${col}`}
//         value={value}
//         isWinningSquare={isWinningSquare}
//         onClick={() => handleClick(row, col)}
//       />
//     );
//   };

//   const renderHistory = useMemo(() => {
//     return location.map((step, move) => {
//       const desc = move
//         ? `Go to move #${move} (${step[0]}, ${step[1]}) `
//         : "Go to game start";

//       return (
//         <li key={move}>
//           <button className="history" onClick={() => jumpTo(move)}>
//             {desc}
//           </button>
//         </li>
//       );
//     });
//   }, [location, jumpTo]);

//   return (
//     <div className="game-board">
//       <div className="status">
//         {gameResult ? gameResult : `Next player: ${nextPlayer}`}
//       </div>
//       <Scrollbars autoHide>
//         <div className="board-row">
//           {board.map((row, index) => (
//             <div key={index} className="board-row">
//               {row.map((col, index2) => renderSquare(index, index2))}
//             </div>
//           ))}
//         </div>
//       </Scrollbars>
//       <button className="reset" onClick={() => resetGame()}>
//         Reset
//       </button>
//       <ul className="history-list">{renderHistory}</ul>
//     </div>
//   );
// };

// export default Board;
