import React from "react"
import { Link } from "react-router-dom"

export default function Menu(props) {
  return (
    <div className="menu">
      <div>Menu</div>
      <Link to="/" onClick={props.toggleMenu} onClick={props.toggleMenu}>
        Home
      </Link>
      <Link to="/about" onClick={props.toggleMenu}>
        About
      </Link>
      <Link to="/contact" onClick={props.toggleMenu}>
        Contact
      </Link>
      <Link to="/faq" onClick={props.toggleMenu}>
        FAQ
      </Link>
      <Link to="/login" onClick={props.toggleMenu}>
        Login
      </Link>
      <Link to="/favorites" onClick={props.toggleMenu}>
        Favorites
      </Link>
      <Link to="/logout" onClick={props.toggleMenu}>
        Logout
      </Link>
    </div>
  )
}
