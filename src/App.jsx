import React, { Component } from "react";
import "./App.css";
import Header from "./components/header";
import InfoBox from "./components/info-box";
import SearchBox from "./components/search-box";
import RideCard from "./components/ride-card";

const TOKEN = 'eb8e65744c1073d5702b2b689bbbbc6dfad9dcbbcf'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      selectedCard: null,
      error: null
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
          this.setState({
            error: true
          });
        }
      );
  }

  handleCardSelection(id) {
    this.setState({
      selectedCard: id
    })
  }

  handleSubmit(pin) {

    const rideId = this.state.selectedCard;
    const userPin = 'JN-0000-0000-AA';

    if(rideId == null) {
      alert('you must select ride');
      return;
    }

    //create PIN checker

    // post data to the server
    fetch(
      "http://fast-rider.herokuapp.com/api/v1/tickets",
      {
        method: 'post',   
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },     
        body: `pin=${userPin}&ride_id=${rideId}&token=${TOKEN}`,
      }
    )
      .then(res => res.json())
      .then(
        result => {
          console.log(result)
          // go to next route
        },
        error => {
          console.log(error)
          this.setState({
            error: true
          });
        }
      );
  }

  render() {
    const { cards, error, selectedCard } = this.state;
    return (
      <div className="app">
        <Header />
        {error ? <p style={{ color: "00F", fontSize: "40px" }}>Error</p> : null}
        <div className="infoContainer">
          <InfoBox name="ticket" color="white" />
          <InfoBox name="arrow" color="white" />
          <InfoBox name="clock" color="white" />
        </div>
        <SearchBox onSubmit={(pin)=>this.handleSubmit(pin)}/>
        <div className="rideCardsContainer">
          {cards.map(card => {
            return (
              <RideCard
                ride={card}
                key={card.id}
                active={selectedCard === card.id}
                onCardSelection={()=>this.handleCardSelection(card.id)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;