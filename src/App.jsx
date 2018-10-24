import React, { Component } from "react";
import "./App.css";
import Header from "./components/header";
import InfoBox from "./components/info-box";
import SearchBox from './components/search-box'
import RideCard from './components/ride-card';


class App extends Component {  
  
  constructor(props) {
    super(props);
    this.cards = [];
    for(let i = 0; i<20; i++) {
      this.cards.push(1);
    }
  }

  render() {
    return (
      <div className="app">
      <div style={{width: '600px'}}>

      </div>
        <Header />
        <div className="infoContainer">
          <InfoBox name="ticket" color="white" />
          <InfoBox name="arrow" color="white" />
          <InfoBox name="clock" color="white" />
        </div>
        <SearchBox/>
        <div className='rideCardsContainer'>
          {this.cards.map((card) => {
            return (
              <RideCard/>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
