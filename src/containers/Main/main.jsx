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
      selectedRide: null
    };
  }

  componentDidMount() {
    // get all the avaiable rides
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
      selectedRide: id
    });
  }

  handleSubmit(pin) {
    const { selectedRide } = this.state;
    let date = new Date();
    let fastRiderUser = localStorage.getItem("fastRiderUser_" + pin) || null;

    if (selectedRide === null) {
      alert("You must select ride");
      return;
    }

    if (date.getHours() > 18 || date.getHours() < 9) {
      alert("Cannot assign FastRider tickets outside of working hours");
      return;
    }

    if (fastRiderUser) {
      let hours = Number(fastRiderUser.substring(0, 2));
      let minutes = Number(fastRiderUser.substring(3, 5));
      if (!(hours < date.getHours() && minutes < date.getMinutes())) {
        alert("Only one FastRider ticket can be held at any given time");
        return;
      }
    }

    // post data to the server
    fetch("http://fast-rider.herokuapp.com/api/v1/tickets", {
      method: "post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: `pin=${pin}&ride_id=${selectedRide}&token=${TOKEN}`
    })
      .then(res => res.json())
      .then(
        result => {
          if (result.code) {
            alert(result.message);
          } else {
            localStorage.setItem(
              "fastRiderUser_" + pin,
              result.return_time.substring(11, 16)
            );
            localStorage.setItem("lastFastRiderUserPin", pin);
            this.props.onFinished(result);
          }
        },
        error => {
          alert(error);
        }
      );
  }

  render() {
    const { cards, selectedRide } = this.state;
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
                active={selectedRide === card.id}
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
