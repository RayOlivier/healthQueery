import React, { Component } from "react"

import Select from "react-select"

const metroplexOptions = [
  { name: "metroplex", label: "Dallas Ft.Worth", value: "Dallas" }
  //,{ name: "metroplex", label: "Other", value: "other" }
]

class SearchBar extends Component {
  constructor() {
    super()

    this.state = {
      location: "",
      keyword: "",
      nbCheck: false,
      metroplex: "",
      metroplexSelected: null
    }
    this.onKeywordClick = this.onKeywordClick.bind(this)
    this.changeInput = this.changeInput.bind(this)
    this.toggleNBCheckbox = this.toggleNBCheckbox.bind(this)

    this.changeSelect = this.changeSelect.bind(this)

    this.onLocationClick = this.onLocationClick.bind(this)
    this.onFiltersClick = this.onFiltersClick.bind(this)
    this.onMetroplexClick = this.onMetroplexClick.bind(this)
  }

  changeSelect(e) {
    // console.log("e", e)
    let selected = `${e.name}Selected`
    this.setState({ [e.name]: e.value, [selected]: e })
    console.log("this.state", this.state)
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

  onMetroplexClick() {
    console.log("this.state", this.state)
    this.props.metroplexSearch(this.state.metroplex)
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
          Search by Metroplex:
          {/* <select
            value={this.state.metroplex}
            onChange={this.changeInput}
            name="metroplex"
          >
            <option value="">Select One</option>
            <option value="Dallas">Dallas Ft.Worth</option>
          </select> */}
          <div className="select-and-button">
            <Select
              className="select"
              value={this.state.metroplexSelected}
              name="metroplex"
              onChange={this.changeSelect}
              options={metroplexOptions}
              theme={(theme) => ({
                ...theme,
                borderRadius: 8,
                colors: {
                  ...theme.colors,
                  // text: "green",
                  primary25: "#ffcccc",
                  primary: "#3e87b2"
                }
              })}
            />
            <button onClick={this.onMetroplexClick}>Go</button>
          </div>
        </div>
        {/* <div>
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
        </div> */}
        {/* <div>
          Search by Distance:
          <input
            placeholder="Enter your location..."
            value={this.state.location}
            name="location"
            onChange={(e) => {
              this.changeInput(e)
            }}
            // onSubmit={this.onLocationClick}
          />
          <button onClick={this.onLocationClick}>Submit</button>
        </div> */}
        <div>
          <h1>Filters:</h1>
          <input
            type="checkbox"
            name="nbCheck"
            onChange={() => this.toggleNBCheckbox()}
          />
          Only Nonbinary Inclusive Doctors
          <button onClick={this.onFiltersClick}>Add Filters</button>
        </div>
      </div>
    )
  }
}

export default SearchBar
