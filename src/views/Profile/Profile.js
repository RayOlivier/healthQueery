import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"
import {
  getUser,
  getFavorites,
  profileChange
  // submitProfileEdit
} from "./../../ducks/reducer"

import Favorites from "../Favorites/Favorites"

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      emailFromRedirect: "",
      editing: false
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.renderProfile = this.renderProfile.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitEdit = this.submitEdit.bind(this)
  }

  toggleEdit() {
    // this.props.submitProfileEdit(this.props.user.user_id)

    this.setState({ editing: !this.state.editing })
  }

  submitEdit() {
    axios
      .put(`/api/user/${this.props.user.user_id}`, {
        username: this.props.user.username,
        gender: this.props.user.gender,
        sexual_orientation: this.props.user.sexual_orientation
      })
      .then(this.props.getUser(this.props.user.user_id))
    this.toggleEdit()
  }

  handleChange(e) {
    //do some redux magics and put requests
    this.props.profileChange(e.target.name, e.target.value)
  }

  renderProfile() {
    if (!this.props.loggedIn) {
      return (
        <div id="no-profile">
          <a className="single-link" href="http://localhost:3001/login">
            Login
          </a>{" "}
          to view your profile.
        </div>
      )
    } else if (this.state.editing) {
      return (
        <div className="edit-on">
          <h1>Edit Profile</h1>
          <div>
            Display name:
            <input
              placeholder="Enter username..."
              value={this.props.user.username}
              name="username"
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className="profile-info">Email: {this.props.user.email}</div>
          <div>
            Gender:
            <input
              placeholder="Enter gender..."
              value={this.props.user.gender}
              name="gender"
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div>
            Sexuality:
            <input
              placeholder="Enter sexuality..."
              value={this.props.user.sexual_orientation}
              name="sexual_orientation"
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          {/* <div>
            Profile Picture:
            <input
              placeholder="Enter img_url..."
              value={this.props.user.img_url}
              onChange={(e) => this.handleChange(e)}
            />
          </div> */}

          <button onClick={this.submitEdit}>Submit</button>
        </div>
      )
    } else {
      return (
        <div className="logged-in-profile">
          <h1 className="profile-header">Profile</h1>

          <div className="profile-info">
            Display name: {this.props.user.username}
          </div>
          <div className="profile-info">Email: {this.props.user.email}</div>
          <div className="profile-info">Gender: {this.props.user.gender}</div>
          <div className="profile-info">
            Sexuality: {this.props.user.sexual_orientation}
          </div>
          {/* <div className="profile-info">
            Profile Picture URL: {this.props.user.display_img}
          </div> */}
          <button onClick={this.toggleEdit} className="profile-info">
            Edit Profile
          </button>
          {/* <div className="profile-info">
            Date of Birth: {this.props.user.date_of_birth}
          </div> */}

          <div className="App" id="profile-favorites">
            <Favorites />
          </div>

          <div className="my-reviews">
            Render review cards that match the user's id
          </div>
        </div>
      )
    }
  }

  componentDidMount() {
    axios.get("/profile").then((res) => {
      // console.log("res in mount of profile", res)
      //this gives user from db
      this.props.getUser(res.data[0].user_id)
      this.props.getFavorites(res.data[0].user_id)
    })
  }

  render() {
    // console.log("this.state", this.state)
    return <div className="any-profile">{this.renderProfile()}</div>
  }
}

const mapStateToProps = (state) => state

export default connect(
  mapStateToProps,
  { getUser, getFavorites, profileChange }
)(Profile)
