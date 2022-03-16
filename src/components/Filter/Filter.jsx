import React from "react";
import Checkbox from "../../Containers/Checkbox/Checkbox";
import SearchBox from "../SearchBox/SearchBox";
import "./Filter.scss";

// This is just a middle child
const Filter = ({
  searchTerm,
  handleInput,
  searchlabel,
  checked,
  handleChange,
}) => {
  const checkboxArr = checked.map((box) => {
    return (
      <Checkbox key={box.id}
        handleChange={handleChange}
        checked={box.checked}
        label={box.Desc}
        id ={box.id}
      />
    );
  });

  return (
    <div className="filter">
      <h2>Filter Box</h2>
      <h3>Search Box</h3>
      <SearchBox
        searchTerm={searchTerm}
        handleInput={handleInput}
        label={searchlabel}
      />

      <h3>Mandatory checkboxes</h3>
      <div>{checkboxArr}</div>
    </div>
  );
};

export default Filter;
