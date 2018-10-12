import React, { Component } from "react"
import StarRatingComponent from "react-star-rating-component"
import moment from "moment"
import axios from "axios"

class ReviewCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: ""
    }
  }

  componentDidMount() {
    axios.get(`/api/user/${this.props.userId}`).then((res) => {
      // console.log("res", res)
      this.setState({ username: res.data[0].username })
    })
  }
  render() {
    let trunk = this.props.timePosted.split(".")
    let trunkStr = trunk[0]

    var actionTime = moment(trunkStr + "+05:00", "YYYY-MM-DD HH:mm:ssZ")

    var timeAgo = actionTime.fromNow()
    return (
      <div className="review-card">
        <div className="title-rating">
          <h4>{this.props.title}</h4>
          <StarRatingComponent
            name="card-rating"
            value={this.props.rating}
            editing={false}
          />
        </div>
        <div className="review-info">
          Posted {timeAgo} <br /> by {this.state.username}
        </div>
        <p style={{ wordWrap: "break-word" }}>{this.props.body}</p>
      </div>
    )
  }
}

export default ReviewCard
