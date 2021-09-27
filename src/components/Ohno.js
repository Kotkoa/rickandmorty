import React from "react"
import { useSelector } from "react-redux"

function Ohno() {
  const hideDisplay = useSelector((store) => store.account.bodyShow)
  return (
    <div
      className={`${
        hideDisplay === "hideFavo" ? "hideWindow" : "containerOhno"
      }`}
    >
      <div className="textUhoh">Uh-oh!</div>
      <div className="textLost">¡Pareces perdido en tu viaje!</div>
      <div className="removeFilter">
        Eliminar filtros
      </div>
    </div>
  )
}

export default Ohno
