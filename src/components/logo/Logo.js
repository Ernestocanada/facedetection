import React from "react";
import Tilt from "react-tilt";
import "./logo.css";
import brain from "./innovation.png";

const Logo = () => {
  return (
    <div className="ma4 mt0 flex ">
      <div className="relative z-5">
        <Tilt
          className="Tilt br2 shadow-2"
          options={{ max: 180 }}
          style={{ height: 150, width: 150 }}
        >
          <div className="Tilt-inner pa3">
            <img alt="logo" src={brain} />
          </div>
        </Tilt>
      </div>
    </div>
  );
};

export default Logo;
