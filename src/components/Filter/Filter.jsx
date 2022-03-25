import React from "react";
import Checkbox from "../../Containers/Checkbox/Checkbox";
import Dropdown from "../../Containers/Dropdown/Dropdown";
import SearchBox from "../SearchBox/SearchBox";
import "./Filter.scss";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import filterIcon from "../../assets/images/Filter.png";
import { useState, useEffect } from "react";

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

  const [showMenu, setShowMenu] = useState(true);

  const [windowIsDesktop, setwindowIsDesktop] = useState(
    window.innerWidth > 1024
  );

  const handleResize = () => {
    setwindowIsDesktop(window.innerWidth > 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div id="filter" className="filter">
      <div className="filter__heading">
        <h2 className="filter__heading-text">Filter Dawg</h2>
        {(
          <button onClick={handleClick} className="filter__heading-button">
            <img src={filterIcon} alt="" />
          </button>
        )}
      </div>

      {showMenu && (
        <div className="filter__selectors">
          <div className="filter__selectors-search">
            <SearchBox
              searchTerm={searchTerm}
              handleInput={handleInput}
              label={searchlabel}
            />
            <Dropdown
              label={labelDropdown}
              options={options}
              value={value}
              onChange={handleSearchChange}
            />
          </div>

          <div className="filter__selectors-checkbox">
            {checkboxArr}
          </div>

          <div className="filter__selectors-sort">
            <h5>Sorty Dawgs</h5>
            <Dropdown
              label={labelSort}
              options={sortOptions}
              value={sortValue}
              onChange={handleSortChange}
            />
          </div>

          <div className="filter__selectors-slider">
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
      )}
    </div>
  );
};

export default Filter;
