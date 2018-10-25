import React, { Component } from "react";
import "./userPinBoxStyle.css";

class UserPinBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: null
    };
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  handleSubmit() {
    const { input } = this.state;
    if(input == null) {
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
        />
        <button
          className="submithButton"
          onClick={() => this.handleSubmit()}
        >
          SUBMIT
        </button>
      </div>
    );
  }
}

export default UserPinBox;
