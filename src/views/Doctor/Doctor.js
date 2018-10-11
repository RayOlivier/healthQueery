import React, { Component } from "react"
import axios from "axios"
import ReviewCard from "./ReviewCard/ReviewCard"
import ReviewForm from "./ReviewForm/ReviewForm"
import { connect } from "react-redux"

import NumberFormat from "react-number-format"

import EmbedMap from "../../components/EmbedMap/EmbedMap"

import "./Doctor.scss"
import EditDoctor from "./EditDoctor/EditDoctor"

class Doctor extends Component {
  constructor() {
    super()

    this.state = {
      demographics: [],
      specialties: [],
      doctor: {},
      reviews: [],
      postingReview: false,
      editing: false
    }

    this.getDocInfo = this.getDocInfo.bind(this)

    this.togglePosting = this.togglePosting.bind(this)
    this.toggleEditing = this.toggleEditing.bind(this)
    this.renderPostingForm = this.renderPostingForm.bind(this)
    this.renderIfLoggedIn = this.renderIfLoggedIn.bind(this)
    this.renderIfAdmin = this.renderIfAdmin.bind(this)
  }

  renderIfAdmin() {
    console.log("this.props", this.props)
    if (this.props.user.admin) {
      return (
        <div className="admin-controls">
          <button onClick={this.toggleEditing}>Edit</button>

          {/* this works like an if statement */}
          {this.state.editing && (
            <EditDoctor
              doctorObj={this.state.doctor}
              id={this.props.match.params.id}
              toggleEdit={this.toggleEditing}
            />
          )}
        </div>
      )
    }
  }

  getDocInfo() {
    axios.get(`/api/doctor/${this.props.match.params.id}`).then((res) => {
      this.setState({ doctor: res.data[0] })
    })
  }

  toggleEditing() {
    this.setState({ editing: !this.state.editing })
    this.getDocInfo()
  }

  togglePosting() {
    this.setState({ postingReview: !this.state.postingReview })

    this.getDocInfo()
  }

  renderIfLoggedIn() {
    if (this.props.loggedIn) {
      return <button onClick={this.togglePosting}>Post Review</button>
    } else {
      return (
        <div className="not-logged-in">
          {" "}
          <a href="http://localhost:3001/login">Login</a> to post a review.
        </div>
      )
    }
  }

  renderPostingForm() {
    if (this.state.postingReview) {
      return (
        <ReviewForm
          id={this.props.match.params.id}
          togglePosting={this.togglePosting}
        />
      )
    }
  }

  componentDidMount() {
    this.getDocInfo()

    axios.get(`/api/specialties/${this.props.match.params.id}`).then((res) => {
      // console.log("res.data", res.data)
      let specArr = res.data.map((e) => {
        return e.specialty + " "
      })
      this.setState({ specialties: specArr })
    })

    axios.get(`/api/demographics/${this.props.match.params.id}`).then((res) => {
      let demoArr = res.data.map((e) => {
        return e.demographic + " "
      })
      this.setState({ demographics: demoArr })
    })

    axios.get(`/api/reviews/${this.props.match.params.id}`).then((res) => {
      this.setState({ reviews: res.data })
    })

    if (
      this.state.doctor.img_url === null ||
      this.state.doctor.img_url === ""
    ) {
      this.setState({
        img:
          "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
      })
    }
  }
  render() {
    console.log("this.state", this.state)
    let { doctor, reviews } = this.state
    let reviewsList = reviews.map((e, i, arr) => {
      return (
        <ReviewCard
          key={i}
          title={e.title}
          rating={e.rating}
          editted={e.editted}
          body={e.body}
          timePosted={e.time_posted}
          userId={e.user_id}
        />
      )
    })
    let specList = this.state.specialties.map((e, i, arr) => {
      return <li key={i}>{e}</li>
    })
    let demList = this.state.demographics.map((e, i, arr) => {
      return <li key={i}>{e}</li>
    })

    return (
      <div className="doctor-page">
        <div className="doctor-info">
          {this.renderIfAdmin()}
          <h1>{doctor.doctor_name}</h1>
          <div style={{ "margin-left": "5px" }}>{doctor.practice_name}</div>
          <img src={doctor.img_url} alt="doctor portrait" />

          <p>{doctor.description}</p>

          <div className="location">
            <h1> Location</h1>
            <EmbedMap
              streetAddress={doctor.street_address}
              city={doctor.city}
              state={doctor.state}
              id={this.props.match.params.id}
            />
          </div>

          <div className="services">
            <h1>Services</h1>
            <ul>{specList}</ul>
          </div>
          <div className="demographics">
            <h1>Demographics</h1>
            <ul>{demList}</ul>
          </div>

          <div className="contact">
            <h1>Contact</h1>
            <ul>
              <li>
                Phone:{" "}
                <NumberFormat
                  value={this.state.doctor.phone}
                  displayType={"text"}
                  format={"(###) ###-####"}
                />
              </li>
              <li>Email: {doctor.email}</li>
              <li>
                Website:{" "}
                <a
                  href={doctor.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {doctor.website_url}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <h1>Reviews</h1>
        {this.renderIfLoggedIn()}
        {/* <button onClick={this.togglePosting}>Post Review</button> */}

        {this.renderPostingForm()}

        <div className="review-list">{reviewsList}</div>
      </div>
    )
  }
}

const MSP = (state) => state

export default connect(MSP)(Doctor)
