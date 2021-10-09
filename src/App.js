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
        <Route path="/home" component={() => <Home />} />
      </Switch>
    </Router>
  )
}

export default App
