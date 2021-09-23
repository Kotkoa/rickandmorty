import React from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Welcome from "./Welcome.js"
import Home from "./Home.js"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Welcome />} />
        <Route exact path="/home" component={() => <Home />} />
      </Switch>
    </Router>
  )
}

export default App
