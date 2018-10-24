import React, { Component } from "react"
import UserSubmissionForm from "./UserSubmission/UserSubmission"

import "./Submit.scss"

class Submit extends Component {
  render() {
    return (
      <div className="submit-page">
        <div className="top-text">
          <h1>Submit a Provider</h1>
          <div className="explanation">
            The only required fields are name, city, state, and website url, but
            it's appreciated if you add as much detail as possible so the
            provider can be added quickly. Thanks for your help!
          </div>
        </div>
        <UserSubmissionForm />
      </div>
    )
  }
}

export default Submit
