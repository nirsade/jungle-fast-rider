import React from "react";
import "./fastTicketCardStyle.css";

const FastTicketCard = props => {
  const { ticket } = props;
  const returnTime = ticket.return_time.substring(11, 16);

  return (
    <div
      className="fastTicketCard"
      style={{ borderTop: `4px solid ${ticket.ride.zone.color}` }}
    >
      <div className="fastTicketHeader">
        <p className="whiteText">{ticket.ride.zone.name}</p>
        <p className="greyText">{ticket.ride.name}</p>
      </div>
      <div className="fastTicketElement">
        <p className="greyText fontSize-15">Return At</p>
        <p className="whiteText fontSize-20">{returnTime}</p>
      </div>
      <div className="fastTicketElement">
        <p className="greyText fontSize-15">Use Access Code</p>
        <p className="whiteText fontSize-20">{ticket.access_code}</p>
      </div>
    </div>
  );
};

export default FastTicketCard;
