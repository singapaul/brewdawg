import "./App.scss";
import Banner from "./Containers/Banner/Banner";
import Hero from "./Containers/Hero/Hero";
import Grid from "./Containers/Grid/Grid";
import { useState, useEffect } from "react";
import Filter from "./components/Filter/Filter";


function App() {
  // Setting up state for API call
  // Basic call
  const [beers, setBeers] = useState([]);
  const url = "https://api.punkapi.com/v2/beers?page=2&per_page=80";


  const getBeers = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setBeers(data);
  };

  useEffect(() => {
    getBeers(beers);
  }, []);

  return (
    <div className="App">
      <Hero />
      <Banner />
      <Filter/>
      <Grid beers={beers} />
    </div>
  );
}

export default App;
