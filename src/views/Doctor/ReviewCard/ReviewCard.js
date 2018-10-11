import React from "react"
import StarRatingComponent from "react-star-rating-component"
import moment from "moment"

export default function ReviewCard(props) {
  let time = moment(props.timePosted).fromNow()
  return (
    <div className="review-card">
      <div className="title-rating">
        <h4>{props.title}</h4>
        <StarRatingComponent
          name="card-rating"
          value={props.rating}
          editing={false}
        />
      </div>
      <div className="review-info">
        Posted {time} <br /> by user {props.userId}
      </div>
      <p style={{ "word-wrap": "break-word" }}>{props.body}</p>
    </div>
  )
}
