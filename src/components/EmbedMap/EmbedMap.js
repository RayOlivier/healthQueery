import React, { Component } from "react"
import axios from "axios"

class EmbedMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fullAddress: "",
      showMap: false
    }

    this.renderMap = this.renderMap.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/doctor/${this.props.id}`).then((res) => {
      console.log("res", res)
      //   let { doctor } = res.data[0]
      let newAddress = `${res.data[0].street_address}, ${res.data[0].city}, ${
        res.data[0].state
      }`

      if (
        res.data[0].city !== null &&
        res.data[0].state !== null &&
        res.data[0].street_address !== null
      ) {
        this.setState({ fullAddress: newAddress, showMap: true })
      }
    })
  }

  renderMap() {
    if (this.state.showMap === true) {
      return (
        <>
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=${
              process.env.REACT_APP_MAPS_API_KEY
            }&q=${this.state.fullAddress}`}
          />
          <div className="address-text">{this.state.fullAddress}</div>
        </>
      )
    } else {
      return (
        <div className="no-map">There was an error displaying the map. </div>
      )
    }
  }

  render() {
    return (
      <div className="embed-map">
        {/* <h1>Embed Map</h1> */}
        {this.renderMap()}
      </div>
    )
  }
}

export default EmbedMap
