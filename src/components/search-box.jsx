import React, { Component } from 'react';

class SearchBox extends Component {

  constructor(props) {
    super(props)

    this.state = {
      input: null
    }
  }

  handleChange(e) {
    console.log(e.target.value)
    this.setState({
      input: e.target.value
    })
  }

  handleSubmit() {
    this.props.onSubmit(this.state.input)
  }

  render() {
    return (
      <div className="searchBox">
        <input className='searchInput' type="text" placeholder='#PIN' onChange={(e)=>this.handleChange(e)}/>
        <button className='searchButton' onClick={()=>this.props.onSubmit(this.state.input)}>
          SUBMIT
        </button>
      </div>
    );
  }
}

export default SearchBox;
