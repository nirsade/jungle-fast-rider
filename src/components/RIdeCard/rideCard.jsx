import React from "react";
import "./rideCardStyle.css";
import * as clockIcon from "./../../icons/clock-grey-icon.png";
import * as ticketIcon from "./../../icons/ticket-grey-icon.png";

const RideCard = props => {
  const { ride, active } = props;
  const returnTime = ride.return_time.substring(11, 16);
  const cardColor = active ? ride.zone.color : "#373737";

  return (
    <div
      className="rideCard"
      onClick={props.onCardSelection}
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
};

export default RideCard;
