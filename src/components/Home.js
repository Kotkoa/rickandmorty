import "../App.css"
import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import Head from "./Head"
import Charcard from "./Charcard"
import Ohno from "./Ohno"
import Details from "./Details"

function Home() {
  return (
    <Router>
      <div className="container">
        <Head title="header" />
        <div className="body">
          <Switch>
            <Route exact path="/model">
              <Details />
              <Charcard />
            </Route>
            <Route exact path="/home">
              <Charcard />
            </Route>
            <Route path="/home/:any">
              <Charcard />
            </Route>
            <Route exact path="/favorite">
              <Charcard />
            </Route>
            <Route path="/empty">
              <Ohno />
            </Route>
          </Switch>
        </div>
        <div className="footer">
          <div className="horizontal">
            <div className="overlay">
              <div className="suazo"></div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default Home
