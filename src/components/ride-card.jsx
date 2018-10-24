import React, { Component } from "react";
import * as clockIcon from "./../icons/clock-grey-icon.png";
import * as ticketIcon from "./../icons/ticket-grey-icon.png";

class RideCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active
    }
  }

  handleCardSelection(id) {
    let {active} = this.state;
    this.setState({
      active: !active
    })
  }

  render() {
    const { ride, active } = this.props;
    const returnTime = ride.return_time.substring(11, 16);
    const cardColor = active ? 'activeCardColor' : 'regularCardColor'
    return (
      <div className={`rideCardContainer ${cardColor}`} onClick={this.props.onCardSelection}>
        <div
          className="rideCardTopBorder"
          style={{ backgroundColor: ride.zone.color }}
        />
        <p className="rideCardSmallText alignSelfLeft">{ride.zone.name}</p>
        <p className="rideCardMainText">{ride.name}</p>
        <div className="rideCardFooter">
          <div className="rideCardFooterElement">
            <img className="rideCardIcon" src={clockIcon} alt="clock" />
            <p className="rideCardSmallText">{returnTime}</p>
          </div>
          <div className="rideCardFooterElement">
            <img className="rideCardIcon" src={ticketIcon} alt="ticket" />
            <p className="rideCardSmallText">{ride.remaining_tickets}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default RideCard;
