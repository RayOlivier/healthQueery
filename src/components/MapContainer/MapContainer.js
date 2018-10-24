import React, { Component } from "react"
import axios from "axios"
import "./MapContainer.scss"

import { GoogleApiWrapper, Map, Marker, InfoWindow } from "google-maps-react"

// import Map from "./Map/Map"

export class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cards: [],
      markers: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      center: { lat: 32.7767, lng: -96.797 }
    }

    this.getCoords = this.getCoords.bind(this)
    this.renderMarkers = this.renderMarkers.bind(this)
    this.onMapClick = this.onMapClick.bind(this)
    this.onMarkerClick = this.onMarkerClick.bind(this)
  }

  //pass down displayedCards in search, then map to make markers

  onMarkerClick(props, marker, e) {
    console.log("this.state from marker click", this.state)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  onMapClick() {
    console.log("this.state from map click", this.state)
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  renderMarkers() {
    return [...this.state.markers]
  }

  getCoords() {
    console.log("getting coords")
    console.log("this.state", this.state)
    // this.setState({ markers: [] })

    this.props.cards.forEach((e, i, arr) => {
      //not getting this part
      // console.log("e", e)
      // console.log("in forEach loop")
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${
            e.props.address
          }&key=${process.env.REACT_APP_MAPS_API_KEY}`
        )
        .then((res) => {
          // console.log("res lat", res.data.results[0].geometry.location.lat)
          // console.log("res lng", res.data.results[0].geometry.location.lng)
          // console.log("res.data", res.data)

          let newMarker = (
            <Marker
              name={e.props.name}
              address={e.props.address}
              key={i}
              position={{
                lat: res.data.results[0].geometry.location.lat,
                lng: res.data.results[0].geometry.location.lng
              }}
              onClick={this.onMarkerClick}
            />
          )

          console.log("newMarker", newMarker)
          this.setState({ markers: [...this.state.markers, newMarker] })
        })
    })

    // this.setState({ markers: [newArr] })
    // console.log("this.state", this.state)
  }

  componentDidMount() {
    console.log("this.props", this.props)
    this.setState({ cards: this.props.cards })
    if (this.props.cards.length > 0) {
      console.log("in the length if statement")
      this.getCoords()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.cards !== prevProps.cards) {
      console.log("it updated")
      this.setState({ cards: this.props.cards, markers: [] })
      this.getCoords()
    }
  }

  render() {
    console.log("this.state", this.state)
    // this.getCoords() DONT DO THIS

    return (
      <div className="map-container">
        <Map
          // className="map-container"
          google={this.props.google}
          onClick={this.onMapClick}
          style={{
            width: "90vw",
            height: "50vh",
            position: "relative",
            margin: "auto"
          }}
          initialCenter={this.state.center}
          // note that the initialCenter is hardcoded to dallas
          zoom={8}
          //zoom 8 is good for mobile but not desktop
        >
          {[...this.state.markers]}
          {/* <Marker position={{ lat: 32.7767, lng: -96.797 }} /> */}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <div>{this.state.selectedPlace.name}</div>
              <div>{this.state.selectedPlace.address}</div>
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_API_KEY
})(MapContainer)

// export default MapContainer
