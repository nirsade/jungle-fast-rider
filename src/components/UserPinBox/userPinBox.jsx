import React, { Component } from "react";
import "./userPinBoxStyle.css";

class UserPinBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: sessionStorage.getItem("lastFastRiderUserPin") || ""
    };
  }

  checkValidPinNumber(pin) {
    let pinArr = pin.split("-");

    // check for the first part of the string
    if (pinArr[0] !== "JN") {
      return false;
    }

    // check if the two string contains only numbers
    if (!/^[0-9]+$/.test(pinArr[1]) || !/^[0-9]+$/.test(pinArr[2])) {
      return false;
    }

    let lettersArr = [null, null];
    for (let i = 0; i < 2; i++) {
      let number = pinArr[i + 1]
        .split("")
        .map((n, index) => {
          n = Number(n);
          let x = index % 2 === 0 ? n * 1 : n * 2;
          if (x < 10) {
            return x;
          } else {
            return x
              .toString()
              .split("")
              .reduce((a, c) => Number(a) + Number(c));
          }
        })
        .reduce((a, c) => a + c);

      lettersArr[i] = String.fromCharCode((number % 26) + 65);
    }

    // check if the last string match the numbers
    if (lettersArr.join("") !== pinArr[3]) {
      return false;
    }

    return true;
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  handleSubmit() {
    const { input } = this.state;

    if (input === "") {
      alert("You must enter PIN number");
      return;
    }

    // check if the PIN is valid
    if (!this.checkValidPinNumber(input)) {
      alert("PIN number is not valid");
      return;
    }

    this.props.onSubmit(input);
  }

  render() {
    return (
      <div className="userPinBox">
        <input
          className="userPinInput"
          type="text"
          placeholder="#PIN"
          onChange={e => this.handleChange(e)}
          value={this.state.input}
        />
        <button className="submithButton" onClick={() => this.handleSubmit()}>
          SUBMIT
        </button>
      </div>
    );
  }
}

export default UserPinBox;
