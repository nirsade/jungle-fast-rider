import React, { Component } from "react";

import Main from "./containers/Main/main";
import Ticket from "./containers/Ticket/ticket";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: null
    };
  }

  handleFinished(ticket) {
    this.setState({
      ticket
    });
  }

  render() {
    const { ticket } = this.state;

    return (
      <div>
        {ticket ? (
          <Ticket ticket={ticket} />
        ) : (
          <Main onFinished={ticket => this.handleFinished(ticket)} />
        )}
      </div>
    );
  }
}

export default App;
