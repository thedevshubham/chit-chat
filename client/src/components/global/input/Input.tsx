import React, { ChangeEvent } from "react";
import "./input.scss";

interface InputProps {
  type: "text" | "email" | "password" | "number" | "date"; // Define acceptable input types
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  required,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="inputfield"
    />
  );
};

export default Input;
