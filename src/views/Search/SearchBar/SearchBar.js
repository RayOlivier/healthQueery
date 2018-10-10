import React, { Component } from "react"

class SearchBar extends Component {
  constructor() {
    super()

    this.state = {
      location: ""
    }
  }

  render() {
    return (
      <div className="search-bar">
        <h1>Filters:</h1>
        <div className="searchbar-input">
          Search by location:
          <input placeholder="Try TX or Dallas" value={this.state.location} />
        </div>
      </div>
    )
  }
}

export default SearchBar
