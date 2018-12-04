import React, { Component } from "react";
import axios from "axios";
import ReviewCard from "./ReviewCard/ReviewCard";
import ReviewForm from "./ReviewForm/ReviewForm";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";

// import StarRatingComponent from "react-star-rating-component"

import NumberFormat from "react-number-format";

import EmbedMap from "../../components/EmbedMap/EmbedMap";

import "./Doctor.scss";
import EditDoctor from "./EditDoctor/EditDoctor";

class Doctor extends Component {
  constructor() {
    super();

    this.state = {
      demographics: [],
      specialties: [],
      doctor: {},
      reviews: [],
      postingReview: false,
      editing: false,
      avgRating: 0,
      redirect: false
    };

    this.getDocInfo = this.getDocInfo.bind(this);

    this.togglePosting = this.togglePosting.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.renderPostingForm = this.renderPostingForm.bind(this);
    this.renderIfLoggedIn = this.renderIfLoggedIn.bind(this);
    this.renderIfAdmin = this.renderIfAdmin.bind(this);

    this.renderRedirect = this.renderRedirect.bind(this);
  }

  renderRedirect() {
    //this will give an error but theoretically should be fine in production ??
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
  }

  renderIfAdmin() {
    // console.log("this.props", this.props)
    if (this.props.user.admin) {
      return (
        <div className="admin-controls">
          <button onClick={this.toggleEditing}>Edit</button>

          {/* this works like an if statement */}
          {this.state.editing && (
            <EditDoctor
              doctorObj={this.state.doctor}
              specialties={this.state.specialties}
              demographics={this.state.demographics}
              id={this.props.match.params.id}
              toggleEdit={this.toggleEditing}
            />
          )}
        </div>
      );
    }
  }

  getDocInfo() {
    axios.get(`/api/doctor/${this.props.match.params.id}`).then((res) => {
      console.log("res from get doc", res);
      if (res.data.length < 1) {
        console.log("doctor doesnt exist");
        this.setState({ redirect: true });
      }
      this.setState({ doctor: res.data[0] });
    });
    axios.get(`/api/specialties/${this.props.match.params.id}`).then((res) => {
      this.setState({ specialties: res.data[0].array });
    });

    axios.get(`/api/demographics/${this.props.match.params.id}`).then((res) => {
      this.setState({ demographics: res.data[0].array });
    });

    axios.get(`/api/reviews/${this.props.match.params.id}`).then((res) => {
      this.setState({ reviews: res.data });
    });

    axios.get(`/api/rating/${this.props.match.params.id}`).then((res) => {
      // console.log("res from rating", res)
      let rounded = Math.round(10 * res.data[0].avg) / 10;
      this.setState({ avgRating: rounded });
    });
    // console.log("got info")
  }

  toggleEditing() {
    this.setState({ editing: !this.state.editing });
    this.getDocInfo();
  }

  togglePosting() {
    this.setState({ postingReview: !this.state.postingReview });

    this.getDocInfo();
  }

  renderIfLoggedIn() {
    // let reviewedAlready = null
    let reviewedAlready = this.state.reviews.find((element) => {
      return element.user_id === this.props.user.user_id;
    });
    // console.log("reviewedAlready", reviewedAlready)
    if (this.props.loggedIn) {
      //RIGHT NOW ADMINS CAN POST MULTIPLE REVIEWS FOR TESTING PURPOSES
      if (reviewedAlready && !this.props.user.admin) {
        return <div>You already reviewed this doctor.</div>;
      } else {
        return <button onClick={this.togglePosting}>Post Review</button>;
      }
    } else {
      return (
        <div className="not-logged-in">
          {" "}
          <a href={process.env.REACT_APP_LOGIN}>Login</a> to post a review.
        </div>
      );
    }
  }

  renderPostingForm() {
    if (this.state.postingReview) {
      return (
        <ReviewForm
          id={this.props.match.params.id}
          togglePosting={this.togglePosting}
        />
      );
    }
  }

  componentDidMount() {
    this.getDocInfo();
  }
  render() {
    // console.log("this.state.reviews", this.state.reviews)
    // console.log("this.state", this.state)
    let { doctor, reviews } = this.state;
    let reviewsList = reviews.map((e, i, arr) => {
      return (
        <ReviewCard
          key={i}
          title={e.title}
          rating={e.rating}
          editted={e.editted}
          body={e.body}
          timePosted={e.time_posted}
          userId={e.user_id}
        />
      );
    });
    let specList = this.state.specialties.map((e, i, arr) => {
      return <li key={i}>{e}</li>;
    });
    let demList = this.state.demographics.map((e, i, arr) => {
      return <li key={i}>{e}</li>;
    });

    // // console.log("doctor.practice_name", doctor.practice_name)

    return (
      <div className="doctor-page">
        <div className="doctor-info">
          {this.renderRedirect()}
          {this.renderIfAdmin()}
          <h1>
            {doctor.doctor_name}
            <div className="h2"> {doctor.practice_name} </div>
          </h1>
          <div style={{ marginLeft: "5px" }}>
            {this.state.avgRating}
            /5 stars from {this.state.reviews.length} reviews
          </div>
          {/* <div className="star-container">
            <StarRatingComponent
              className="stars"
              name="card-rating"
              value={Math.round(this.state.avgRating)}
              editing={false}
            />
            ({this.state.avgRating})
          </div> */}
          <img src={doctor.img_url} alt="doctor portrait" />

          <p>{doctor.description}</p>

          <div className="location">
            <h1> Location</h1>
            <EmbedMap
              streetAddress={doctor.street_address}
              city={doctor.city}
              state={doctor.state}
              id={this.props.match.params.id}
            />
          </div>

          <div className="services">
            <h1>Services</h1>
            <ul>{specList}</ul>
          </div>
          <div className="demographics">
            <h1>Demographics</h1>
            <ul>{demList}</ul>

            {doctor.nb_inclusive && <div> &#10004; Nonbinary inclusive </div>}
          </div>

          <div className="contact">
            <h1>Contact</h1>
            <ul>
              <li>
                Phone:{" "}
                <NumberFormat
                  value={this.state.doctor.phone}
                  displayType={"text"}
                  format={"(###) ###-####"}
                />
              </li>
              <li>Email: {doctor.email}</li>
              <li>
                Website:{" "}
                <a
                  href={doctor.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {doctor.website_url}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <h1>Reviews</h1>
        {this.renderIfLoggedIn()}
        {/* <button onClick={this.togglePosting}>Post Review</button> */}

        {this.renderPostingForm()}

        <div className="review-list">{reviewsList}</div>
      </div>
    );
  }
}

const MSP = (state) => state;

export default connect(MSP)(Doctor);
