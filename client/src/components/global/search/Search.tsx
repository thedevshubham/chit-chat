import React from "react";
import "./search.scss";

interface SearchProps {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ placeholder, onChange }) => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="search_input"
      />
    </div>
  );
};

export default Search;
