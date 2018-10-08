require("dotenv").config()

const express = require("express")
const session = require("express-session")
const passport = require("passport")
const { json } = require("body-parser")

const massive = require("massive")

const doctorController = require("./controllers/doctorController")
const userController = require("./controllers/userController")
const reviewController = require("./controllers/reviewController")

const strategy = require("./strategy")

const app = express()

app.use(json())

massive(process.env.CONNECTION_STRING).then((dbInstance) => {
  app.set("db", dbInstance)
})

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 604800
    }
  })
)

app.use(passport.initialize())
app.use(passport.session()) //this has to been done after session so that session exists
passport.use(strategy)

passport.serializeUser((user, done) => {
  //this creates the user object
  done(null, user)
})
passport.deserializeUser((user, done) => {
  //this attaches (exposes) the user object to req object
  done(null, user)
})

function isUser(req, res, next) {
  if (!req.user) {
    res.sendStatus(401) //if not a user, give 401 error
  } else {
    next()
  }
}

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "/profile", //MIGHT CHANGE TO HOME
    failureRedirect: "/fail"
  })
)

app.get("/profile", isUser, (req, res) => {
  //this just sends you to the json file with your user info from auth0
  res.status(200).send(req.user)
})

//ADD ADMIN REQUIREMENTS FOR SOME OF THESE
app.get("/api/doctors", doctorController.getDoctors) //done
app.get("/api/doctor/:id", doctorController.getDoctor) //done
app.get("/api/specialties/:id", doctorController.getSpecialties) //done
app.get("/api/demographics/:id", doctorController.getDemographics) //done

app.get("/api/user/:id", userController.getUser) //done
app.post("/api/user", userController.createUser)
app.put("/api/user/:id", userController.editUser)

app.get("/api/favorites/:user_id", userController.getFavorites) //done
app.post("/api/favorite/doctor/:doc_id", userController.addFavorite) //done
app.delete("/api/favorite/doctor/:doc_id", userController.deleteFavorite) //done

app.get("/api/reviews/:doc_id", reviewController.getReviews) //done
app.post("/api/review/doctor/:doc_id", reviewController.postReview) //done
app.put("/api/review/:id", reviewController.editReview)
app.delete("/api/review/:id", reviewController.deleteReview) //done

const port = 3001
app.listen(port, () => {
  console.log(`HQ Server listening on port ${port}`)
})
