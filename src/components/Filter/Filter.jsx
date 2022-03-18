import React from "react";
import Checkbox from "../../Containers/Checkbox/Checkbox";
import Dropdown from "../../Containers/Dropdown/Dropdown";
import SearchBox from "../SearchBox/SearchBox";
import "./Filter.scss";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

// This is just a middle child
const Filter = ({
  searchTerm,
  handleInput,
  searchlabel,
  checked,
  handleChange,

  // dropdown search props
  labelDropdown,
  options,
  value,
  handleSearchChange,

  // sort props
  labelSort,
  sortOptions,
  sortValue,
  handleSortChange,

  // multi props

  sx,
  getAriaLabel,
  handleSlideChange,
  valueMulti,
  valueLabelDisplay,
  min,
  max,
}) => {
  const checkboxArr = checked.map((box) => {
    return (
      <Checkbox
        key={box.id}
        handleChange={handleChange}
        checked={box.checked}
        label={box.Desc}
        id={box.id}
      />
    );
  });

  return (
    <div className="filter">
      <h2>Filter Dawg</h2>
      <h5>Search dawgs</h5>

      <div class="filter__searchBox">
        <SearchBox
          searchTerm={searchTerm}
          handleInput={handleInput}
          label={searchlabel}
          className="filter__searchBox-input"
        />
        <Dropdown
          label={labelDropdown}
          options={options}
          value={value}
          onChange={handleSearchChange}
          className="filter__searchBox-list"
        />
      </div>
      <h5>Checkbox Dawgs</h5>
      <div className="filter__checkBoxes">{checkboxArr}</div>
      <div className="filter__dropDown">
        <h5>Sorty Dawgs</h5>
        <Dropdown
          label={labelSort}
          options={sortOptions}
          value={sortValue}
          onChange={handleSortChange}
        />
      </div>
      <div className="filter__slider">
        <h5>Strength Slider (ABV %) </h5>
        <Box sx={sx}>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={valueMulti}
            onChange={handleSlideChange}
            valueLabelDisplay={valueLabelDisplay}
            min={min}
            max={max}
            disableSwap
          />
        </Box>
      </div>
    </div>
  );
};

export default Filter;
