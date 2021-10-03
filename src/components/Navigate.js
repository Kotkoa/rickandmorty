import "../App.css"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setBase, getChar, setShow } from "../store/reducers/rootReducer"

const listButtn = ["All", "Unknown", "Female", "Male", "Genderless"]
const listGetUrls = [
  "",
  "/?gender=unknown",
  "/?gender=female",
  "/?gender=male",
  "/?gender=genderless"
]

function Navigate() {
  const dispatch = useDispatch()
  const base = useSelector((store) => store.account.button)

  return (
    <div className="navigate">
      {listButtn.map((it, id) => {
        return (
          <button
            key={it}
            className={`${base === it ? "buttnHover" : "buttn"}`}
            type="button"
            onClick={() => {
              dispatch(setBase(it))
              dispatch(setShow("hideFavo"))
              dispatch(getChar(listGetUrls[id]))
            }}
          >
            {it}
          </button>
        )
      })}
    </div>
  )
}

export default Navigate
