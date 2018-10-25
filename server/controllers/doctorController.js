module.exports = {
  getDoctors(req, res) {
    const db = req.app.get("db")

    if (req.query.keyword) {
      return db
        .getDoctorsByKeyword([`%${req.query.keyword}%`])
        .then((info) => {
          res.status(200).json(info)
        })
        .catch(console.log)
    }

    if (req.query.metroplex) {
      return db
        .getDoctorsByMetroplex([req.query.metroplex])
        .then((info) => {
          res.status(200).json(info)
        })
        .catch(console.log)
    }
    //this returns all docs
    return db
      .getDoctors()
      .then((user) => {
        res.status(200).json(user)
      })
      .catch(console.log)
  },
  getDoctor(req, res) {
    const db = req.app.get("db")
    return db.doctors
      .find({ doctor_id: req.params.id })
      .then((user) => {
        res.status(200).json(user)
      })
      .catch(console.log)
  },
  getSpecialties(req, res) {
    const db = req.app.get("db")
    return db
      .getSpecialties([req.params.id])
      .then((specialties) => {
        res.status(200).json(specialties)
      })
      .catch(console.log)
  },
  getDemographics(req, res) {
    const db = req.app.get("db")
    return db
      .getDemographics([req.params.id])
      .then((demos) => {
        res.status(200).json(demos)
      })
      .catch(console.log)
  },
  getAllSpecialties(req, res) {
    const db = req.app.get("db")
    return db
      .getAllSpecialties()
      .then((specialties) => {
        res.status(200).json(specialties)
      })
      .catch(console.log)
  },
  getAllDemographics(req, res) {
    const db = req.app.get("db")
    return db
      .getAllDemographics()
      .then((demographics) => {
        res.status(200).json(demographics)
      })
      .catch(console.log)
  }
}
