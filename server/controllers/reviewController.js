module.exports = {
  getReviews(req, res) {
    //gets reviews for one doctor
    const db = req.app.get("db")
    return db.reviews
      .find({ doctor_id: req.params.doc_id })
      .then((reviews) => {
        res.status(200).json(reviews)
      })
      .catch(console.log)
  },
  postReview(req, res) {
    const db = req.app.get("db")
    db.postReview([
      req.body.user_id,
      req.params.doc_id,
      req.body.title,
      req.body.rating,
      req.body.body
    ])
      .then(() => {
        res.sendStatus(200)
      })
      .catch(console.log)
  },
  editReview(req, res) {
    const db = req.app.get("db")
  },
  deleteReview(req, res) {
    const db = req.app.get("db")
    db.deleteReview([req.params.id])
      .then(() => {
        res.sendStatus(200)
      })
      .catch(console.log)
  }
}
