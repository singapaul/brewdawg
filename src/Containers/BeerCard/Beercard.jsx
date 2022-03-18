import React, { useState } from "react";
import "./Beercard.scss";
import Ticker from "react-ticker";
import Color, { Palette } from "color-thief-react";
const Loading = () => <div>Loading...</div>;

const Beercard = ({ beer }) => {
  const [tickerOn, setTickerOn] = useState(false);

  const hoveredBeer = () => {
    setTickerOn(!tickerOn);
  };

  const imgSrc = beer.image_url;
  return (
    <Palette src={imgSrc} crossOrigin="anonymous" format="hex" colorCount={4}>
      {({ data, loading }) => {
        if (loading) return <Loading />;
        return (
          <div
            className="beerCard"
            onMouseEnter={hoveredBeer}
            onMouseLeave={hoveredBeer}
            style={{ background: data[1] }}
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
              <p className="beerCard__result-abv">ABV: {beer.abv}</p>
            </div>
          </div>
        );
      }}
    </Palette>
  );
};

export default Beercard;
