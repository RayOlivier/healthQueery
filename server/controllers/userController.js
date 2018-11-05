module.exports = {
  getUserById(req, res) {
    const db = req.app.get("db")
    return db.users
      .find({ user_id: req.params.id })
      .then((user) => {
        // req.session.user_id = response[0].user_id

        res.status(200).json(user)
      })
      .catch(console.log)
  },
  getUserByEmail(req, res) {
    const db = req.app.get("db")
    return db.users
      .find({ email: req.params.email })
      .then((user) => {
        // req.session.user_id = response[0].user_id

        res.status(200).json(user)
      })
      .catch(console.log)
  },
  editUser(req, res) {
    const db = req.app.get("db")
    db.editUser([
      req.params.id,
      req.body.username,
      req.body.sexual_orientation,
      req.body.gender
    ])
      .then(() => {
        res.sendStatus(200)
      })
      .catch(console.log)
  },
  getFavorites(req, res) {
    const db = req.app.get("db")
    db.getFavorites([req.params.user_id])
      .then((favs) => {
        res.status(200).json(favs)
      })
      .catch(console.log)
  },
  addFavorite(req, res) {
    const db = req.app.get("db")
    // console.log("req: ", req)
    console.log("req.body.user_id", req.body.user_id)
    db.addFavorite([req.params.doc_id, req.body.user_id])
      .then((favs) => {
        // console.log(favs)
        res.status(200).json(favs)
      })
      .catch(console.log)
  },
  deleteFavorite(req, res) {
    const db = req.app.get("db")
    // console.log("req.params.doc_id", req.params.doc_id)
    // console.log("req.body", req.body)
    db.deleteFavorite([req.params.doc_id, req.body.user])
      .then((favs) => {
        // console.log("supposedly done")
        res.sendStatus(200)
      })
      .catch(console.log)
  },
  addSubmission(req, res) {
    const db = req.app.get("db")
    let { data } = req.body

    db.addSubmission([
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
      .then((response) => {
        res.sendStatus(200)
      })
      .catch(console.log)
  }
}
