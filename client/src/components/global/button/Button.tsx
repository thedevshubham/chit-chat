import React from "react";
import "./button.scss";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<ButtonProps> = ({ type, text, onClick }) => {
  return (
    <button type={type} onClick={onClick} className="global_button">
      {text}
    </button>
  );
};

export default Button;
