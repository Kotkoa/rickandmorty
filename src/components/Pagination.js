import { React, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getChar } from "../store/reducers/rootReducer"

function Pagination() {
  const dispatch = useDispatch()

  const info = useSelector((store) => store.account.pages) || {}

  const [counter, setCounter ] = useState(1)

  return (
    <div className="pagination">
      <div className="paginConteiner">
        <button
          className="btn"
          key="prevPage"
          type="button"
          onClick={() => {
            if (info.prev !== null) {
              setCounter(counter - 1)
              dispatch(
                getChar(
                  info.prev.split(
                    "https://rickandmortyapi.com/api/character"
                  )[1]
                )
              )
            }
          }}
        >
          -
        </button>
        <div className="pgNubr">
          {counter} of {info.pages}
        </div>
        <button
          className="btn"
          key="nextPage"
          type="button"
          onClick={() => {
            if (info.next !== null) {
              setCounter(counter + 1)
              dispatch(
                getChar(
                  info.next.split(
                    "https://rickandmortyapi.com/api/character"
                  )[1]
                )
              )
            }
          }}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default Pagination
