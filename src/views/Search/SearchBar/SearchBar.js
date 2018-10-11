import React, { Component } from "react"

class SearchBar extends Component {
  constructor() {
    super()

    this.state = {
      location: "",
      keyword: ""
    }
    this.onKeywordClick = this.onKeywordClick.bind(this)
    this.changeInput = this.changeInput.bind(this)
  }

  changeInput(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onKeywordClick() {
    this.props.keywordSearch(this.state.keyword)
  }

  render() {
    return (
      <div className="search-bar">
        <h1>Filters:</h1>
        <div className="searchbar-input">
          Search by location:
          <input placeholder="Try TX or Dallas" value={this.state.location} />
        </div>

        <div>
          Search by Keyword:
          <input
            placeholder="Enter keyword..."
            value={this.state.keyword}
            name="keyword"
            onChange={(e) => {
              this.changeInput(e)
            }}
          />
        </div>

        <button onClick={this.onKeywordClick}>Keyword button</button>
      </div>
    )
  }
}

export default SearchBar
