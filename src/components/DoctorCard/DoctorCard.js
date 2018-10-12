import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

//this component is just for a preview of the doctor that links to their detailed page (Doctor view)
class DoctorCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      doctor: {},
      specialties: [],
      demographics: []
    }
    this.getDoctor = this.getDoctor.bind(this)
  }

  getDoctor() {
    axios.get(`/api/doctor/${this.props.id}`).then((res) => {
      console.log("res", res)
      this.setState({ doctor: res.data[0] })
    })
  }

  componentDidMount() {
    this.getDoctor()

    axios.get(`/api/specialties/${this.props.id}`).then((res) => {
      this.setState({ specialties: res.data[0].array })
    })

    axios.get(`/api/demographics/${this.props.id}`).then((res) => {
      this.setState({ demographics: res.data[0].array })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.getDoctor()
    }
  }

  render() {
    console.log("this.props", this.props)

    let specList = this.state.specialties.map((e, i, a) => {
      return <li key={i}>{e}</li>
    })
    let demList = this.state.demographics.map((e, i, a) => {
      if (i < a.length - 1) {
        return `${e}, `
      } else {
        return `${e}`
      }
    })

    return (
      <div className="doctor-card">
        <img src={this.state.doctor.img_url} alt="doctor portrait" />

        <div className="right">
          <div>{this.state.doctor.doctor_name} </div>
          <span>{`${this.state.doctor.category} in ${this.state.doctor.city}, ${
            this.state.doctor.state
          }`}</span>
          <ul>{specList}</ul>

          <div>Demographics: {demList}</div>
          <Link to={`/doctor/${this.props.id}`}>
            <button>More info ></button>
          </Link>
        </div>
      </div>
    )
  }
}

export default DoctorCard
