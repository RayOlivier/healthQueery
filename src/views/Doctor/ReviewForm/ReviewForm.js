import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"

class ReviewForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: "",
      body: "",
      rating: 3
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit() {
    axios
      .post(`/api/review/doctor/${this.props.id}`, {
        user_id: this.props.user.user_id,
        title: this.state.title,
        rating: this.state.rating,
        body: this.state.body
      })
      .then(this.props.togglePosting())
  }

  render() {
    return (
      <div className="review-form">
        <h1>Post your review</h1>

        <div>Figure out how to do rating input via star images</div>
        <div className="review-input">
          Title:{" "}
          <input
            placeholder="Enter title..."
            name="title"
            onChange={(e) => this.handleChange(e)}
          />
          <div className="review-input">
            Body:{" "}
            <input
              placeholder="Enter your review..."
              name="body"
              onChange={(e) => this.handleChange(e)}
            />
          </div>
        </div>
        <button onClick={this.onSubmit}>Submit Review</button>
      </div>
    )
  }
}

const MSP = (state) => state

export default connect(MSP)(ReviewForm)
