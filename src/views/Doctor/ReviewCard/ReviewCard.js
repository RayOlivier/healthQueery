import React from "react"

export default function ReviewCard(props) {
  return (
    <div className="review">
      <h1>{props.title}</h1>
      <div>{props.rating}</div>
      <div className="review-info">
        Posted {props.timePosted} by user {props.userId}
      </div>
      <p>{props.body}</p>
    </div>
  )
}
