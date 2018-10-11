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
        data.gender
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
        data.practice,
        data.img_url,
        data.website_url,
        data.phone,
        data.nb_inclusive,
        data.email,
        data.gender,
        req.params.id
      ])
      .then(() => {
        res.sendStatus(200)
      })
      .catch(console.log)
  }
}
