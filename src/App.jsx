import "./App.scss";
import Banner from "./Containers/Banner/Banner";
import Hero from "./Containers/Hero/Hero";
import Grid from "./Containers/Grid/Grid";
import { useState, useEffect } from "react";
import Filter from "./components/Filter/Filter";
import checkboxes from "./assets/data/checkboxes";

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

  useEffect(() => {
    getBeers(searchTerm);
  }, [searchTerm, checked, dropDown, sortDropDown]);

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

  // API request
  // let searchURL = url + `&beer_name=${search}`;
  let url = "https://api.punkapi.com/v2/beers?";
  const getBeers = async (search) => {
    console.log(sortDropDown);
    let searchCat;
    if (dropDown === "beerName") {
      searchCat = `&beer_name=`;
    } else if (dropDown === "foodName") {
      searchCat = `&food=`;
    } else if (dropDown === "maltName") {
      searchCat = `&malt=`;
    } else if (dropDown === "hopsName") {
      searchCat = `&hops=`;
    } else if (dropDown === "yeastName") {
      searchCat = `&yeast=`;
    } else {
      searchCat = "";
    }

    // Search Name
    let searchExten;

    // if (!search == "") {
    //   searchExten = `&beer_name=${search}`;
    // } else {
    //   searchExten = `&page=1&per_page=80`;
    // }

    if (!search == "") {
      searchExten = searchCat + search;
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

  // Post API call filters
  const acidityCheck = (pH) => {
    return pH <= 4;
  };
  let filteredbeers;
  const acidBeer = checked[2].checked;
  if (acidBeer === true) {
    filteredbeers = beers.filter((beer) => acidityCheck(beer.ph));
  } else {
    filteredbeers = beers;
  }
  // Filter to check for valid thumbnail below:

  // sorting the beers
  // sort by release date
  // sort strength
  // console.log(filteredbeers[0].first_brewed);
  // console.log(filteredbeers[0].abv);
  let sortedBeers;
  if (sortDropDown === "default") {
    sortedBeers = filteredbeers;
  } else if (sortDropDown === "abvHighLow") {
    sortedBeers = filteredbeers.sort((a, b) => b.abv - a.abv);
  } else if (sortDropDown === "abvLowHigh") {
    sortedBeers = filteredbeers.sort((a, b) => a.abv - b.abv);
  } else if (sortDropDown === "releaseRecent") {
    sortedBeers = filteredbeers.sort(function (a, b) {
      let aa = a.first_brewed.split("/").reverse().join(),
        bb = b.first_brewed.split("/").reverse().join();
      return bb < aa ? -1 : bb > aa ? 1 : 0;
    });
  } else if (sortDropDown === "releaseOld") {
    sortedBeers = filteredbeers.sort(function (a, b) {
      let aa = a.first_brewed.split("/").reverse().join(),
        bb = b.first_brewed.split("/").reverse().join();
      return aa < bb ? -1 : aa > bb ? 1 : 0;
    });
  } else {
    sortedBeers = filteredbeers;
  }

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
        // Dropdown search sort
        labelDropdown={"drop down"}
        options={[
          { label: "Name", value: "beerName" },
          { label: "Food Pairings", value: "foodNamne" },
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
      />
      <Grid beers={sortedBeers} />
    </div>
  );
}

export default App;
