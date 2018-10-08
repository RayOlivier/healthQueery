import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

//this component is just for a preview of the doctor that links to their detailed page (Doctor view)
class DoctorCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      img: "",
      specialties: [],
      demographics: []
    }
  }

  componentDidMount() {
    if (this.props.img === null) {
      this.setState({
        img:
          "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
      })
    }

    axios.get(`/api/specialties/${this.props.id}`).then((res) => {
      let specArr = res.data.map((e) => {
        return e.specialty + " "
      })
      this.setState({ specialties: specArr })
    })

    axios.get(`/api/demographics/${this.props.id}`).then((res) => {
      let demoArr = res.data.map((e) => {
        return e.demographic + " "
      })
      this.setState({ demographics: demoArr })
    })
  }

  render() {
    console.log(this.state)

    return (
      <div className="doctor-card">
        <img src={this.state.img} alt="doctor portrait" />
        <div className="right">
          <div>{this.props.name} </div>
          <span>{`${this.props.category} in ${this.props.city}, ${
            this.props.state
          }`}</span>
          <ul>{this.state.specialties}</ul>

          <ul>{this.state.demographics}</ul>
          <Link exact to={`/doctor/${this.props.id}`}>
            <button>More info ></button>
          </Link>
        </div>
      </div>
    )
  }
}

export default DoctorCard
