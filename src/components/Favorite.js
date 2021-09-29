import "../App.css"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setBase, getSele } from "../store/reducers/rootReducer"

function Favorite() {
  const dispatch = useDispatch()
  const select = useSelector((state) => state.account.select)

  return (
    <div className="favoriteButtonback">
      <div className="favoriteButton">
        <button
          key="favorite"
          className="favoritOff"
          type="button"
          onClick={() => {
            if (select.length >= 1) {
              dispatch(getSele(select))
              dispatch(setBase("Favorite"))
            }
          }}
        >
          <div className="favoText">Mostrar favoritos:</div>
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
      </div>
    </div>
  )
}

export default Favorite
