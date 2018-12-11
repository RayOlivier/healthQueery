require("dotenv").config();
const path = require("path");

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { json } = require("body-parser");
// var cors = require("cors")

const massive = require("massive");

const doctorController = require("./controllers/doctorController");
const userController = require("./controllers/userController");
const reviewController = require("./controllers/reviewController");
const adminController = require("./controllers/adminController");

const strategy = require("./strategy");

const app = express();

app.use(json());

massive(process.env.CONNECTION_STRING).then((dbInstance) => {
  app.set("db", dbInstance);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 604800
    }
  })
);

app.use(express.static(`${__dirname}/../build`));

app.use(passport.initialize());
app.use(passport.session()); //this has to been done after session so that session exists
passport.use(strategy);

passport.serializeUser((user, done) => {
  //this creates the user object
  console.log("USER: ", user);

  const db = app.get("db");
  db.getUserByEmail([user.emails[0].value])
    .then((response) => {
      console.log("response", response);
      if (!response[0]) {
        console.log("no response");
        db.addUserByEmail([user.emails[0].value])
          .then((res) => done(null, res[0]))
          .catch(console.log);
      } else {
        console.log("AFTER ELSE");
        return done(null, response);
      }
    })
    .catch(console.log);
});
passport.deserializeUser((user, done) => {
  // console.log(user)
  done(null, user);
});

function isUser(req, res, next) {
  if (!req.user) {
    console.log("req.user", req.user);
    res.sendStatus(401); //if not a user, give 401 error
  } else {
    next();
  }
}

app.get(
  "/login",
  passport.authenticate("auth0", {
    // successRedirect: `${process.env.REACT_APP_URL}`,
    successRedirect: `/`,
    failureRedirect: "/fail"
  })
);

app.get("/api/profile", isUser, (req, res) => {
  //this just sends you to the json file with your user info from auth0
  console.log("INSIDE app.get profile");
  res.status(200).send(req.user);
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect(`${process.env.REACT_APP_URL}/`);
  });
});

//ADMIN
app.post("/api/doctor", adminController.addDoctor);
app.put("/api/doctor/:id", adminController.editDoctor);
app.delete(
  "/api/clearDocSpecialties/:doctor_id",
  adminController.clearDocSpecialties
);
app.delete(
  "/api/clearDocDemographics/:doctor_id",
  adminController.clearDocDemographics
);
app.post("/api/addSpecialty/:doctor_id", adminController.addSpecialty);
app.post("/api/addDemographic/:doctor_id", adminController.addDemographic);

//DOCTOR
app.get("/api/doctors", doctorController.getDoctors); //done
app.get("/api/doctor/:id", doctorController.getDoctor); //done
app.get("/api/specialties/:id", doctorController.getSpecialties); //done
app.get("/api/demographics/:id", doctorController.getDemographics); //done
app.get("/api/allSpecialties", doctorController.getAllSpecialties);
app.get("/api/allDemographics", doctorController.getAllDemographics);

//USER
app.get("/api/user/:id", userController.getUserById); //done
// app.get("/api/user/:email", userController.getUserByEmail) //done
app.put("/api/user/:id", userController.editUser);
//FAVORITES
app.get("/api/favorites/:user_id", userController.getFavorites); //done
app.post("/api/favorite/:doc_id", userController.addFavorite); //done
app.delete("/api/favorite/:doc_id", userController.deleteFavorite); //done

//SUBMISSIONS
app.post("/api/submission", userController.addSubmission);

//REVIEWS
app.get("/api/reviews/:doc_id", reviewController.getReviews); //done
app.post("/api/review/doctor/:doc_id", reviewController.postReview); //done
app.put("/api/review/:id", reviewController.editReview);
app.delete("/api/review/:id", reviewController.deleteReview); //done
app.get("/api/rating/:id", reviewController.getAverageRating);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
const port = 3001;
app.listen(port, () => {
  console.log(`HQ Server listening on port ${port}`);
});
