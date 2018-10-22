import React, { Component } from "react"
import axios from "axios"
import DoctorCard from "../../components/DoctorCard/DoctorCard"
import SearchBar from "./SearchBar/SearchBar"
import MapContainer from "../../components/MapContainer/MapContainer"

class Search extends Component {
  constructor() {
    super()

    this.state = {
      displayedCards: [],
      openSearchBar: false,
      list: [],
      doctorObjects: []
    }
    //should be able to access each address via doctorObjects[index].street_address

    this.toggleSearchBar = this.toggleSearchBar.bind(this)
    this.searchByKeyword = this.searchByKeyword.bind(this)
    this.searchByLocation = this.searchByLocation.bind(this)
    // this.renderCards = this.renderCards.bind(this)

    this.filterResults = this.filterResults.bind(this)
  }

  toggleSearchBar() {
    this.setState({ openSearchBar: !this.state.openSearchBar })
  }

  searchByKeyword(keyword) {
    axios.get(`/api/doctors?keyword=${keyword}`).then((res) => {
      console.log("res from keyword", res)
      this.setState({ doctorObjects: res.data })

      // let mapped = res.data.map((e,i,arr))
      let mapped = res.data.map((e, i, arr) => {
        return (
          <DoctorCard key={i} nbInclusive={e.nb_inclusive} id={e.doctor_id} />
        )
      })
      console.log("mapped", mapped)
      this.setState({ displayedCards: mapped })
    })
  }

  searchByLocation(address) {
    console.log("searching by location")
  }

  filterResults(obj) {
    console.log("obj", obj)
    if (obj.nbCheck) {
      let filteredCards = this.state.displayedCards.filter((e, i, arr) => {
        console.log("e", e)

        return e.props.nbInclusive
      })
      this.setState({ displayedCards: filteredCards })
    } else if ((obj.none = true)) {
      console.log("idk but there aren't filters")
    }
  }

  componentDidMount() {
    axios.get("/api/doctors").then((res) => {
      // console.log("res.data", res.data)
      this.setState({ doctorObjects: res.data })

      // let mapped = res.data.map((e, i, arr) => {
      //   return e.doctor_id
      // })
      let mapped = res.data.map((e, i, arr) => {
        let address = `${e.street_address}, ${e.city}, ${e.state}`
        // console.log("address", address)
        return (
          <DoctorCard
            key={i}
            nbInclusive={e.nb_inclusive}
            address={address}
            name={e.doctor_name}
            id={e.doctor_id}
          />
        )
      })
      // console.log("mapped", mapped)
      this.setState({ displayedCards: mapped })
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
          <SearchBar
            keywordSearch={this.searchByKeyword}
            locationSearch={this.searchByLocation}
            addFilters={this.filterResults}
          />
        </div>
        <h1>Search Results</h1>

        <div className="map-div">
          <MapContainer cards={this.state.displayedCards} />
        </div>
        {/* {this.renderCards()} */}
        <div className="doc-card-container">{this.state.displayedCards}</div>
      </div>
    )
  }
}

export default Search
