import "../App.css"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCharacters } from "../store/reducers/rootReducer"

import Head from "./Head"

function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCharacters())
  })

  const { list } = useSelector((state) => state.account)

  return (
    <div className="container">
      <Head title="Header" />
      <div className="body">List : {JSON.stringify(list)}</div>
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
