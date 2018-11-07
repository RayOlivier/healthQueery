import React, { Component } from "react"
import { connect } from "react-redux"
import DoctorSubmissionForm from "./DoctorSubmissionForm/DoctorSubmissionForm"

import "./Admin.scss"

class Admin extends Component {
  constructor(props) {
    super(props)

    this.checkAdmin = this.checkAdmin.bind(this)
  }

  checkAdmin() {
    if (this.props.user.admin) {
      return <DoctorSubmissionForm />
    } else {
      return <h2>Access Denied.</h2>
    }
  }

  render() {
    return (
      <div className="admin-view">
        {/* <h1>Admin</h1> */}
        {this.checkAdmin()}
      </div>
    )
  }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Admin)
