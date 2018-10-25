import React, { Component } from "react"
import axios from "axios"
import NumberFormat from "react-number-format"

import "./EditDoctor.scss"

import Select from "react-select"

const nbOptions = [
  { name: "nb_inclusive", label: "true", value: true },
  { name: "nb_inclusive", label: "false", value: false }
]

const metroplexOptions = [
  { name: "metroplex", label: "Dallas Ft.Worth", value: "Dallas" },
  { name: "metroplex", label: "Other", value: "other" }
]

const categoryOptions = [
  { name: "category", label: "Medical", value: "Medical" },
  { name: "category", label: "Mental Health", value: "Mental Health" }
]

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
      website_url: doctorObj.website_url,
      metroplex: doctorObj.metroplex
    }

    this.changeInput = this.changeInput.bind(this)
    this.clickSubmit = this.clickSubmit.bind(this)
    this.changeSelect = this.changeSelect.bind(this)
    this.changeMultiSelect = this.changeMultiSelect.bind(this)
  }

  changeInput(e) {
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state)
  }
  changeSelect(e) {
    console.log("e", e)
    // console.log("e.name", e.name)
    let selected = `${e.name}Selected`
    this.setState({ [e.name]: e.value, [selected]: e })
    console.log("this.state", this.state)
  }
  changeMultiSelect(e) {
    console.log("e", e)
    // console.log("e[0].name", e[0].name)
    let selected = `${e[0].name}Selected`
    this.setState({ [selected]: e })
    //only changing selected at the moment
    console.log("this.state", this.state)
  }

  clickSubmit() {
    //need to have submit change doctor_specialties and doctor_demographics, by putting in both ids pulled from the selected objects on state

    axios
      .put(`/api/doctor/${this.props.id}`, { data: this.state })
      .then((res) => {
        this.props.toggleEdit()
      })

    axios.delete(`/api/clearDocSpecialties/${this.props.id}`)
    axios.delete(`/api/clearDocDemographics/${this.props.id}`)
    this.state.specialtiesSelected.forEach((e, i, arr) => {
      console.log("e in forEach spec", e)
      axios.post(`/api/addSpecialty/${this.props.id}`, {
        specialty_id: e.value
      })
    })
    this.state.demographicsSelected.forEach((e, i, arr) => {
      console.log("e in forEach dem", e)
      axios.post(`/api/addDemographic/${this.props.id}`, {
        demographic_id: e.value
      })
    })
  }

  componentDidMount() {
    axios.get("/api/allSpecialties").then((res) => {
      console.log("res from all specs", res)
      let optionsMapped = []
      let selectedMapped = []

      res.data.forEach((e, i, arr) => {
        console.log("e in spec map", e)
        optionsMapped.push({
          name: "specialties",
          label: e.specialty_name,
          value: e.specialty_id
        })

        if (this.props.specialties.includes(e.specialty_name)) {
          console.log("does include", e.specialty_name)
          selectedMapped.push({
            name: "specialties",
            label: e.specialty_name,
            value: e.specialty_id
          })
        }
      })
      this.setState({
        specialtyOptions: optionsMapped,
        specialtiesSelected: selectedMapped
      })
    })

    axios.get("/api/allDemographics").then((res) => {
      console.log("res from all dems", res)
      let optionsMapped = []
      let selectedMapped = []

      res.data.forEach((e, i, arr) => {
        console.log("e in dem map", e)
        optionsMapped.push({
          name: "demographics",
          label: e.demographic_name,
          value: e.demographic_id
        })

        if (this.props.demographics.includes(e.demographic_name)) {
          console.log("does include", e.demographic_name)
          selectedMapped.push({
            name: "demographics",
            label: e.demographic_name,
            value: e.demographic_id
          })
        }
      })
      this.setState({
        demographicOptions: optionsMapped,
        demographicsSelected: selectedMapped
      })
    })

    const initialCategory = [
      {
        label: this.props.doctorObj.category,
        value: this.props.doctorObj.category
      }
    ]
    const initialMetroplex = [
      {
        label: this.props.doctorObj.metroplex,
        value: this.props.doctorObj.metroplex
      }
    ]
    const initialNB = [
      {
        name: "nb_inclusive",
        label: this.props.doctorObj.nb_inclusive.toString(),
        value: this.props.doctorObj.nb_inclusive
      }
    ]
    //the nb one is kinda fucked but whatever

    this.setState({
      categorySelected: initialCategory,
      metroplexSelected: initialMetroplex,
      nb_inclusiveSelected: initialNB
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
          <Select
            theme={(theme) => ({
              ...theme,
              borderRadius: 8,
              colors: {
                ...theme.colors,
                primary25: "#ffcccc",
                primary: "#3e87b2"
              }
            })}
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
          <Select
            value={this.state.nb_inclusiveSelected}
            name="nb_inclusive"
            onChange={this.changeSelect}
            options={nbOptions}
            theme={(theme) => ({
              ...theme,
              borderRadius: 8,
              colors: {
                ...theme.colors,
                primary25: "#ffcccc",
                primary: "#3e87b2"
              }
            })}
          />
        </div>
        <div className="input-with-title">
          Metroplex:
          <Select
            value={this.state.metroplexSelected}
            name="metroplex"
            onChange={this.changeSelect}
            options={metroplexOptions}
            theme={(theme) => ({
              ...theme,
              borderRadius: 8,
              colors: {
                ...theme.colors,
                primary25: "#ffcccc",
                primary: "#3e87b2"
              }
            })}
          />
        </div>
        <div>
          Demographics:
          <Select
            isMulti={true}
            value={this.state.demographicsSelected}
            name="demographics"
            onChange={this.changeMultiSelect}
            options={this.state.demographicOptions}
            theme={(theme) => ({
              ...theme,
              borderRadius: 8,
              colors: {
                ...theme.colors,
                primary25: "#ffcccc",
                primary: "#3e87b2"
              }
            })}
          />
        </div>
        <div>
          Specialties:
          <Select
            isMulti={true}
            value={this.state.specialtiesSelected}
            name="specialties"
            onChange={this.changeMultiSelect}
            options={this.state.specialtyOptions}
            theme={(theme) => ({
              ...theme,
              borderRadius: 8,
              colors: {
                ...theme.colors,
                // text: "green",
                primary25: "#ffcccc",
                primary: "#3e87b2"
              }
            })}
          />
        </div>
        <button onClick={this.clickSubmit}> Submit</button>
      </div>
    )
  }
}

export default EditDoctor
