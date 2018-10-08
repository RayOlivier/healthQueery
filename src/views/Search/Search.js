import React, { Component } from "react"
import axios from "axios"
import DoctorCard from "../../components/DoctorCard/DoctorCard"

class Search extends Component {
  constructor() {
    super()

    this.state = {
      doctors: []
    }
  }

  componentDidMount() {
    axios.get("/api/doctors").then((res) => {
      console.log("res.data", res.data)
      this.setState({ doctors: res.data })
      console.log("this.state", this.state)
    })
  }
  render() {
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
        <h1>Search</h1>
        {list}
      </div>
    )
  }
}

export default Search
