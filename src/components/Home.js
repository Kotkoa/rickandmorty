import "../App.css"
import React from "react"

import Head from "./Head"
import Charcard from "./Charcard"
import Selection from "./Selection"

function Home() {
  return (
    <div className="container">
      <Head title="header" />
      <div className="body">
        <Charcard />
        <Selection />
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
