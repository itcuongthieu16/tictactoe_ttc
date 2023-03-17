import React, { useState } from "react";
import Board from "./Board";

const Game = () => {
  const [boardSize, setBoardSize] = useState([]);
  const [isdisable, setIsDisable] = useState(true);

  const handleStart = () => {
    // Lấy giá trị của input và tạo ra mảng bàn cờ tương ứng
    const input = document.querySelector('input[type="text"]');
    const size = parseInt(input.value);
    const board = Array(size).fill(Array(size).fill(null));

    // Lưu mảng bàn cờ vào state boardSize
    setBoardSize(board);
    setIsDisable(false);
  };

  const resetGame = () => {
    document.querySelector('input[type="text"]').value = "";
    setBoardSize([]);
    setIsDisable(true);
  };

  return (
    <div className="flex">
      <div className="w-1/4 h-[100vh] flex flex-col bg-[#2596be]">
        <div className="mb-2 flex flex-col w-[90%] ml-4">
          <h1 className="text-5xl font-bold">Tic Tac Toe</h1>
          <label htmlFor="" className="text-[18px] font-bold mt-10">
            Nhập số bàn cờ
          </label>
          <input
            type="text"
            className="border rounded border-current hover:border-dotted outline-none py-1 px-2 float-right"
            disabled={!isdisable}
          />
        </div>
        <div className="flex gap-5 justify-end mt-10 w-[90%] ml-4">
          <button
            className="px-4 py-2 bg-black hover:bg-white hover:text-black font-bold rounded text-white float-right"
            onClick={handleStart}
            disabled={!isdisable}
          >
            Bắt đầu
          </button>
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-black hover:bg-white hover:text-black font-bold rounded text-white float-right"
          >
            Chọn lại bảng
          </button>
        </div>
      </div>

      <div className="w-[75%] h-[100vh] flex items-center justify-center">
        {boardSize.length > 0 && <Board boards={boardSize} />}
      </div>
    </div>
  );
};

export default Game;
