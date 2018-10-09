import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

class Nav extends Component {
  constructor() {
    super()

    this.state = {
      menuOpen: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.loginRedirect = this.loginRedirect.bind(this)
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  loginRedirect() {
    axios.get("/api/login").then((res) => {
      console.log(res)
    })
  }

  render() {
    console.log("this.state", this.state)

    var visibility = "hide"

    if (this.state.menuOpen) {
      visibility = "show"
    }

    console.log("visibility", visibility)

    return (
      <div className="nav">
        <div className="top-nav">
          <div className="left">
            <img
              src="http://jslancer.com/wp-content/uploads/2016/11/Hamburger_icon.svg_.png"
              alt=""
              onClick={this.toggleMenu}
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
        <div className={visibility} id="the-menu">
          <div>Menu</div>
          <Link to="/" onClick={this.toggleMenu}>
            Home
          </Link>
          <Link to="/about" onClick={this.toggleMenu}>
            About
          </Link>
          <Link to="/contact" onClick={this.toggleMenu}>
            Contact
          </Link>
          <Link to="/faq" onClick={this.toggleMenu}>
            FAQ
          </Link>

          <a href="http://localhost:3001/api/login">Login</a>
          <Link to="/favorites" onClick={this.toggleMenu}>
            Favorites
          </Link>
          <Link to="/logout" onClick={this.toggleMenu}>
            Logout
          </Link>
        </div>
      </div>
    )
  }
}

export default Nav
