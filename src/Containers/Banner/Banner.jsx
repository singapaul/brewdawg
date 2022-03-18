import React from "react";
import "./Banner.scss";
import Ticker from "react-ticker";

const Banner = () => {
  return (
    <div className="Banner">
      <Ticker className="ticker">
        {({ index }) => (
          <>
            <p>{"beer"}</p>
          </>
        )}
      </Ticker>
    </div>
  );
};

export default Banner;
