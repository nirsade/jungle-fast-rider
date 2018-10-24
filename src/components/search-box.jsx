import React, { Component } from 'react';

class SearchBox extends Component {
  render() {
    return (
      <div className="searchBox">
        <input className='searchInput' type="text" placeholder='#PIN'/>
        <button className='searchButton'>
          SUBMIT
        </button>
      </div>
    );
  }
}

export default SearchBox;
