import React from "react";
import "./Hero.scss";

const Hero = () => {
  return (
    <div className="heroContainer">
      <h1>Let's grab a Brew, Dawg</h1>
      <button className="heroContainer__button">
        <a href="#filter">Pour me a beer</a>
      </button>
    </div>
  );
};

export default Hero;
