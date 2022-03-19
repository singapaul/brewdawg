import { useState, useEffect } from "react";
import Ticker from "react-ticker";

function App() {
  const [beerz, setBeerz] = useState([]);

  // API call
  const getBeerz = async () => {
    let url = "https://api.punkapi.com/v2/beers?&page=1&per_page=80";

    // API call

    try {
      const res = await fetch(url);
      const data = await res.json(url);
      setBeerz(data);
    } catch (error) {
      console.log(error);
    }
  };



  console.log(beerz[6].tagline);

  return (
    <></>
 
);
}

export default App;
