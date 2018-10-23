import React, { Component } from "react"
import "./App.scss"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./ducks/store"

import Nav from "./components/Nav/Nav"
import routes from "./routes"
import Footer from "./components/Footer/Footer"

import { library } from "@fortawesome/fontawesome-svg-core"

import { fas } from "@fortawesome/free-solid-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"

library.add(fas, far)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Nav />

            <div id="nav-pusher" />
            {/* all nav-pusher does is allow the nav to be fixed without covering anything... its height needs to equal nav-top height */}
            {routes}
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
