import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

import Select from "react-select"

const metroplexOptions = [
  { name: "metroplex", label: "Dallas Ft.Worth", value: "Dallas" }
  //,{ name: "metroplex", label: "Other", value: "other" }
]

const demographicOptions = [
  { name: "demographic", label: "Children", value: "Children" },
  { name: "demographic", label: "Adolescents", value: "Adolescents" },
  { name: "demographic", label: "Adults", value: "Adults" },
  { name: "demographic", label: "Seniors", value: "Seniors" }
]

class SearchBar extends Component {
  constructor() {
    super()

    this.state = {
      location: "",
      keyword: "",
      nbCheck: false,
      metroplex: "",
      metroplexSelected: null,
      demographic: "",
      demographicSelected: null,
      specialty: "",
      specialtySelected: null,
      specialtyOptions: []
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
    console.log("e", e)
    let selected = `${e.name}Selected`
    this.setState({ [e.name]: e.label, [selected]: e })
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
    this.props.metroplexSearch("Dallas")
  }

  onFiltersClick() {
    let obj = {}
    if (this.state.nbCheck) {
      obj.nbCheck = true
    }

    if (this.state.demographic !== "") {
      obj.demographic = this.state.demographic
    }
    // else {
    //   obj.none = true
    // }

    if (this.state.specialty !== "") {
      obj.specialty = this.state.specialty
    }
    this.props.addFilters(obj)
  }

  toggleNBCheckbox() {
    this.setState({
      nbCheck: !this.state.nbCheck
    })
    console.log("this.state", this.state)
  }

  componentDidMount() {
    axios.get("/api/allSpecialties").then((res) => {
      console.log("res from all specs", res)
      let optionsMapped = []
      let selectedMapped = []

      res.data.forEach((e, i, arr) => {
        console.log("e in spec map", e)
        optionsMapped.push({
          name: "specialty",
          label: e.specialty_name,
          value: e.specialty_id
        })

        // if (this.props.specialties.includes(e.specialty_name)) {
        //   console.log("does include", e.specialty_name)
        //   selectedMapped.push({
        //     name: "specialties",
        //     label: e.specialty_name,
        //     value: e.specialty_id
        //   })
        // }
      })
      this.setState({
        specialtyOptions: optionsMapped
        // specialtiesSelected: selectedMapped
      })
    })
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
          <h2>Change Metroplex:</h2>
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
            <Link
              // to={`/search?metroplex=${this.state.metroplex}`}
              to={`/search?metroplex=Dallas`}
            >
              <button onClick={this.onMetroplexClick} className="go-button">
                Go
              </button>
            </Link>
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
          <div className="filter-option" id="nb-check">
            <input
              type="checkbox"
              name="nbCheck"
              onChange={() => this.toggleNBCheckbox()}
            />
            Only Nonbinary Inclusive Doctors
          </div>

          <div className="filter-option">
            <h2>Demographic:</h2>
            <Select
              className="select"
              name="demographic"
              onChange={this.changeSelect}
              options={demographicOptions}
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
          </div>
          <div className="filter-option">
            <h2>Specialty:</h2>
            <Select
              className="select"
              name="specialty"
              onChange={this.changeSelect}
              options={this.state.specialtyOptions}
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
          </div>
          <div className="filter-button-container">
            <button onClick={this.onFiltersClick} className="filter-button">
              Add Filters
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBar
