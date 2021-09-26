import "../App.css"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setBase, getChar } from "../store/reducers/rootReducer"

const listButtn = ["All", "Unknown", "Female", "Male", "Genderless"]
const listGetUrls = [
  "/character",
  "/character/?gender=unknown",
  "/character/?gender=female",
  "/character/?gender=male",
  "/character/?gender=genderless"
]

function Navigate() {
  const dispatch = useDispatch()
  const base = useSelector((store) => store.account.base)

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
