import useColorThief from "use-color-thief";
import { useRef } from "react";

const App = () => {
  const imgRef = useRef();

  const { color, palette } = useColorThief(imgRef, {
    format: "hex",
    colorCount: 5,
    quality: 10
  });

  return (
    <div className="app">
      <img
        width="100%"
        src="https://source.unsplash.com/random/1280x720"
        ref={imgRef}
        alt="example"
      />

      <h2>Color</h2>
      <div className="color-container">
        <p className="main-color" style={{ background: color }}>
          {color}
        </p>
      </div>

      <h2>Palette</h2>
      <div className="color-container">
        {palette?.map((paletteColor) => (
          <p style={{ background: paletteColor }} key={paletteColor}>
            {paletteColor}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
