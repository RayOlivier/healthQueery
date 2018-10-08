import React, { Component } from "react"

class DoctorSubmissionForm extends Component {
  constructor() {
    super()

    this.state = {
      doctor_name: "",
      category: "",
      city: "",
      state: "",
      description: "",
      email: "",
      gender: "",
      img_url: "",
      nb_inclusive: false,
      phone: "",
      practice: "",
      street_address: "",
      website_url: ""
    }
    this.changeInput = this.changeInput.bind(this)
  }

  changeInput(e) {
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <h1> Doctor Submission </h1>
        <input
          placeholder="Enter image url..."
          value={this.state.img_url}
          name="img_url"
          onChange={(e) => this.changeInput(e)}
        />
        <input
          placeholder="Enter name..."
          value={this.state.doctor_name}
          name="doctor_name"
          onChange={(e) => this.changeInput(e)}
        />
        <div>Category dropdown here</div>

        <input
          placeholder="Enter name of practice..."
          value={this.state.practice_name}
          name="practice_name"
          onChange={(e) => this.changeInput(e)}
        />

        <input
          placeholder="Enter description for this doctor. Be detailed."
          value={this.state.description}
          name="description"
          onChange={(e) => this.changeInput(e)}
        />
        <input
          placeholder="Enter gender..."
          value={this.state.gender}
          name="gender"
          onChange={(e) => this.changeInput(e)}
        />

        <input
          placeholder="Enter street address..."
          value={this.state.street_address}
          name="street_address"
          onChange={(e) => this.changeInput(e)}
        />
        <input
          placeholder="Enter city..."
          value={this.state.city}
          name="city"
          onChange={(e) => this.changeInput(e)}
        />

        <input
          placeholder="Enter state..."
          value={this.state.state}
          name="state"
          onChange={(e) => this.changeInput(e)}
        />
        <input
          placeholder="Enter website url..."
          value={this.state.website_url}
          name="website_url"
          onChange={(e) => this.changeInput(e)}
        />
        <input
          placeholder="Enter phone..."
          value={this.state.phone}
          name="phone"
          onChange={(e) => this.changeInput(e)}
        />
        <input
          placeholder="Enter email..."
          value={this.state.email}
          name="email"
          onChange={(e) => this.changeInput(e)}
        />
      </div>
    )
  }
}

export default DoctorSubmissionForm
