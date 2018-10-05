import React from "react"
import { Link } from "react-router-dom"

export default function Nav() {
  return (
    <div className="nav">
      <div className="left">
        <img
          src="http://jslancer.com/wp-content/uploads/2016/11/Hamburger_icon.svg_.png"
          alt=""
        />
      </div>
      <div className="middle">
        <Link to="/">
          <span>HQ</span>
        </Link>
      </div>
      <div className="right">
        <Link to="/search">
          {" "}
          <img
            src="https://static.thenounproject.com/png/105498-200.png"
            alt=""
          />
        </Link>
      </div>
    </div>
  )
}
