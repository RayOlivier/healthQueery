import React, { Component } from "react";
import axios from "axios";
import NumberFormat from "react-number-format";

import Select from "react-select";

const nbOptions = [
  { name: "nb_inclusive", label: "Yes", value: true },
  { name: "nb_inclusive", label: "No or Unsure", value: false }
];

const metroplexOptions = [
  { name: "metroplex", label: "Dallas Ft.Worth", value: "Dallas" },
  { name: "metroplex", label: "Other", value: "other" }
];

const categoryOptions = [
  { name: "category", label: "Medical", value: "Medical" },
  { name: "category", label: "Mental Health", value: "Mental Health" }
];

class DoctorSubmissionForm extends Component {
  constructor() {
    super();

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
      phone: null,
      practice: "",
      street_address: "",
      website_url: "",
      metroplex: "",
      nb_inclusiveSelected: null,
      metroplexSelected: null,
      categorySelected: null
    };
    this.changeInput = this.changeInput.bind(this);
    this.changeSelect = this.changeSelect.bind(this);
    this.clickSubmit = this.clickSubmit.bind(this);
    this.clearInput = this.clearInput.bind(this);

    this.changeMultiSelect = this.changeMultiSelect.bind(this);
  }

  changeMultiSelect(e) {
    // console.log("e", e)
    // console.log("e[0].name", e[0].name)
    let selected = `${e[0].name}Selected`;
    this.setState({ [selected]: e });
    //only changing selected at the moment
    // console.log("this.state", this.state);
  }

  changeInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  changeSelect(e) {
    // console.log("e", e)
    let selected = `${e.name}Selected`;
    this.setState({ [e.name]: e.value, [selected]: e });
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
      nb_inclusive: false,
      phone: null,
      practice: "",
      street_address: "",
      website_url: "",
      metroplex: "",
      nb_inclusiveSelected: null,
      metroplexSelected: null,
      categorySelected: null
    };
    this.setState(initialState);
  }

  clickSubmit() {
    axios.post("/api/doctor", { data: this.state }).then((res) => {
      this.clearInput();
      axios.delete(`/api/clearDocSpecialties/${res.data[0].max}`);
      axios.delete(`/api/clearDocDemographics/${res.data[0].max}`);
      this.state.specialtiesSelected.forEach((e, i, arr) => {
        axios.post(`/api/addSpecialty/${res.data[0].max}`, {
          specialty_id: e.value
        });
      });
      this.state.demographicsSelected.forEach((e, i, arr) => {
        axios.post(`/api/addDemographic/${res.data[0].max}`, {
          demographic_id: e.value
        });
      });
    });
  }

  componentDidMount() {
    axios.get("/api/allSpecialties").then((res) => {
      let optionsMapped = [];
      let selectedMapped = [];

      res.data.forEach((e, i, arr) => {
        optionsMapped.push({
          name: "specialties",
          label: e.specialty_name,
          value: e.specialty_id
        });
      });
      this.setState({
        specialtyOptions: optionsMapped,
        specialtiesSelected: selectedMapped
      });
    });

    axios.get("/api/allDemographics").then((res) => {
      let optionsMapped = [];
      let selectedMapped = [];

      res.data.forEach((e, i, arr) => {
        optionsMapped.push({
          name: "demographics",
          label: e.demographic_name,
          value: e.demographic_id
        });
      });
      this.setState({
        demographicOptions: optionsMapped,
        demographicsSelected: selectedMapped
      });
    });
  }

  render() {
    return (
      <div className="admin-doctor-submit">
        <h1> Doctor Submission </h1>
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
            placeholder="Enter description for this doctor. Be detailed."
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
        <div>
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
                // text: "green",
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
    );
  }
}

export default DoctorSubmissionForm;
