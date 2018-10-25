import React from "react";
import './infoCardStyle.css';
import iconsInfo from "../../icons/info";

const InfoCard = props => {
  const imageSource = require(`./../../icons/${props.name}-${props.color}-icon.png`);
  const info = iconsInfo[props.name];

  return (
    <div className="infoCard">
      <img src={imageSource} alt={props.name} className="infoIcon" />
      <div className="infoTextContainer">
        <p className="infoText">{info}</p>
      </div>
    </div>
  );
};

export default InfoCard;
