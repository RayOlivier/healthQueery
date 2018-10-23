import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./Home.scss"

class Home extends Component {
  constructor() {
    super()

    this.state = {
      metroplex: ""
    }

    this.changeInput = this.changeInput.bind(this)
  }

  changeInput(e) {
    console.log("this.state", this.state)
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className="homepage">
        <div className="welcome-img">
          <h1>Welcome to HealthQueery</h1>
        </div>
        <div className="get-started">
          <p>
            HealthQueery is a review site for inclusive healthcare. Find a new
            healthcare provider or leave a review for one you've been to.
          </p>
          <div>
            <h2>Get Started</h2>
            <div>
              <div> Find Providers in your Metroplex: </div>
              <select
                value={this.state.metroplex}
                onChange={this.changeInput}
                name="metroplex"
              >
                <option value="">Select One</option>
                <option value="Dallas">Dallas Ft.Worth</option>
              </select>
              <Link
                to={{
                  pathname: "/search",
                  search: `?metroplex=${this.state.metroplex}`
                }}
              >
                <button
                // onClick={this.onMetroplexClick}
                >
                  Go
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
