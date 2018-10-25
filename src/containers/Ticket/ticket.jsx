import React, { Component } from "react";

import './ticketStyle.css'

import Header from "../../components/Header/header";
import InfoCard from "../../components/InfoCard/infoCard";
import FastTicketCard from "../../components/FastTicketCard/fastTicketCard";

class Ticket extends Component {
  render() {
    const { ticket } = this.props;

    return (
      <div>
        <Header />
        <div className="ticketElement">
          <InfoCard name="v" color="white" />
        </div>
        <div className="ticketElement">
          <FastTicketCard ticket={ticket} />
        </div>
      </div>
    );
  }
}

export default Ticket;
