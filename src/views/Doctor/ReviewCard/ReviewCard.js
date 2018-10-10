import React from "react"

export default function ReviewCard(props) {
  return (
    <div className="review">
      <div>
        <h4>
          {props.title} - {props.rating} stars
        </h4>
      </div>
      <div className="review-info">
        Posted {props.timePosted} <br /> by user {props.userId}
      </div>
      <p>{props.body}</p>
    </div>
  )
}
