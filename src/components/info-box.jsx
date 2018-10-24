import React from "react";
import iconsInfo from "./../icons/info";

const InfoBox = props => {
  const imageSource = require(`./../icons/${props.name}-${
    props.color
  }-icon.png`);
  const info = iconsInfo[props.name];

  return (
    <div className="infoBox">
      <img src={imageSource} alt={props.name} className="infoBoxIcon" />
      <div className='inftoBoxTextContainer'>
        <p className="infoText">{info}</p>
      </div>
    </div>
  );
};

export default InfoBox;
