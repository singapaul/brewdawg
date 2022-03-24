import React from "react";
import "./SearchBox.scss";

const SearchBox = ({ label, searchTerm, handleInput }) => {
  // might need to add a line where i clean up the input!

  return (
    <>
      <h5>Search dawgs</h5>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="search-box"
      >
        <label htmlFor={label} className="search-box__label">
          {label}
        </label>
        <input
          type="text"
          name={label}
          value={searchTerm}
          onChange={handleInput}
          className="search-box__input"
        />
      </form>
    </>
  );
};

export default SearchBox;
