import "../App.css"
import React from "react"

import Head from "./Head"
import Charcard from "./Charcard"
import Ohno from "./Ohno"

function Home() {
  return (
    <div className="container">
      <Head title="header" />
      <div className="body">
        <Charcard />
        <Ohno />
      </div>
      <div className="footer">
        <div className="horizontal">
          <div className="overlay">
            <div className="suazo"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
