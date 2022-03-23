import React, { useState } from "react";
import "./Beercard.scss";
import Ticker from "react-ticker";

const Beercard = ({ beer }) => {
  const [tickerOn, setTickerOn] = useState(false);
  const hoveredBeer = () => {
    setTickerOn(!tickerOn);
  };
  const [showText, setShowText] = useState(true);
  const handleClick = () => {
    setShowText(!showText);
  };
  console.log(beer.image_url);

  return (
    <>
      {showText ? (
        <div
          className="beerCard"
          onMouseEnter={hoveredBeer}
          onMouseLeave={hoveredBeer}
          style={{ background: "pink" }}
          onClick={handleClick}
          // eslint-disable-next-line jsx-a11y/aria-role
          role="beerCard"
        >
          <Ticker move={tickerOn} className="ticker">
            {({ index }) => (
              <>
                <p>{beer.tagline}</p>
              </>
            )}
          </Ticker>

          <div className="beerCard__result">
            <h1 className="beerCard__result-name">{beer.name}</h1>
            <img
              className="beerCard__result-image"
              src={beer.image_url}
              alt=""
            />
            <p className="beerCard__result-abv">ABV {beer.abv} %</p>
          </div>
        </div>
      ) : (
        <div className="beerCardClick" onClick={handleClick}>
          <div className="beerCardClick__resultClick">
            <h5>{beer.name}</h5>
            <h6>Release: {beer.first_brewed}</h6>
            <p>{beer.description}</p>
            <h6>Food Pairings</h6>
            <ul>
              <li>{beer.food_pairing[0]}</li>
              <li>{beer.food_pairing[1]}</li>
              <li>{beer.food_pairing[2]}</li>
            </ul>
            <p>pH: {beer.ph}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Beercard;
