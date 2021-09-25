import "../App.css"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getCharacters } from "../store/reducers/rootReducer"

import Head from "./Head"
import Charcard from "./Charcard"

function Home() {
  const dispatch = useDispatch()

  // const { list } = useSelector((state) => state.account)

  useEffect(() => {
    dispatch(getCharacters())
  })
  return (
    <div className="container">
      <Head title="header" />
      <div className="body">
        <div className="favorites">
          <p className="favoText">Mostrar favoritos:</p>
          <div class="round">
            <div className="starFav">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M8.10313 0.625785L6.06251 5.28047L1.49688 6.0293C0.678132 6.1629 0.350007 7.29844 0.943757 7.94883L4.24688 11.5699L3.46563 16.6852C3.32501 17.6098 4.19063 18.3024 4.91563 17.8699L9.00001 15.4547L13.0844 17.8699C13.8094 18.2988 14.675 17.6098 14.5344 16.6852L13.7531 11.5699L17.0563 7.94883C17.65 7.29844 17.3219 6.1629 16.5031 6.0293L11.9375 5.28047L9.89688 0.625785C9.53126 -0.203903 8.47188 -0.21445 8.10313 0.625785Z"
                  fill="#828282"
                />
              </svg>
            </div>
          </div>
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
