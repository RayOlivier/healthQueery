import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import Select from "react-select";

const metroplexOptions = [
  { name: "metroplex", label: "Dallas Ft.Worth", value: "Dallas" }
  //,{ name: "metroplex", label: "Other", value: "other" }
];

class Home extends Component {
  constructor() {
    super();

    this.state = {
      metroplex: null,
      metroplexSelected: null
    };

    this.changeInput = this.changeInput.bind(this);
    this.changeSelect = this.changeSelect.bind(this);
  }

  changeInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  changeSelect(e) {
    // console.log("e", e)
    let selected = `${e.name}Selected`;
    this.setState({ [e.name]: e.value, [selected]: e });
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
              <p className="find-text"> Find a Provider in Your Metroplex </p>

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
                    className="go-button"
                    // onClick={this.onMetroplexClick}

                    disabled={!this.state.metroplex}
                  >
                    Go
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
