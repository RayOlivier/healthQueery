import React, { Component } from "react"
import { Link } from "react-router-dom"
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
    this.renderIfLoggedIn = this.renderIfLoggedIn.bind(this)
    this.renderIfAdmin = this.renderIfAdmin.bind(this)
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen })
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
            <Link className="single-link" to="/">
              <img src={transHQ} alt="Health Queery Logo" />
            </Link>
          </div>
          <div className="right">
            <Link className="single-link" to="/search">
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
                <img
                  src="https://static.thenounproject.com/png/105498-200.png"
                  alt=""
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
