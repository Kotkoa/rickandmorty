import React from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import Welcome from "./components/Welcome.js"
import Home from "./components/Home.js"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Welcome />} />
        <Route exact path="/home" component={() => <Home />} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App
