import React, { Component } from "react"
import "./App.css"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./ducks/store"

import Nav from "./components/Nav/Nav"

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Nav />
            <h1>App</h1>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
