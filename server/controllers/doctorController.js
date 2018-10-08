module.exports = {
  getDoctors(req, res) {
    const db = req.app.get("db")
    return db.getDoctors().then((user) => {
      res.status(200).json(user)
    })
  },
  getDoctor(req, res) {
    const db = req.app.get("db")
    return db.doctors.find({ doctor_id: req.params.id }).then((user) => {
      res.status(200).json(user)
    })
  },
  getSpecialties(req, res) {
    const db = req.app.get("db")
    return db.getSpecialties([req.params.id]).then((specialties) => {
      res.status(200).json(specialties)
    })
  },
  getDemographics(req, res) {
    const db = req.app.get("db")
    return db.getDemographics([req.params.id]).then((demos) => {
      res.status(200).json(demos)
    })
  }
}
