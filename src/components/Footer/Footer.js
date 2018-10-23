import React from "react"
import { Link } from "react-router-dom"

import "./Footer.scss"

export default function Footer() {
  return (
    <div className="footer">
      {/* <h1>Footer</h1> */}

      <Link to="/submit" className="single-link">
        <div>Submit a Provider</div>
      </Link>
      <div className="footer-contact">
        <h1>Contact Us</h1>
        <div>Email: healthqueery@outlook.com </div>
      </div>
    </div>
  )
}
