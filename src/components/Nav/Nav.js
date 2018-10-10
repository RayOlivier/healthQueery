import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import transHQ from "../../images/transHQ.png"
import { connect } from "react-redux"

import "./Nav.scss"

class Nav extends Component {
  constructor() {
    super()

    this.state = {
      menuOpen: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.loginRedirect = this.loginRedirect.bind(this)
    this.renderIfLoggedIn = this.renderIfLoggedIn.bind(this)
    this.renderIfAdmin = this.renderIfAdmin.bind(this)
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  loginRedirect() {
    axios.get("/api/login").then((res) => {
      console.log(res)
    })
  }

  renderIfLoggedIn() {
    if (this.props.loggedIn) {
      return (
        <>
          <Link to="/profile" onClick={this.toggleMenu}>
            Profile
          </Link>
          <Link to="/favorites" onClick={this.toggleMenu}>
            Favorites
          </Link>
          <a href="http://localhost:3001/logout">Logout</a>
        </>
      )
    } else {
      return <a href="http://localhost:3001/login">Login</a>
    }
  }

  renderIfAdmin() {
    if (this.props.user.admin) {
      return (
        <>
          {" "}
          <Link to="/admin" onClick={this.toggleMenu}>
            Admin
          </Link>
        </>
      )
    }
  }

  render() {
    console.log("this.state", this.state)

    var visibility = "hide"

    if (this.state.menuOpen) {
      visibility = "show"
    }

    // console.log("visibility", visibility)

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
              <img src={transHQ} alt="Health Queery Logo" />
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
          <div className="top">
            <img
              src="https://www.shoepalace.com/rotator/images/circle-arrow-white.svg"
              alt=""
              onClick={this.toggleMenu}
            />
            <h1>Menu</h1>
          </div>
          <div className="links">
            <Link to="/" onClick={this.toggleMenu}>
              Home
            </Link>
            <Link to="/about" onClick={this.toggleMenu}>
              About & FAQ
            </Link>
            {/* Consolidating to the about page
             <Link to="/contact" onClick={this.toggleMenu}>
              Contact
            </Link>
            <Link to="/faq" onClick={this.toggleMenu}>
              FAQ
            </Link> */}
            {this.renderIfAdmin()}
            {this.renderIfLoggedIn()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Nav)
