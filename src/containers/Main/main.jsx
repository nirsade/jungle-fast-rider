import React, { Component } from "react";

import "./mainStyle.css";

import Header from "../../components/Header/header";
import InfoCard from "../../components/InfoCard/infoCard";
import UserPinBox from "../../components/UserPinBox/userPinBox";
import RideCard from "../../components/RIdeCard/rideCard";

import TOKEN from "./../../config";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      selectedCard: null
    };
  }

  componentDidMount() {
    fetch(
      `http://fast-rider.herokuapp.com/api/v1/rides?token=${TOKEN}&api_key=${TOKEN}`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            cards: result
          });
        },
        error => {
          alert(error);
        }
      );
  }

  handleCardSelection(id) {
    this.setState({
      selectedCard: id
    });
  }

  handleSubmit(pin) {
    const rideId = this.state.selectedCard;

    if (rideId === null) {
      alert("you must select ride");
      return;
    }

    // post data to the server
    fetch("http://fast-rider.herokuapp.com/api/v1/tickets", {
      method: "post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: `pin=${pin}&ride_id=${rideId}&token=${TOKEN}`
    })
      .then(
        res => res.json(),
        error => {
          console.log(error);
          alert(error);
        }
      )
      .then(result => {
        if (result.access_code) {
          this.props.onFinished(result);
        } else {
          alert(result.message);
        }
      });
  }

  render() {
    const { cards, selectedCard } = this.state;
    return (
      <div className="mainContainer">
        <Header />
        <div className="infoContainer">
          <InfoCard name="ticket" color="white" />
          <InfoCard name="arrow" color="white" />
          <InfoCard name="clock" color="white" />
        </div>
        <UserPinBox onSubmit={pin => this.handleSubmit(pin)} />
        <div className="rideCardsContainer">
          {cards.map(card => {
            return (
              <RideCard
                ride={card}
                key={card.id}
                active={selectedCard === card.id}
                onCardSelection={() => this.handleCardSelection(card.id)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Main;
