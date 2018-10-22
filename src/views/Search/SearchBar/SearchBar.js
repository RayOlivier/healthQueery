import React, { Component } from "react"

class SearchBar extends Component {
  constructor() {
    super()

    this.state = {
      location: "",
      keyword: "",
      nbCheck: false
    }
    this.onKeywordClick = this.onKeywordClick.bind(this)
    this.changeInput = this.changeInput.bind(this)
    this.toggleNBCheckbox = this.toggleNBCheckbox.bind(this)

    this.onLocationClick = this.onLocationClick.bind(this)
    this.onFiltersClick = this.onFiltersClick.bind(this)
  }

  changeInput(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onKeywordClick() {
    this.props.keywordSearch(this.state.keyword)
  }

  onLocationClick() {
    this.props.locationSearch(this.state.location)
  }

  onFiltersClick() {
    let obj = {}
    if (this.state.nbCheck) {
      obj.nbCheck = true
    } else {
      obj.none = true
    }
    this.props.addFilters(obj)
  }

  toggleNBCheckbox() {
    // let { name } = e.target
    // console.log("e.target", e.target)
    this.setState({
      nbCheck: !this.state.nbCheck
    })
    console.log("this.state", this.state)
  }

  render() {
    return (
      <div className="search-bar">
        <h1>Search Options:</h1>
        {/* <div className="searchbar-input">
          Search by location:
          <input placeholder="Try TX or Dallas" value={this.state.location} />
        </div> */}
        <div>
          Search by Keyword:
          <input
            placeholder="Enter keyword..."
            value={this.state.keyword}
            name="keyword"
            onChange={(e) => {
              this.changeInput(e)
            }}
            // onSubmit={this.onKeywordClick}
          />
          <button onClick={this.onKeywordClick}>Submit</button>
        </div>
        <div>
          Search by Distance:
          <input
            placeholder="Enter your location..."
            value={this.state.location}
            name="location"
            onChange={(e) => {
              this.changeInput(e)
            }}
            // onSubmit={this.onKeywordClick}
          />
          <button onClick={this.onLocationClick}>Submit</button>
        </div>
        <h1>Filters:</h1>
        <input
          type="checkbox"
          name="nbCheck"
          onChange={() => this.toggleNBCheckbox()}
        />
        Confirmed Nonbinary Inclusive Doctors
        <button onClick={this.onFiltersClick}>Add Filters</button>
      </div>
    )
  }
}

export default SearchBar
