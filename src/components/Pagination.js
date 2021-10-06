import { React } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouteMatch, useHistory, useLocation } from "react-router-dom"

import { getChar } from "../store/reducers/rootReducer"

function Pagination() {
  const dispatch = useDispatch()
  let { path, url } = useRouteMatch()
  const location = useLocation()

  const history = useHistory()

  const info = useSelector((store) => store.account.pages)
  const nextPage = info.next
    ? info.next.split("https://rickandmortyapi.com/api/character")[1]
    : ""
  const prevPage = info.prev
    ? info.prev.split("https://rickandmortyapi.com/api/character")[1]
    : ""
  // const pageNum =
    // location.search === "" ? "1" : location.search.match(/\d+/).join("")

  return (
    <div className="pagination">
      <div className={info.pages > 1 ? "paginConteiner" : "hideWindow"}>
        <button
          className="btn"
          key="prevPage"
          type="button"
          onClick={() => {
            if (info.prev !== null) {
              history.push(`${path}${prevPage}`)
              dispatch(getChar(prevPage))
            }
          }}
        >
          prev
        </button>
        <div className="pgNubr">
          {location.search.match(/\d+/) === null
            ? "1"
            : location.search.match(/\d+/).join("")}{" "}
          of {info.pages}
        </div>
        <button
          className="btn"
          key="nextPage"
          type="button"
          onClick={() => {
            if (info.next !== null) {
              history.push(`${url}${nextPage}`)
              dispatch(getChar(nextPage))
            }
          }}
        >
          next
        </button>
      </div>
    </div>
  )
}

export default Pagination
