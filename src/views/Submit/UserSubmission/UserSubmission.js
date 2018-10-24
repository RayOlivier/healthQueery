import React, { Component } from "react"
import axios from "axios"
import NumberFormat from "react-number-format"

import Select from "react-select"

const nbOptions = [
  // { name: "nb_inclusive", label: "Unsure", value: "" },
  { name: "nb_inclusive", label: "Yes", value: true },
  { name: "nb_inclusive", label: "No or Unsure", value: false }
]

const metroplexOptions = [
  { name: "metroplex", label: "Dallas Ft.Worth", value: "Dallas" },
  { name: "metroplex", label: "Other", value: "other" }
]

const categoryOptions = [
  { name: "category", label: "Medical", value: "Medical" },
  { name: "category", label: "Mental Health", value: "Mental Health" }
]

class UserSubmissionForm extends Component {
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
      nb_inclusive: null,
      phone: null,
      practice: "",
      street_address: "",
      website_url: "",
      metroplex: "",
      nb_inclusiveSelected: null,
      metroplexSelected: null,
      categorySelected: null
    }
    this.changeInput = this.changeInput.bind(this)
    this.changeSelect = this.changeSelect.bind(this)
    this.clickSubmit = this.clickSubmit.bind(this)
    this.clearInput = this.clearInput.bind(this)
  }

  changeInput(e) {
    console.log("e", e)
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state)
  }

  changeSelect(e) {
    // console.log("e", e)
    let selected = `${e.name}Selected`
    this.setState({ [e.name]: e.value, [selected]: e })
    console.log("this.state", this.state)
  }

  clearInput() {
    let initialState = {
      doctor_name: "",
      category: "",
      city: "",
      state: "",
      description: "",
      email: "",
      gender: "",
      img_url: "",
      nb_inclusive: null,
      phone: null,
      practice: "",
      street_address: "",
      website_url: "",
      metroplex: "",
      nb_inclusiveSelected: null,
      metroplexSelected: null,
      categorySelected: null
    }
    this.setState(initialState)
  }

  clickSubmit() {
    axios.post("/api/submission", { data: this.state }).then((res) => {
      console.log("hi")
      console.log(res)
      this.clearInput()
      alert("Thank you for your submission!")
    })
  }

  render() {
    return (
      <div className="admin-doctor-submit">
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
          {/* <select
            value={this.state.category}
            name="category"
            onChange={this.changeInput}
          >
            <option value="">Pick One</option>
            <option value="Medical">Medical</option>
            <option value="Mental Health">Mental Health</option>
          </select> */}
          <Select
            value={this.state.categorySelected}
            name="metroplex"
            onChange={this.changeSelect}
            options={categoryOptions}
          />
        </div>
        <div className="input-with-title">
          Name of Practice:
          <input
            placeholder="Enter name of practice..."
            value={this.state.practice}
            name="practice"
            onChange={(e) => this.changeInput(e)}
          />
        </div>
        <div className="input-with-title">
          Description:
          <textarea
            placeholder="Enter description for this doctor. This can be a blurb from their website. Or you can put it in your own words and the admins can edit it later."
            value={this.state.description}
            name="description"
            maxLength="1000"
            rows="5"
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
            value={this.state.street_address}
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
          Metroplex:
          {/* <select
            value={this.state.metroplex}
            onChange={this.changeInput}
            name="metroplex"
          >
            <option value="">Select One</option>
            <option value="Dallas">Dallas Ft.Worth</option>
          </select> */}
          <Select
            value={this.state.metroplexSelected}
            name="metroplex"
            onChange={this.changeSelect}
            options={metroplexOptions}
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
          {/* <select
            value={this.state.nb_inclusive}
            name="nb_inclusive"
            onChange={this.changeInput}
          >
            <option value="">Pick One</option>
            <option value="True">Yes</option>
            <option value="False">No</option>
          </select> */}
        </div>

        <Select
          value={this.state.nb_inclusiveSelected}
          name="nb_inclusive"
          onChange={this.changeSelect}
          options={nbOptions}
        />
        <div className="input-with-title">
          <button
            disabled={
              !this.state.doctor_name ||
              !this.state.city ||
              !this.state.state ||
              !this.state.website_url
            }
            onClick={this.clickSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    )
  }
}

export default UserSubmissionForm
