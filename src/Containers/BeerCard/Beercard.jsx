import React from "react";
import "./Beercard.scss";

const Beercard = ({ beer }) => {
  return (
    <div className="beerCard" key={beer.id}>
      <p>Name</p>
      <p>{beer.name}</p>
      <p>{beer.tagline}</p>
      <img src={beer.image_url} alt=""/>
    </div>
  );
};

export default Beercard;
