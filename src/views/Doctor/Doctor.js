import React, { Component } from "react"
import axios from "axios"
import ReviewCard from "./ReviewCard/ReviewCard"
import ReviewForm from "./ReviewForm/ReviewForm"
import { connect } from "react-redux"

import SimpleMap from "../../components/SimpleMap/SimpleMap"
import EmbedMap from "../../components/EmbedMap/EmbedMap"

class Doctor extends Component {
  constructor() {
    super()

    this.state = {
      demographics: [],
      specialties: [],
      doctor: {},
      reviews: [],
      postingReview: false,
      img: ""
    }

    this.togglePosting = this.togglePosting.bind(this)
    this.renderPostingForm = this.renderPostingForm.bind(this)
    this.renderIfLoggedIn = this.renderIfLoggedIn.bind(this)
  }

  togglePosting() {
    this.setState({ postingReview: !this.state.postingReview })
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
    axios.get(`/api/doctor/${this.props.match.params.id}`).then((res) => {
      this.setState({ doctor: res.data[0] })
    })

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
    // console.log("this.state", this.state)
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
    return (
      <div className="doctor-page">
        <h1>{doctor.doctor_name}</h1>
        <img src={doctor.img_url} alt="doctor portrait" />

        <p>{doctor.description}</p>

        <div className="location">
          <h1> Location</h1>
          {/* <SimpleMap /> */}
          <EmbedMap
            streetAddress={doctor.street_address}
            city={doctor.city}
            state={doctor.state}
            id={this.props.match.params.id}
          />
          {/* <div> this is now in the embedmap component
            {doctor.street_address}
            {doctor.city}, {doctor.state}
          </div> */}
        </div>

        <div>
          <h1>Services</h1>
        </div>

        <div className="contact">
          <h1>Contact</h1>
          <ul>
            <li>Phone: {doctor.phone}</li>
            <li>Email: {doctor.email}</li>
            <li>Website: {doctor.website_url}</li>
          </ul>
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
