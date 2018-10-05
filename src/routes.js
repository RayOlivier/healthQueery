import React from "react"
import { Switch, Router } from "react-router-dom"
import Home from "./views/Home/Home"

export default (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
)
