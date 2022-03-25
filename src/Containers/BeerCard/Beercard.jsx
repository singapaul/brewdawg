import React, { useState, useRef } from "react";
import "./Beercard.scss";
import Ticker from "react-ticker";
import useColorThief from "use-color-thief";

const Beercard = ({ beer }) => {
  const imgRef = useRef();

  const { color } = useColorThief(imgRef, {
    format: "hex",
    colorCount: 5,
    quality: 10,
  });

  console.log(color);

  const [tickerOn, setTickerOn] = useState(false);
  const hoveredBeer = () => {
    setTickerOn(!tickerOn);
  };
  const [showText, setShowText] = useState(true);
  const handleClick = () => {
    setShowText(!showText);
  };


  return (
    <>
      {showText ? (
        <div
          className="beerCard"
          style={{ background: color }}
          onMouseEnter={hoveredBeer}
          onMouseLeave={hoveredBeer}
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

            <div className="beerCard__result-body">
              <p className="beerCard__result-body-ph">pH  {beer.ph}</p>
              <img
                className="beerCard__result-body-image"
                src={beer.image_url}
                alt=""
                ref={imgRef}
              />
              <p className="beerCard__result-body-abv">ABV {beer.abv} %</p>
            </div>
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
          </div>
        </div>
      )}
    </>
  );
};

export default Beercard;
