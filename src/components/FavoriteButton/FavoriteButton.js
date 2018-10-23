import React, { Component } from "react"
import { connect } from "react-redux"
import { getFavorites } from "../../ducks/reducer"
import "./FavoriteButton.scss"

import axios from "axios"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { library } from "@fortawesome/fontawesome-svg-core"

// import { fas } from "@fortawesome/free-solid-svg-icons"
// import { far } from "@fortawesome/free-regular-svg-icons"

// library.add(fas, far)

class FavoriteButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      onFavorite: null
    }

    this.renderButton = this.renderButton.bind(this)
    this.addFav = this.addFav.bind(this)
    this.deleteFav = this.deleteFav.bind(this)
  }

  renderButton() {
    // console.log("this.props.favorites", this.props.favorites)
    // console.log("this.props.id", this.props.id)
    // console.log("onFavorite", onFavorite)
    if (this.state.onFavorite) {
      return (
        <FontAwesomeIcon
          id="icon"
          className="full"
          onClick={this.deleteFav}
          icon={["fas", "heart"]}
        />
      )
    } else {
      return (
        <FontAwesomeIcon
          id="icon"
          className="outline"
          onClick={this.addFav}
          icon={["far", "heart"]}
        />
      )
    }
  }

  addFav() {
    if (this.props.loggedIn) {
      axios
        .post(`/api/favorite/${this.props.id}`, {
          user_id: this.props.user.user_id
        })
        .then(this.props.getFavorites(this.props.user.user_id))
        .then(this.setState({ onFavorite: true }))
    } else {
      alert("You must be logged in to add favorites")
    }
  }

  deleteFav() {
    // console.log("this.props.id", this.props.id)
    // console.log("this.props.user.user_id", this.props.user.user_id)
    axios
      .delete(`/api/favorite/${this.props.id}`, {
        data: { user: this.props.user.user_id }
      })
      .then(this.props.getFavorites(this.props.user.user_id))
      .then(this.setState({ onFavorite: false }))
  }

  componentDidMount() {
    let onFav = this.props.favorites.includes(this.props.id)

    this.setState({ onFavorite: onFav })
  }

  render() {
    //pass in the card's doctor id as id

    return <>{this.renderButton()}</>
  }
}

const MSP = (state) => state

export default connect(
  MSP,
  { getFavorites }
)(FavoriteButton)
