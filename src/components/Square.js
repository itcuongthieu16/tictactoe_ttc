import React, { useState } from "react";

const Square = ({ value, onClick, resetGame, isWinningSquare }) => {
  console.log(isWinningSquare);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (value === null) {
      onClick();
      setClicked(true);
    }
  };

  const buttonClasses = `w-[50px] h-[50px] border border-[#2596be] text-black font-bold text-xl ${
    isWinningSquare ? "bg-yellow-200" : ""
  }`;

  return (
    <button onClick={handleClick} className={buttonClasses}>
      {value}
    </button>
  );
};

export default Square;
