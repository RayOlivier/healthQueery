import React, { Component } from "react"
import axios from "axios"

class Profile extends Component {
  componentDidMount() {
    axios.get("/profile").then((res) => {
      console.log(res)
    })
  }

  render() {
    return <h1>Profile</h1>
  }
}

export default Profile
