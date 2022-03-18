import React, { useState } from "react";
import "./Beercard.scss";
import Ticker from "react-ticker";
import { Palette } from "color-thief-react";
const Loading = () => <div>Loading...</div>;
const Beercard = ({ beer }) => {
  const [tickerOn, setTickerOn] = useState(false);
  const hoveredBeer = () => {
    setTickerOn(!tickerOn);
  };
  const [showText, setShowText] = useState(true);
  const handleClick = () => {
    setShowText(!showText);
  };

  const imgSrc = beer.image_url;
  return (
    <Palette src={imgSrc} crossOrigin="anonymous" format="hex" colorCount={2}>
      {({ data, loading }) => {
        if (loading) return <Loading />;
        return (
          <>
            {showText ? (
              <div
                className="beerCard"
                onMouseEnter={hoveredBeer}
                onMouseLeave={hoveredBeer}
                style={{ background: data[1] }}
                onClick={handleClick}
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
                </div>
              </div>
            )}
          </>
        );
      }}
    </Palette>
  );
};

export default Beercard;
