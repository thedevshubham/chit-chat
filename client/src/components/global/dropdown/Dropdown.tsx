import React, { ChangeEvent } from "react";
import "./dropdown.scss";

interface DropdownProps {
  name: string;
  value: string;
  options: string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  required: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  name,
  value,
  options,
  onChange,
  required,
}) => {
  return (
    <select name={name} value={value} onChange={onChange} required={required}>
      <option value="" className="default-option">
        Select gender
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
