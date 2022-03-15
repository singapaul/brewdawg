import React from "react";
// this is a container to hold the cards. We will do the map in here
import Beercard from "../BeerCard/Beercard";
import "./Grid.scss"

const Grid = ({ tempData }) => {
  return (
    <div className="Grid">
      {tempData.map((beer) => {
        return <Beercard tempData={beer} />;
      })}
    </div>
  );
};

export default Grid;
