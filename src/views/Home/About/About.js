import React from "react"
import "./About.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function About() {
  return (
    <div className="about-page">
      <div className="about-section">
        <h1>About HealthQueery</h1>
        <p>
          This website was made to list LGBTQ+ healthcare providers and allow
          the community to review them. The goal of HealthQueery is to make it
          easier to find inclusive healthcare. HealthQueery is also a personal
          project and was built by a single fledgling developer.
        </p>
      </div>
      <div className="contact-section">
        <h1>Contact</h1>
        <li>Email: healthqueery@outlook.com</li>
      </div>
      <div className="faq-section">
        <h1>FAQ</h1>
        <div className="full-question">
          <FontAwesomeIcon
            // id="icon"
            className="icon"
            icon={"question-circle"}
          />
          <div className="q-and-a">
            <h2 className="question">My metroplex isn't listed.</h2>
            <p className="answer">
              HealthQueery has limited listings and only one admin. So far, the
              only fully supported metroplex is DFW, but the hope is to expand
              further.
            </p>
          </div>
        </div>
        <div className="full-question">
          <FontAwesomeIcon
            // id="icon"
            className="icon"
            icon={"question-circle"}
          />
          <div className="q-and-a">
            <h2 className="question">
              Is HealthQueery only for transgender healthcare?
            </h2>
            <p className="answer">
              No. HealthQueery is trans-inclusive and there are a lot of
              listings that pertain to medical transition, but there are also
              listings for HIV screening, LGBTQ+ friendly primary care
              physicians, and more. The goal is to help everyone in the LGBTQ+
              community find quality healthcare.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
