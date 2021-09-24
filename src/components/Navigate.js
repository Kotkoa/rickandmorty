import "../App.css"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setBase } from "../store/reducers/rootReducer"

const listButtn = ["All", "Unknown", "Female", "Male", "Genderless"]

function Navigate() {
  const dispatch = useDispatch()
  const base = useSelector((store) => store.account.base)

  return (
    <div className="navigate">
      {listButtn.map((it, id, arr) => {
        return (
          <button
            key={it}
            className={`${
              base === it ? "buttnHover" : "buttn"
            }`}
            type="button"
            onClick={() => {
              dispatch(setBase(it))
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
