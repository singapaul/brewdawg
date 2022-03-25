import React from "react";
import "./Dropdown.scss";


const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <>

      <label class="label">
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.label} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    </>
  );
};

export default Dropdown;
