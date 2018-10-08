import React, { Component } from "react"
import { Link } from "react-router-dom"
import Menu from "./Menu/Menu"

class Nav extends Component {
  constructor() {
    super()

    this.state = {
      menuOpen: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.renderMenu = this.renderMenu.bind(this)
    // this.clickMenuLink = this.clickMenuLink.bind(this)
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  // clickMenuLink(){}

  renderMenu() {
    if (this.state.menuOpen === true) {
      return <Menu toggleMenu={this.toggleMenu} />
    }
  }

  render() {
    console.log("this.state", this.state)
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
        <div className="under-nav">{this.renderMenu()}</div>
      </div>
    )
  }
}

export default Nav
