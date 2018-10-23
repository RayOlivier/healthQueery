import React from "react"
// import MapContainer from "../../../components/MapContainer/MapContainer"

export default function About() {
  return (
    <div className="about-page">
      <div>About HealthQueery</div>
      <p>
        This website was made to list LGBTQ+ healthcare providers and allow the
        community to review them. The goal is to make it easier to find
        inclusive healthcare for everyone. HealthQueery is also a personal
        project and was built by a single developer.
      </p>
      {/* <MapContainer /> */}
      <div className="contact-container">
        <h1>Contact</h1>
        <div>Email: healthqueery@outlook.com</div>
      </div>
      <div className="faq-section">
        <h1>FAQ</h1>
        <div className="q-and-a">
          <h2 className="question">
            Is HealthQueery only for transgender people?
          </h2>
          <p className="answer">
            No. HealthQueery is trans-inclusive and there are a lot of listings
            that pertain to medical transition, but there are also listings for
            everything from HIV screening to LGBTQ+ friendly primary care
            physicians. The goal is to help everyone in the LGBTQ+ community
            find quality healthcare.
          </p>
        </div>
      </div>
    </div>
  )
}
