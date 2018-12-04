import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import transHQ from "../../images/transHQ.png";
import { connect } from "react-redux";

import Select from "react-select";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Nav.scss";

const options = [
  { name: "metroplex", label: "Dallas Ft.Worth", value: "Dallas" }
];

class Nav extends Component {
  constructor() {
    super();

    this.state = {
      menuOpen: false,
      redirect: false,
      metroplex: null,
      selected: null
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.renderIfLoggedIn = this.renderIfLoggedIn.bind(this);
    this.renderIfAdmin = this.renderIfAdmin.bind(this);
    this.menuOff = this.menuOff.bind(this);
    this.changeSearch = this.changeSearch.bind(this);

    this.renderRedirect = this.renderRedirect.bind(this);
  }

  changeSearch(e) {
    //
    console.log("e", e);
    this.setState({ [e.name]: e.value, redirect: true });
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  menuOff() {
    this.setState({ menuOpen: false });
  }

  renderRedirect() {
    //this will give an error but theoretically should be fine in production ??
    if (this.state.redirect) {
      this.setState({ redirect: false });
      return <Redirect push to={`/search?metroplex=${this.state.metroplex}`} />;
    }
  }

  renderIfLoggedIn() {
    if (this.props.loggedIn) {
      return (
        <>
          <Link className="single-link" to="/profile" onClick={this.toggleMenu}>
            Profile
            {/* & Favorites */}
          </Link>
          {/* <Link
            className="single-link"
            to="/favorites"
            onClick={this.toggleMenu}
          >
            Favorites
          </Link> */}
          <a className="single-link" href={process.env.REACT_APP_LOGOUT}>
            Logout
          </a>
        </>
      );
    } else {
      return (
        <a className="single-link" href={process.env.REACT_APP_LOGIN}>
          Login
        </a>
      );
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
      );
    }
  }

  render() {
    // console.log("this.state", this.state)

    var visibility = "hide";

    if (this.state.menuOpen) {
      visibility = "show";
    }

    return (
      <div className="nav">
        {this.renderRedirect()}

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
            <Link className="single-link" to="/about" onClick={this.toggleMenu}>
              About & FAQ
            </Link>
          </div>

          <div className="middle">
            <Link className="middle-link" to="/" onClick={this.toggleMenu}>
              HealthQueery
            </Link>
          </div>

          <div className="right">
            <div className="user-links">
              {this.renderIfAdmin()}
              {this.renderIfLoggedIn()}
            </div>

            <div className="search-field">
              <Select
                className="search-select"
                options={options}
                onChange={(e) => this.changeSearch(e)}
                placeholder="Select metroplex..."
                value={this.state.selected}
              />
              {/* <Link
                className="single-link"
                to={`/search?metroplex=${this.state.metroplex}`}
              > */}
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
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Nav);
