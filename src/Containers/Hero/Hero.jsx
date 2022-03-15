import React from "react";
import SiteLanding from "./../../assets/images/SiteLanding.png";
import "./Hero.scss";

const Hero = () => {
  return (
    <div className="heroContainer"> 
      <img className="heroContainer__image" src={SiteLanding} alt="" />
      <h1 className="heroContainer__greeting">Let's grab a Brew, Dawg</h1>
    </div>
  );
};

export default Hero;
