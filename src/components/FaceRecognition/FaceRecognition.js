import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="center ma pa2 ">
      <div className="absolute mt4">
        <img
          id="inputimage"
          alt=""
          src={imageUrl}
          width="600px"
          height="auto"
        />

        {boxes.map((box, i) => {
          const { topRow, leftCol, rightCol, bottomRow } = box;
          return (
            <div
              key={i}
              className="bounding-box"
              style={{
                left: leftCol,
                top: topRow,
                right: rightCol,
                bottom: bottomRow,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
