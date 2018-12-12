import React, { Component } from "react";

import axios from "axios";
import GoogleMapReact from "google-map-react";
//maybe import {Marker} ??

const Pin = ({ text }) => {
  return (
    <div>
      <img
        className="simple-pin"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Redpoint.svg/1024px-Redpoint.svg.png"
        alt=""
      />
      {text}
    </div>
  );
};

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=

class SimpleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 0,
      lng: 0,

      zoom: 17
    };

    this.getCords = this.getCords.bind(this);
  }

  // static defaultProps = {
  //   center: {
  //     lat: 59.95,
  //     lng: 30.33
  //   },
  //   zoom: 11
  // }

  // dont render

  getCords(address) {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
          process.env.REACT_APP_MAPS_API_KEY
        }`
      )
      .then((res) => {
        // console.log("res", res)
        // console.log("res lat", res.data.results[0].geometry.location.lat)
        // console.log("res lng", res.data.results[0].geometry.location.lng)
        this.setState({
          lat: res.data.results[0].geometry.location.lat,
          lng: res.data.results[0].geometry.location.lng
        });
      });
  }

  componentDidMount() {
    // let address = `${this.props.street_address}, ${this.props.city}, ${
    //   this.props.state
    // }`

    let address1 = "500 S Ervay St, Dallas, TX";
    this.getCords(address1);
  }

  render() {
    // console.log(
    //   "this.state.lat, this.state.lng",
    //   this.state.lat,
    //   this.state.lng
    // );
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "40vh", width: "90%" }} className="simple-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
          defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
          defaultZoom={this.state.zoom}
        >
          <Pin lat={this.state.lat} lng={this.state.lng} text={"hi"} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
