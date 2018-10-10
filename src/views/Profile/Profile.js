import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { getUser } from "./../../ducks/reducer"

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
  }

  toggleEdit() {
    this.setState({ editing: !this.state.editing })
  }

  handleChange(e) {
    //do some redux magics
  }

  renderProfile() {
    if (!this.props.loggedIn) {
      return <div className="no-profile">Log in to view your profile.</div>
    } else if (this.state.editing) {
      return (
        <div className="edit-on">
          <h1>Edit Profile</h1>
          <div>
            Display name:
            <input
              placeholder="Enter username..."
              value={this.props.user.username}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className="profile-info">Email: {this.props.user.email}</div>
          <div>
            Gender:
            <input
              placeholder="Enter gender..."
              value={this.props.user.gender}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div>
            Sexuality:
            <input
              placeholder="Enter sexuality..."
              value={this.props.user.sexual_orientation}
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

          <button onClick={this.toggleEdit}>Submit</button>
        </div>
      )
    } else {
      return (
        <div className="profile">
          <h1>Profile</h1>

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
          <button onClick={this.toggleEdit}>Edit Profile</button>
          {/* <div className="profile-info">
            Date of Birth: {this.props.user.date_of_birth}
          </div> */}
        </div>
      )
    }
  }

  componentDidMount() {
    axios.get("/profile").then((res) => {
      console.log("res in mount of profile", res)
      //this gives user from db
      this.props.getUser(res.data[0].user_id)
    })
  }

  render() {
    // console.log("req.user", req.user)
    console.log("this.state", this.state)
    return (
      <div className="profile">{this.renderProfile()}</div>
      // <div className="user-profile">
      //   <h1>Profile</h1>
      //   <button onClick={this.toggleEdit}>Edit Profile</button>
      //   <div className="profile-input">
      //     Username: {this.props.user.username}
      //   </div>
      //   <div className="profile-input">Email: {this.props.user.email}</div>
      //   <div className="profile-input">Gender: {this.props.user.gender}</div>
      //   <div className="profile-input">
      //     Sexuality: {this.props.user.sexual_orientation}
      //   </div>
      //   <div className="profile-input">
      //     Profile Picture URL: {this.props.user.display_img}
      //   </div>
      //   <div className="profile-input">
      //     Date of Birth: {this.props.user.date_of_birth}
      //   </div>
      // </div>
    )
  }
}

const mapStateToProps = (state) => state

export default connect(
  mapStateToProps,
  { getUser }
)(Profile)
