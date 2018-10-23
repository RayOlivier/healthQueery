import React, { Component } from "react"
import { Link } from "react-router-dom"
import transHQ from "../../images/transHQ.png"
import { connect } from "react-redux"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "./Nav.scss"

class Nav extends Component {
  constructor() {
    super()

    this.state = {
      menuOpen: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.renderIfLoggedIn = this.renderIfLoggedIn.bind(this)
    this.renderIfAdmin = this.renderIfAdmin.bind(this)
    this.menuOff = this.menuOff.bind(this)
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  menuOff() {
    this.setState({ menuOpen: false })
  }

  renderIfLoggedIn() {
    if (this.props.loggedIn) {
      return (
        <>
          <Link className="single-link" to="/profile" onClick={this.toggleMenu}>
            Profile & Favorites
          </Link>
          {/* <Link
            className="single-link"
            to="/favorites"
            onClick={this.toggleMenu}
          >
            Favorites
          </Link> */}
          <a className="single-link" href="http://localhost:3001/logout">
            Logout
          </a>
        </>
      )
    } else {
      return (
        <a className="single-link" href="http://localhost:3001/login">
          Login
        </a>
      )
    }
  }

  renderIfAdmin() {
    if (this.props.user.admin) {
      return (
        <>
          {" "}
          <Link className="single-link" to="/admin" onClick={this.toggleMenu}>
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

    return (
      <div className="nav">
        <div className="top-nav">
          <div className="left">
            <FontAwesomeIcon
              // id="icon"
              className={visibility}
              onClick={this.toggleMenu}
              icon={"chevron-circle-down"}
            />
          </div>
          <div className="middle">
            <Link className="single-link" to="/">
              <img src={transHQ} alt="Health Queery Logo" />
            </Link>
          </div>
          <div className="right">
            <Link className="single-link" to="/search">
              <FontAwesomeIcon
                // id="icon"
                className="icon"
                onClick={this.menuOff}
                icon={"search"}
              />
            </Link>
          </div>
        </div>
        <div className={visibility} id="the-menu">
          <div className="top">
            <h1>Menu</h1>
          </div>
          <div className="links">
            <Link className="single-link" to="/" onClick={this.toggleMenu}>
              Home
            </Link>
            <Link className="single-link" to="/about" onClick={this.toggleMenu}>
              About & FAQ
            </Link>
            {/* Consolidating to the about page for now
             <Link className='single-link' to="/contact" onClick={this.toggleMenu}>
              Contact
            </Link>
            <Link className='single-link' to="/faq" onClick={this.toggleMenu}>
              FAQ
            </Link> */}
            {this.renderIfAdmin()}
            {this.renderIfLoggedIn()}
          </div>
        </div>
        <div id="desktop-bar">
          <div className="left">
            <Link className="single-link" to="/" onClick={this.toggleMenu}>
              Home
            </Link>
            <Link className="single-link" to="/about" onClick={this.toggleMenu}>
              About & FAQ
            </Link>
          </div>
          <div className="right">
            <div className="user-links">
              {this.renderIfAdmin()}
              {this.renderIfLoggedIn()}
            </div>

            <div className="search-field">
              <input placeholder="  Search by keyword..." />
              <Link className="single-link" to="/search">
                {/* <img
                  src="https://static.thenounproject.com/png/105498-200.png"
                  alt=""
                /> */}

                <FontAwesomeIcon
                  // id="icon"
                  className="icon"
                  onClick={this.menuOff}
                  icon={"search"}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Nav)
