import React, { Component } from "react"
import axios from "axios"
import DoctorCard from "../../components/DoctorCard/DoctorCard"
import SearchBar from "./SearchBar/SearchBar"

class Search extends Component {
  constructor() {
    super()

    this.state = {
      doctors: [],
      openSearchBar: false
    }
    this.toggleSearchBar = this.toggleSearchBar.bind(this)
    this.searchByKeyword = this.searchByKeyword.bind(this)
  }

  toggleSearchBar() {
    this.setState({ openSearchBar: !this.state.openSearchBar })
  }

  searchByKeyword(keyword) {
    axios.get(`/api/doctors?keyword=${keyword}`).then((res) => {
      console.log("res from keyword", res)

      // let mapped = res.data.map((e,i,arr))
      let mapped = res.data.map((e, i, arr) => {
        return e.doctor_id
      })
      this.setState({ doctors: mapped })
    })
  }

  componentDidMount() {
    axios.get("/api/doctors").then((res) => {
      // console.log("res.data", res.data)

      let mapped = res.data.map((e, i, arr) => {
        return e.doctor_id
      })
      console.log("mapped", mapped)
      this.setState({ doctors: mapped })
      // console.log("this.state", this.state)
    })
  }
  render() {
    console.log("this.state", this.state)
    let list = this.state.doctors.map((e, i, arr) => {
      console.log("e", e)
      return (
        <DoctorCard
          key={i}
          // name={e.doctor_name}
          id={e}
        />
      )
    })

    return (
      <div className="search-view">
        <div className="search-button">
          {" "}
          <button onClick={this.toggleSearchBar}>Search Options</button>
        </div>
        <div
          className="search-bar"
          id={`search-bar-${this.state.openSearchBar}`}
        >
          <SearchBar keywordSearch={this.searchByKeyword} />
        </div>
        <h1>Search Results</h1>
        {list}
      </div>
    )
  }
}

export default Search
