import React, { Component } from "react"
import axios from "axios"

class Search extends Component {
  componentDidMount() {
    axios.get("/api/doctors").then((res) => {
      console.log("res: ", res)
    })
  }
  render() {
    return <h1>Search</h1>
  }
}

export default Search
