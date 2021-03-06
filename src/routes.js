import React from "react"
import { Switch, Route } from "react-router-dom"
import Home from "./views/Home/Home"
import Profile from "./views/Profile/Profile"
import About from "./views/Home/About/About"
// import FAQ from "./views/Home/FAQ/FAQ"
// import Contact from "./views/Home/Contact/Contact"
import Favorites from "./views/Favorites/Favorites"
import Admin from "./views/Admin/Admin"
import Search from "./views/Search/Search"
import Doctor from "./views/Doctor/Doctor"
import Submit from "./views/Submit/Submit"

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/profile" component={Profile} />
    <Route path="/about" component={About} />
    {/* <Route path="/FAQ" component={FAQ} /> */}
    {/* <Route path="/contact" component={Contact} /> */}
    <Route path="/favorites" component={Favorites} />
    <Route path="/search" component={Search} />
    <Route path="/doctor/:id" component={Doctor} />
    <Route path="/admin" component={Admin} />
    <Route path="/submit" component={Submit} />
    {/* <Route path="/unauthorized" render={() => <h1>404 Not Found</h1>} /> */}
    <Route path="*" render={() => <h1>404 Not Found</h1>} />
  </Switch>
)
