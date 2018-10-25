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
      selectedRide: null,
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
    const {selectedRide} = this.state;

    if (selectedRide === null) {
      alert("You must select ride");
      return;
    }

    let date = new Date();

    if (date.getHours() > 18 || date.getHours() < 9) {
      alert("The fast rider service is close");
      return;
    }

    let fastRiderUser = sessionStorage.getItem("fastRiderUser_" + pin) || null;

    //create PIN checker
    if (fastRiderUser) {
      // this user already booked today
      let hours = Number(fastRiderUser.substring(0, 2));
      let minutes = Number(fastRiderUser.substring(3, 5));
      if (!(hours < date.getHours() && minutes < date.getMinutes())) {
        alert("This user already have a fast rider ticket");
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
          if(result.code) {
            alert(result.message)
          } else {
            sessionStorage.setItem("fastRiderUser_" + pin, result.return_time.substring(11, 16));
            sessionStorage.setItem("lastFastRiderUserPin", pin)
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
