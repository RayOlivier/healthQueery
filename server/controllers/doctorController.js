module.exports = {
  getDoctors(req, res) {
    const db = req.app.get("db")
    return db.doctors.find().then((user) => {
      res.status(200).json(user)
    })
  },
  getDoctor(req, res) {
    const db = req.app.get("db")
    return db.doctors.find({ doctor_id: req.params.id }).then((user) => {
      res.status(200).json(user)
    })
  }
}
