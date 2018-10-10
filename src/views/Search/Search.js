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
  }

  toggleSearchBar() {
    this.setState({ openSearchBar: !this.state.openSearchBar })
  }

  componentDidMount() {
    axios.get("/api/doctors").then((res) => {
      console.log("res.data", res.data)
      this.setState({ doctors: res.data })
      console.log("this.state", this.state)
    })
  }
  render() {
    console.log("this.state", this.state)
    let list = this.state.doctors.map((e, i, arr) => {
      return (
        <DoctorCard
          key={i}
          name={e.doctor_name}
          id={e.doctor_id}
          img={e.img_url}
          category={e.category}
          practice={e.practice_name}
          city={e.city}
          state={e.state}
          address={e.street_address}
          phone={e.phone}
          website={e.website_url}
          email={e.email}
          gender={e.gender}
          nbInclusive={e.nb_inclusive}
          description={e.description}
          avgRating={e.avg_rating}
        />
      )
    })

    return (
      <div className="search-view">
        <div className="search-button">
          {" "}
          <button onClick={this.toggleSearchBar}>Search Options</button>
        </div>
        <div class="search-bar" id={`search-bar-${this.state.openSearchBar}`}>
          <SearchBar />
        </div>
        <h1>Search Results</h1>
        {list}
      </div>
    )
  }
}

export default Search
