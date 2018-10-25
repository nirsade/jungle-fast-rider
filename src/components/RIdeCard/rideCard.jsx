import React, { Component } from "react";
import * as clockIcon from "./../../icons/clock-grey-icon.png";
import * as ticketIcon from "./../../icons/ticket-grey-icon.png";

import "./rideCardStyle.css";

class RideCard extends Component {

  render() {
    const { ride, active } = this.props;
    const returnTime = ride.return_time.substring(11, 16);
    const cardColor = active ? ride.zone.color : "#373737";

    return (
      <div
        className="rideCard"
        onClick={this.props.onCardSelection}
        style={{
          backgroundColor: cardColor,
          borderTop: `4px solid ${ride.zone.color}`
        }}
      >
        <p className="rideCardGreyText rideCardHeaderText">{ride.zone.name}</p>
        <p className="rideCardWhiteText">{ride.name}</p>
        <div className="rideCardFooter">
          <div className="rideCardFooterElement">
            <img className="rideCardFooterIcon" src={clockIcon} alt="clock" />
            <p className="rideCardGreyText">{returnTime}</p>
          </div>
          <div className="rideCardFooterElement">
            <img className="rideCardFooterIcon" src={ticketIcon} alt="ticket" />
            <p className="rideCardGreyText">{ride.remaining_tickets}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default RideCard;
