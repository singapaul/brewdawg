import React from "react";
import "./Beercard.scss";

const Beercard = ({ tempData }) => {
  return (
    <div className="beerCard" key={tempData.id}>
      <p>Name</p>
      <p>{tempData.name}</p>
      <p>{tempData.tagline}</p>
      <img src={tempData.image_url} alt=""/>
    </div>
  );
};

export default Beercard;
