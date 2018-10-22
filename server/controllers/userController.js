module.exports = {
  getUserById(req, res) {
    const db = req.app.get("db")
    return db.users
      .find({ user_id: req.params.id })
      .then((user) => {
        res.status(200).json(user)
      })
      .catch(console.log)
  },
  getUserByEmail(req, res) {
    const db = req.app.get("db")
    return db.users
      .find({ email: req.params.email })
      .then((user) => {
        res.status(200).json(user)
      })
      .catch(console.log)
  },
  editUser(req, res) {
    const db = req.app.get("db")
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
  }
}
