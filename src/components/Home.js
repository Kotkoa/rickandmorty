import "../App.css"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCharacters } from "../store/reducers/rootReducer"

import Head from "./Head"
import Charcard from "./Charcard"

function Home() {
  const dispatch = useDispatch()

  const { list } = useSelector((state) => state.account)

  useEffect(() => {
    dispatch(getCharacters())
  })
  return (
    <div className="container">
      <Head title="header" />
      <div className="body">
        <div className="favorites">
          <p className="favoText">Star favorites</p>
        </div>
        <div className="cardContainer">
          <Charcard />
        </div>
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
