import React, { Component } from "react"
import DoctorSubmissionForm from "./DoctorSubmissionForm/DoctorSubmissionForm"

class Admin extends Component {
  render() {
    return (
      <div className="admin-view">
        <h1>Admin</h1>
        <DoctorSubmissionForm />
      </div>
    )
  }
}

export default Admin
