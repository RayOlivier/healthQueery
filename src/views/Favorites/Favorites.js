import React, { Component } from "react";
import { connect } from "react-redux";
import { getFavorites } from "../../ducks/reducer";
import DoctorCard from "../../components/DoctorCard/DoctorCard";

class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: []
    };
    this.makeCards = this.makeCards.bind(this);
    this.ifNotLoggedIn = this.ifNotLoggedIn.bind(this);
  }

  makeCards() {
    let newCards = this.props.favorites.map((e, i, a) => {
      return <DoctorCard key={i} id={e} />;
    });
    this.setState({ cards: newCards });
  }

  ifNotLoggedIn() {
    if (!this.props.loggedIn) {
      return (
        <div>
          <a className="single-link" href={process.env.REACT_APP_LOGIN}>
            Login
          </a>{" "}
          to view your favorites
        </div>
      );
    }
  }

  componentDidMount() {
    this.props.getFavorites(this.props.user.user_id).then((res) => {
      this.makeCards();
    });
  }

  render() {
    return (
      <div>
        <h1 className="profile-header">Your Favorites</h1>

        {this.ifNotLoggedIn()}
        {this.state.cards}
        {/* <div>{this.props.favorites}</div> */}
      </div>
    );
  }
}

const MSP = (state) => state;

export default connect(
  MSP,
  { getFavorites }
)(Favorites);
