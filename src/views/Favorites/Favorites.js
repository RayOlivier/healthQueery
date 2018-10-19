import React, { Component } from "react"
import { connect } from "react-redux"
import { getFavorites } from "../../ducks/reducer"
import DoctorCard from "../../components/DoctorCard/DoctorCard"

class Favorites extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cards: []
    }
    this.makeCards = this.makeCards.bind(this)
    this.ifNotLoggedIn = this.ifNotLoggedIn.bind(this)
  }

  makeCards() {
    let newCards = this.props.favorites.map((e, i, a) => {
      return <DoctorCard key={i} id={e} />
    })
    this.setState({ cards: newCards })
  }

  ifNotLoggedIn() {
    if (!this.props.loggedIn) {
      return (
        <div>
          <a className="single-link" href="http://localhost:3001/login">
            Login
          </a>{" "}
          to view your favorites
        </div>
      )
    }
  }

  componentDidMount() {
    console.log("this.props", this.props)
    this.props.getFavorites(this.props.user.user_id).then((res) => {
      console.log("res", res)
      this.makeCards()
    })
  }

  render() {
    console.log("this.props.favorites", this.props.favorites)
    console.log("this.state.cards", this.state.cards)
    return (
      <div>
        <h1>Your Favorites</h1>

        {this.ifNotLoggedIn()}
        {this.state.cards}
        {/* <div>{this.props.favorites}</div> */}
      </div>
    )
  }
}

const MSP = (state) => state

export default connect(
  MSP,
  { getFavorites }
)(Favorites)
