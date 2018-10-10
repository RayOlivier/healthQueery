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
  createUser(req, res) {
    const db = req.app.get("db")
  },
  editUser(req, res) {
    const db = req.app.get("db")
  },
  getFavorites(req, res) {
    const db = req.app.get("db")
    db.favorites
      .find({ user_id: req.params.user_id })
      .then((favs) => {
        res.status(200).json(favs)
      })
      .catch(console.log)
  },
  addFavorite(req, res) {
    const db = req.app.get("db")
    // console.log("req: ", req)
    db.addFavorite([req.params.doc_id, req.body.user_id])
      .then((favs) => {
        // console.log(favs)
        res.status(200).json(favs)
      })
      .catch(console.log)
  },
  deleteFavorite(req, res) {
    const db = req.app.get("db")
    db.deleteFavorite([req.params.doc_id, req.body.user_id])
      .then(() => {
        res.sendStatus(200)
      })
      .catch(console.log)
  }
}
