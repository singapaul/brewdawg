import React from "react";
// this is a container to hold the cards. We will do the map in here
import Beercard from "../BeerCard/Beercard";
import "./Grid.scss"

const Grid = ({ beers }) => {
  return (
    <div className="Grid">
      {beers.map((beer) => {
        return <Beercard key={beer.id} beer={beer} />;
      })}
    </div>
  );
};

export default Grid;
