import "../App.css"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setBase } from "../store/reducers/rootReducer"
import { Link, useHistory, useRouteMatch } from "react-router-dom"

const listButtn = ["All", "Unknown", "Female", "Male", "Genderless"]
const listGetUrls = [
  "",
  "?gender=unknown",
  "?gender=female",
  "?gender=male",
  "?gender=genderless",
]

function Head() {
  const dispatch = useDispatch()
  const history = useHistory()
  let { path } = useRouteMatch()


  const base = useSelector((store) => store.account.button)
  const select = useSelector((state) => state.account.select)

  const doAfter = (vol) => {
    history.push(`/home?name=${vol}`)
  }
  return (
    <div className="header">
      <div className="header_background">
        <div className="header_overlay">
          <div className="logo_rickmorty"></div>
          <div className="search_block">
            <input
              type="text"
              className="search_input"
              placeholder="Buscar personaje..."
              onKeyPress={(e) =>
                e.key === "Enter" ? doAfter(e.target.value) : null
              }
            />
            <svg
              className="search_icon"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.8072 26.3362L20.7529 19.2819C20.6271 19.1561 20.4631 19.0905 20.2881 19.0905H19.7248C21.6005 17.0617 22.7489 14.3548 22.7489 11.3744C22.7489 5.09116 17.6577 0 11.3744 0C5.09116 0 0 5.09116 0 11.3744C0 17.6577 5.09116 22.7489 11.3744 22.7489C14.3548 22.7489 17.0617 21.6005 19.0905 19.7303V20.2881C19.0905 20.4631 19.1616 20.6271 19.2819 20.7529L26.3362 27.8072C26.5932 28.0643 27.0088 28.0643 27.2659 27.8072L27.8072 27.2659C28.0643 27.0088 28.0643 26.5932 27.8072 26.3362ZM11.3744 20.999C6.05361 20.999 1.74991 16.6953 1.74991 11.3744C1.74991 6.05361 6.05361 1.74991 11.3744 1.74991C16.6953 1.74991 20.999 6.05361 20.999 11.3744C20.999 16.6953 16.6953 20.999 11.3744 20.999Z"
                fill="#F2F2F2"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="navigate">
        {listButtn.map((it, id) => {
          return (
            <Link to={`/home${listGetUrls[id]}`}>
              <button
                key={it}
                className={`${base === it ? "buttnHover" : "buttn"}`}
                type="button"
                onClick={() => {
                  dispatch(setBase(it))
                }}
              >
                {it}
              </button>
            </Link>
          )
        })}
      </div>
      <div className="favoriteButtonback">
        <div className="favoriteButton">
          <div className="favoText">Mostrar favoritos:</div>
          {/* <Link to="/favorite"> */}
          <button
            key="favorite"
            className="favoritOff"
            type="button"
            onClick={() => {
              if (select.length >= 1) {
                history.push(`/favorite/${select}`)
                // dispatch(getSele(select))
                dispatch(setBase("Favorite"))
              }
            }}
          >
            <div className="round">
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
                    fill={`${select[0] === undefined ? "#828282" : "#F2994A"}`}
                  />
                </svg>
              </div>
            </div>
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  )
}

export default Head
