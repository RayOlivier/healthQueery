import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import FavoriteButton from "../FavoriteButton/FavoriteButton"
import "./DoctorCard.scss"

import StarRatingComponent from "react-star-rating-component"

//this component is just for a preview of the doctor that links to their detailed page (Doctor view)
class DoctorCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      doctor: {},
      specialties: [],
      demographics: [],
      avgRating: 0
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

    axios.get(`/api/rating/${this.props.id}`).then((res) => {
      // console.log("res from rating", res)
      let rounded = Math.round(10 * res.data[0].avg) / 10
      this.setState({ avgRating: rounded })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.getDoctor()
    }
  }

  render() {
    // console.log("this.props", this.props)

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
        <div className="left">
          <div className="doc-name">{this.state.doctor.doctor_name} </div>

          <img
            src={this.state.doctor.img_url}
            className="left-img"
            alt="doctor portrait"
          />
          <div className="star-container">
            <StarRatingComponent
              className="stars"
              name="card-rating"
              value={Math.round(this.state.avgRating)}
              editing={false}
            />
            ({this.state.avgRating})
          </div>
        </div>
        <div className="right">
          <FavoriteButton id={this.props.id} />
          <div className="cat">{this.state.doctor.category}</div>

          <span>
            {`${this.state.doctor.city}, ${this.state.doctor.state}
            `}
          </span>
          <div>
            <div style={{ textDecoration: "underline" }}>Services:</div>
            <ul>{specList}</ul>
          </div>

          <div>Demographics: {demList}</div>
          <Link to={`/doctor/${this.props.id}`}>
            <div className="button">More info ></div>
          </Link>
        </div>
      </div>
    )
  }
}

export default DoctorCard
