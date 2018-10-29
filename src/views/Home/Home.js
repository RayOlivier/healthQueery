import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./Home.scss"
import Select from "react-select"

const metroplexOptions = [
  { name: "metroplex", label: "Dallas Ft.Worth", value: "Dallas" }
  //,{ name: "metroplex", label: "Other", value: "other" }
]

class Home extends Component {
  constructor() {
    super()

    this.state = {
      metroplex: "",
      metroplexSelected: null
    }

    this.changeInput = this.changeInput.bind(this)
    this.changeSelect = this.changeSelect.bind(this)
  }

  changeInput(e) {
    console.log("this.state", this.state)
    this.setState({ [e.target.name]: e.target.value })
  }

  changeSelect(e) {
    // console.log("e", e)
    let selected = `${e.name}Selected`
    this.setState({ [e.name]: e.value, [selected]: e })
    console.log("this.state", this.state)
  }

  render() {
    return (
      <div className="homepage">
        <div className="welcome-img">
          <h1>Welcome to HealthQueery</h1>
        </div>
        <div className="under-img">
          <p>Find or review LGBTQ+ inclusive healthcare providers.</p>
          <div className="get-started">
            <h2>Get Started</h2>
            <div>
              <div> Find a Provider in Your Metroplex: </div>

              <div className="select-and-button">
                <Select
                  className="select"
                  value={this.state.metroplexSelected}
                  name="metroplex"
                  onChange={this.changeSelect}
                  options={metroplexOptions}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 8,
                    colors: {
                      ...theme.colors,
                      // text: "green",
                      primary25: "#ffcccc",
                      primary: "#3e87b2"
                    }
                  })}
                />
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
      </div>
    )
  }
}

export default Home
