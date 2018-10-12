import React, { Component } from "react"
import axios from "axios"
import DoctorCard from "../../components/DoctorCard/DoctorCard"
import SearchBar from "./SearchBar/SearchBar"

class Search extends Component {
  constructor() {
    super()

    this.state = {
      doctors: [],
      openSearchBar: false,
      list: []
    }
    this.toggleSearchBar = this.toggleSearchBar.bind(this)
    this.searchByKeyword = this.searchByKeyword.bind(this)
    // this.renderCards = this.renderCards.bind(this)
  }

  toggleSearchBar() {
    this.setState({ openSearchBar: !this.state.openSearchBar })
  }

  searchByKeyword(keyword) {
    axios.get(`/api/doctors?keyword=${keyword}`).then((res) => {
      console.log("res from keyword", res)

      // let mapped = res.data.map((e,i,arr))
      let mapped = res.data.map((e, i, arr) => {
        return <DoctorCard key={i} id={e.doctor_id} />
      })
      console.log("mapped", mapped)
      this.setState({ doctors: mapped })
    })
  }

  componentDidMount() {
    axios.get("/api/doctors").then((res) => {
      // console.log("res.data", res.data)

      // let mapped = res.data.map((e, i, arr) => {
      //   return e.doctor_id
      // })
      let mapped = res.data.map((e, i, arr) => {
        return <DoctorCard key={i} id={e.doctor_id} />
      })
      console.log("mapped", mapped)
      this.setState({ doctors: mapped })
      // console.log("this.state", this.state)
    })
  }
  render() {
    console.log("this.state", this.state)

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
        {/* {this.renderCards()} */}
        {this.state.doctors}
      </div>
    )
  }
}

export default Search
