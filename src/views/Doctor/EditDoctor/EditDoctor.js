import React, { Component } from "react"
import axios from "axios"
import NumberFormat from "react-number-format"

class EditDoctor extends Component {
  constructor(props) {
    super(props)

    let { doctorObj } = this.props

    this.state = {
      doctor_name: doctorObj.doctor_name,
      category: doctorObj.category,
      city: doctorObj.city,
      state: doctorObj.state,
      description: doctorObj.description,
      email: doctorObj.email,
      gender: doctorObj.gender,
      img_url: doctorObj.img_url,
      nb_inclusive: doctorObj.nb_inclusive,
      phone: doctorObj.phone,
      practice_name: doctorObj.practice_name,
      street_address: doctorObj.street_address,
      website_url: doctorObj.website_url
    }

    this.changeInput = this.changeInput.bind(this)
    this.clickSubmit = this.clickSubmit.bind(this)
  }

  changeInput(e) {
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state)
  }

  clickSubmit() {
    axios
      .put(`/api/doctor/${this.props.id}`, { data: this.state })
      .then((res) => {
        this.props.toggleEdit()
      })
  }

  render() {
    console.log("this.props", this.props)
    console.log("this.state", this.state)
    return (
      <div className="edit-doctor">
        <h1>Editing Doctor</h1>
        <div className="input-with-title">
          Image URL:
          <input
            placeholder="Enter image url..."
            value={this.state.img_url}
            name="img_url"
            onChange={(e) => this.changeInput(e)}
          />
        </div>
        <div className="input-with-title">
          Full Name:
          <input
            placeholder="Enter name..."
            value={this.state.doctor_name}
            name="doctor_name"
            onChange={(e) => this.changeInput(e)}
          />
        </div>
        <div className="input-with-title">
          Category:
          <select
            value={this.state.category}
            name="category"
            onChange={this.changeInput}
          >
            <option value="">Pick One</option>
            <option value="Medical">Medical</option>
            <option value="Mental Health">Mental Health</option>
          </select>
        </div>
        <div className="input-with-title">
          Name of Practice:
          <input
            placeholder="Enter name of practice..."
            value={this.state.practice_name}
            name="practice_name"
            onChange={(e) => this.changeInput(e)}
          />
        </div>
        <div className="input-with-title">
          Description:
          <textarea
            placeholder="Enter description for this doctor. Be detailed."
            value={this.state.description || ""}
            name="description"
            maxLength="1000"
            onChange={(e) => this.changeInput(e)}
          />
        </div>
        <div className="input-with-title">
          Gender:
          <input
            placeholder="Enter gender..."
            value={this.state.gender}
            name="gender"
            onChange={(e) => this.changeInput(e)}
          />
        </div>
        <div className="input-with-title">
          Street Address:
          <input
            placeholder="Enter street address..."
            value={this.state.street_address || ""}
            name="street_address"
            onChange={(e) => this.changeInput(e)}
          />
        </div>
        <div className="input-with-title">
          City:
          <input
            placeholder="Enter city..."
            value={this.state.city}
            name="city"
            onChange={(e) => this.changeInput(e)}
          />
        </div>
        <div className="input-with-title">
          State:
          <input
            placeholder="Enter state..."
            value={this.state.state}
            name="state"
            maxLength="2"
            onChange={(e) => this.changeInput(e)}
          />
        </div>
        <div className="input-with-title">
          Website URL:
          <input
            placeholder="Enter website url..."
            value={this.state.website_url}
            name="website_url"
            onChange={(e) => this.changeInput(e)}
          />
        </div>
        <div className="input-with-title">
          Phone:
          <NumberFormat
            format="(###) ###-####"
            mask=""
            name="phone"
            placeholder="Phone Number Here"
            onChange={(e) => this.changeInput(e)}
            value={this.state.phone}
          />
        </div>
        <div className="input-with-title">
          Email:
          <input
            placeholder="Enter email..."
            value={this.state.email}
            name="email"
            onChange={(e) => this.changeInput(e)}
          />
        </div>
        <div className="input-with-title">
          Nonbinary Inclusive?
          <select
            value={this.state.nb_inclusive}
            name="nb_inclusive"
            onChange={this.changeInput}
          >
            <option value="">Pick One</option>
            <option value="True">Yes</option>
            <option value="False">No</option>
          </select>
        </div>
        <button
          onClick={this.clickSubmit}
          //   disabled={this.state.nb_inclusive === null}
        >
          {" "}
          Submit
        </button>
      </div>
    )
  }
}

export default EditDoctor
