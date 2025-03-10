import React from "react";

const Button = ({ text, onClick, disabled }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md text-white ${
        disabled ? "bg-gray-300 cursor-not-allowed" : "bg-[#9bc957] hover:bg-[#9bc957]"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
