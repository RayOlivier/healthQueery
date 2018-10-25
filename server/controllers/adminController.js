module.exports = {
  addDoctor(req, res) {
    const db = req.app.get("db")
    let { data } = req.body
    return db
      .addDoctor([
        data.doctor_name,
        data.category,
        data.street_address,
        data.city,
        data.state,
        data.description,
        data.practice,
        data.img_url,
        data.website_url,
        data.phone,
        data.nb_inclusive,
        data.email,
        data.gender,
        data.metroplex
      ])
      .then((stuff) => {
        res.sendStatus(200)
      })
      .catch(console.log)
  },
  editDoctor(req, res) {
    const db = req.app.get("db")
    let { data } = req.body
    return db
      .editDoctor([
        data.doctor_name,
        data.category,
        data.street_address,
        data.city,
        data.state,
        data.description,
        data.practice_name,
        data.img_url,
        data.website_url,
        data.phone,
        data.nb_inclusive,
        data.email,
        data.gender,
        data.metroplex,
        req.params.id
      ])
      .then(() => {
        res.sendStatus(200)
      })
      .catch(console.log)
  },
  addSpecialty(req, res) {
    const db = req.app.get("db")
    console.log("req.body", req.body)
    db.addSpecialty([req.params.doctor_id, req.body.specialty_id])
      .then(() => {
        res.sendStatus(200)
      })
      .catch(console.log)
  },
  addDemographic(req, res) {
    const db = req.app.get("db")
    console.log("req.body", req.body)

    db.addDemographic([req.params.doctor_id, req.body.demographic_id])
      .then(() => {
        res.sendStatus(200)
      })
      .catch(console.log)
  },
  clearDocSpecialties(req, res) {
    const db = req.app.get("db")

    db.clearDocSpecialties([req.params.doctor_id])
      .then(() => {
        res.sendStatus(200)
      })
      .catch(console.log)
  },
  clearDocDemographics(req, res) {
    const db = req.app.get("db")
    db.clearDocDemographics([req.params.doctor_id])
      .then(() => {
        res.sendStatus(200)
      })
      .catch(console.log)
  }
}
