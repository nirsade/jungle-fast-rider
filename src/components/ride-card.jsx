import React, { Component } from "react";
import * as clockIcon from "./../icons/clock-grey-icon.png";
import * as ticketIcon from "./../icons/ticket-grey-icon.png";

class RideCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="rideCardContainer">
        <div
          className="rideCardTopBorder"
          style={{ backgroundColor: "#00ff00" }}
        />
        <p className="rideCardSmallText alignSelfLeft">this is upperText</p>
        <p className="rideCardMainText">Big Town Hall</p>
        <div className="rideCardFooter">
          <div className="rideCardFooterElement">
            <img className="rideCardIcon" src={clockIcon} alt="clock" />
            <p className="rideCardSmallText">12:30</p>
          </div>
          <div className="rideCardFooterElement">
            <img className="rideCardIcon" src={ticketIcon} alt="ticket" />
            <p className="rideCardSmallText">30</p>
          </div>
        </div>
      </div>
    );
  }
}

export default RideCard;
