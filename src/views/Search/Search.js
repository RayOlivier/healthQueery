import React, { Component } from "react"
import axios from "axios"
import DoctorCard from "../../components/DoctorCard/DoctorCard"
import SearchBar from "./SearchBar/SearchBar"
import MapContainer from "../../components/MapContainer/MapContainer"

import "./Search.scss"

import queryString from "query-string"

class Search extends Component {
  constructor() {
    super()

    this.state = {
      displayedCards: [],
      openSearchBar: false,
      list: [],
      doctorObjects: [],
      noMetro: false
    }
    this.toggleSearchBar = this.toggleSearchBar.bind(this)
    // this.searchByKeyword = this.searchByKeyword.bind(this)
    this.searchByLocation = this.searchByLocation.bind(this)
    this.searchByMetroplex = this.searchByMetroplex.bind(this)

    this.filterResults = this.filterResults.bind(this)
  }

  toggleSearchBar() {
    this.setState({ openSearchBar: !this.state.openSearchBar })
  }

  searchByMetroplex(metroplex) {
    axios.get(`/api/doctors?metroplex=${metroplex}`).then((res) => {
      console.log("res from metro search", res)
      this.setState({ doctorObjects: res.data })

      let mapped = res.data.map((e, i, arr) => {
        let address = `${e.street_address}, ${e.city}, ${e.state}`
        console.log("e IN SEARCH BY METRO", e)
        // console.log("address", address)
        return (
          <DoctorCard
            key={i}
            nbInclusive={e.nb_inclusive}
            address={address}
            name={e.doctor_name}
            id={e.doctor_id}
            demographics={e.demographics}
            specialties={e.specialties}
            className="doctor-card"
          />
        )
      })

      this.setState({ displayedCards: mapped })
    })
  }

  searchByLocation(address) {
    console.log("searching by location")
  }

  filterResults(obj) {
    console.log("this.state.doctorObjects", this.state.doctorObjects)
    console.log("obj", obj)
    let filteredCards = this.state.displayedCards
    console.log("this.state.displayedCards", this.state.displayedCards)
    if (obj.nbCheck) {
      filteredCards = filteredCards.filter((e, i, arr) => {
        console.log("e", e)

        return e.props.nbInclusive
      })
      // this.setState({ displayedCards: filteredCards })
    }

    if (obj.demographic) {
      console.log("we got ourselves a demographic")
      filteredCards = filteredCards.filter((e, i, arr) => {
        console.log("e", e)

        return e.props.demographics.includes(obj.demographic)
      })
    }

    if (obj.specialty) {
      console.log("we got ourselves a specialty")
      filteredCards = filteredCards.filter((e, i, arr) => {
        console.log("e", e)

        return e.props.specialties.includes(obj.specialty)
      })
    }

    this.setState({ displayedCards: filteredCards })
  }

  componentDidMount() {
    console.log(
      "this.props.location.search aka query string",
      this.props.location.search
    )

    if (this.props.location.search) {
      console.log("there's a query")
      const values = queryString.parse(this.props.location.search)
      console.log("values", values)

      if (values.metroplex === "undefined" || values.metroplex === "") {
        console.log("undefined", undefined)
      } else {
        this.searchByMetroplex(values.metroplex)
        this.setState({ noMetro: false })
      }
    } else {
      // axios.get("/api/doctors").then((res) => {
      //   console.log("res.data", res.data)
      //   this.setState({ doctorObjects: res.data })

      //   let mapped = res.data.map((e, i, arr) => {
      //     let address = `${e.street_address}, ${e.city}, ${e.state}`
      //     // console.log("address", address)
      //     return (
      //       <DoctorCard
      //         key={i}
      //         nbInclusive={e.nb_inclusive}
      //         address={address}
      //         name={e.doctor_name}
      //         id={e.doctor_id}
      //         className="doctor-card"
      //       />
      //     )
      //   })
      //   // console.log("mapped", mapped)
      //   this.setState({ displayedCards: mapped })
      //   // console.log("this.state", this.state)
      // })

      this.setState({ noMetro: true })
      console.log("this.state", this.state)
    }
  }
  render() {
    console.log("this.state", this.state)

    console.log("this.state.doctorObjects", this.state.doctorObjects)

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
            metroplexSearch={this.searchByMetroplex}
            addFilters={this.filterResults}
          />
        </div>

        <h1>Search Results</h1>

        <div className="map-div">
          <MapContainer cards={this.state.displayedCards} />
        </div>
        {/* {this.renderCards()} */}
        <div className="doc-card-container">
          <div className={`${this.state.noMetro}`}>
            Please select a metroplex to find providers in your area.
          </div>
          {this.state.displayedCards}
        </div>
      </div>
    )
  }
}

export default Search

// searchByKeyword(keyword) {
//   axios.get(`/api/doctors?keyword=${keyword}`).then((res) => {
//     console.log("res from keyword", res)
//     this.setState({ doctorObjects: res.data })

//     // let mapped = res.data.map((e,i,arr))
//     let mapped = res.data.map((e, i, arr) => {
//       return (
//         <DoctorCard key={i} nbInclusive={e.nb_inclusive} id={e.doctor_id} />
//       )
//     })
//     console.log("mapped", mapped)
//     this.setState({ displayedCards: mapped })
//   })
// }
