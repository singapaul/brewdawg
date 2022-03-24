import "./App.scss";
import Banner from "./Containers/Banner/Banner";
import Hero from "./Containers/Hero/Hero";
import Grid from "./Containers/Grid/Grid";
import { useState, useEffect } from "react";
import Filter from "./components/Filter/Filter";
import checkboxes from "./assets/data/checkboxes";
import {
  searchExtensionFunction,
  classCheckFunction,
  acidFilterFunction,
  sortBeersFunction,
  searchCategoryFunction,
  preAPIFilterCheck,
} from "./utilities/functions.js";

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [checked, setChecked] = useState(
    checkboxes.map((box) => {
      return {
        id: box.id,
        Desc: box.Desc,
        checked: false,
      };
    })
  );
  const [dropDown, setDropDown] = useState("Name");
  const [sortDropDown, setSortDropDown] = useState("Default");

  // Multi slide state management
  const [valueMulti, setValue] = useState([0, 20]);

  const handleSlideChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchChange = (event) => {
    setDropDown(event.target.value);
  };
  const handleSortChange = (event) => {
    setSortDropDown(event.target.value);
  };

  const handleChange = (event) => {
    setChecked(
      checked.map((obj) =>
        obj.id.toString() === event.target.id
          ? { ...obj, checked: event.target.checked }
          : obj
      )
    );
  };

  const handleInput = (event) => {
    setSearchTerm(event.target.value);
  };

  // API call
  const getBeers = async (search, dropDown, checked, valueMulti) => {
    const searchCat = searchCategoryFunction(dropDown);

    let url = "https://api.punkapi.com/v2/beers?";

    const searchExten = searchExtensionFunction(search, searchCat);

    // Strength checks (3 cases)
    const strengthGreaterThanSix = checked[0].checked;
    const normalBeersCheck = checked[3].checked;
    const MultiVals = preAPIFilterCheck(
      normalBeersCheck,
      strengthGreaterThanSix
    );

    valueMulti[0] = MultiVals[0];
    valueMulti[1] = MultiVals[1];

    const classicBeer = checked[1].checked;
    const classicCheck = classCheckFunction(classicBeer);

    let minbeerStrength = valueMulti[0];
    let maxbeerStrength = valueMulti[1];
    let gretrThan = `&abv_gt=${minbeerStrength}`;
    let lesssThan = `&abv_lt=${maxbeerStrength}`;

    // API call

    try {
      const res = await fetch(
        url + searchExten + classicCheck + gretrThan + lesssThan
      );
      const data = await res.json(url);
      setBeers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredbeers = acidFilterFunction(checked[2], beers);
  const sortedBeers = sortBeersFunction(sortDropDown, filteredbeers);

  useEffect(() => {
    getBeers(searchTerm, dropDown, checked, valueMulti);
  }, [checked, dropDown, searchTerm, valueMulti]);

  return (
    <div className="App">
      <Hero />
      <div className="wrapper">
        <Filter
          searchTerm={searchTerm}
          handleInput={handleInput}
          label={"Search"}
          checked={checked}
          handleChange={handleChange}
          labelDropdown={"drop down"}
          options={[
            { label: "Name", value: "beerName" },
            { label: "Food Pairings", value: "foodName" },
            { label: "Yeast", value: "yeastName" },
            { label: "Hops", value: "hopsName" },
            { label: "Malt", value: "maltName" },
          ]}
          value={dropDown}
          handleSearchChange={handleSearchChange}
          // sort search props
          labelSort={"sorty dropdown"}
          sortOptions={[
            { label: "Default", value: "default" },
            { label: "ABV % (high to low)", value: "abvHighLow" },
            { label: "ABV % (low to high)", value: "abvLowHigh" },
            { label: "Release date (Earliest)", value: "releaseRecent" },
            { label: "Release date (Oldest)", value: "releaseOld" },
          ]}
          sortValue={sortDropDown}
          handleSortChange={handleSortChange}
          // props for multi slide
          sx={{ width: 150 }}
          getAriaLabel={() => "Temperature range"}
          handleSlideChange={handleSlideChange}
          valueMulti={valueMulti}
          valueLabelDisplay={"auto"}
          min={0}
          max={56}
        />

        <Grid beers={sortedBeers} />
      </div>
    </div>
  );
}

export default App;
