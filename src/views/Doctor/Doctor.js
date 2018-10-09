import React, { Component } from "react"
import axios from "axios"
import ReviewCard from "./ReviewCard/ReviewCard"
import ReviewForm from "./ReviewForm/ReviewForm"

class Doctor extends Component {
  constructor() {
    super()

    this.state = {
      demographics: [],
      specialties: [],
      doctor: {},
      reviews: [],
      postingReview: false
    }

    this.togglePosting = this.togglePosting.bind(this)
    this.renderPostingForm = this.renderPostingForm.bind(this)
  }

  togglePosting() {
    this.setState({ postingReview: !this.state.postingReview })
  }

  renderPostingForm() {
    if (this.state.postingReview) {
      return <ReviewForm id={this.props.match.params.id} />
    }
  }

  componentDidMount() {
    axios.get(`/api/doctor/${this.props.match.params.id}`).then((res) => {
      this.setState({ doctor: res.data[0] })
    })

    axios.get(`/api/specialties/${this.props.match.params.id}`).then((res) => {
      console.log("res.data", res.data)
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

    if (this.state.doctor.img_url === null) {
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
    return (
      <div>
        <h1>{doctor.doctor_name}</h1>
        <img src={doctor.img_url} alt="doctor portrait" />

        <p>{doctor.description}</p>

        <div className="contact">
          <h1>Contact</h1>
          <ul>
            <li>Phone: {doctor.phone}</li>
            <li>Email: {doctor.email}</li>
            <li>Website: {doctor.website_url}</li>
          </ul>
        </div>

        <h1>Reviews</h1>
        <button onClick={this.togglePosting}>Post Review</button>

        {this.renderPostingForm()}

        <div>{reviewsList}</div>
      </div>
    )
  }
}

export default Doctor
