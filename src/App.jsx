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
    console.log(checked[0].checked)
    let searchExten
    if (!search == "") {
      searchExten = `&beer_name=${search}`;
    } else {
      searchExten = `&page=1&per_page=24`;
    }

    try {
      const res = await fetch(url + searchExten);
      const data = await res.json(url);
      setBeers(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const getBeers = async (search) => {
  //   if (!search == "") {
  //     try {
  //       // need to write a megastring in here which includes all of the states, remember we cant update the states directly we have to use the functions
  //       const res = await fetch(url + `&beer_name=${search}`);
  //       const data = await res.json();
  //       setBeers(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     try {
  //       const res = await fetch(url);
  //       const data = await res.json();
  //       setBeers(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  useEffect(() => {
    getBeers(searchTerm);
  }, [searchTerm, checked]);

  const handleInput = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  };

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
      />
      <Grid beers={beers} />
    </div>
  );
}

export default App;
