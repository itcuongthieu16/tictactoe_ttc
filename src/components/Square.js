import React, { useState } from "react";

const Square = ({ value, onClick }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    onClick();
    setClicked(true);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-[50px] h-[50px] border border-[#2596be] ${
        clicked ? "bg-blue-100 text-black font-bold text-xl" : ""
      }`}
    >
      {value}
    </button>
  );
};

export default Square;
