import "./App.scss";
import Banner from "./Containers/Banner/Banner";
import Hero from "./Containers/Hero/Hero";
import Grid from "./Containers/Grid/Grid";
import { useState, useEffect } from "react";
import Filter from "./components/Filter/Filter";
import checkboxes from "./assets/data/checkboxes";

function App() {
  // Setting up state for API call
  // Basic call
  const [beers, setBeers] = useState([]);
  // setting search term initial state
  const [searchTerm, setSearchTerm] = useState("");
  // Writing the handle input function
  // will just use a consople log for now
  const [checked, setChecked] = useState(
    checkboxes.map((box) => {
      return {
        id: box.id,
        Desc: box.Desc,
        checked: false,
      };
    })
  );

  // drop down to handle state of
  const [dropDown, setDropDown] = useState("Search");

  const handleSearchChange = (event) => {
    setDropDown(event.target.value);
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

  // API request
  // let searchURL = url + `&beer_name=${search}`;
  let url = "https://api.punkapi.com/v2/beers?";
  const getBeers = async (search) => {
    console.log(dropDown)
    console.log(checked[0].checked);
    // Search Name
    let searchExten;
    if (!search == "") {
      searchExten = `&beer_name=${search}`;
    } else {
      searchExten = `&page=1&per_page=80`;
    }
    // Strength > 6 % filter

    const strengthGreaterThanSix = checked[0].checked;
    let strengthCheck;

    if (strengthGreaterThanSix === true) {
      strengthCheck = `&abv_gt=6`;
    } else {
      strengthCheck = "";
    }

    // Classic Range

    const classicBeer = checked[1].checked;
    let classicCheck;

    if (classicBeer === true) {
      classicCheck = "&brewed_before=01-2010";
    } else {
      classicCheck = "";
    }

    // API call
    try {
      const res = await fetch(url + searchExten + strengthCheck + classicCheck);
      const data = await res.json(url);
      setBeers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBeers(searchTerm);
  }, [searchTerm, checked]);

  const handleInput = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  };

  const acidityCheck = (pH) => {
    return pH <= 4;
  };
  // off Filter filtering i.e. filtering by acidity
  // const finalFilteredProducts =

  // console.log(acidityFiltered);
  let filteredbeers;
  const acidBeer = checked[2].checked;
  if (acidBeer === true) {
    filteredbeers = beers.filter((beer) => acidityCheck(beer.ph));
  } else {
    filteredbeers = beers;
  }

  console.log(filteredbeers);

  return (
    <div className="App">
      <Hero />
      <Banner />
      <Filter
        searchTerm={searchTerm}
        handleInput={handleInput}
        label={"Search"}
        checked={checked}
        handleChange={handleChange}

        labelDropdown={"drop down"}
        options={[
          { label: "1", value: "fruit" },
          { label: "V", value: "vegetable" },
          { label: "M", value: "meat" },
        ]}
        value={dropDown}
        handleSearchChange = {handleSearchChange}
      />
      <Grid beers={filteredbeers} />
    </div>
  );
}

export default App;
