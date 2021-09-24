import "../App.css"
import React from "react"
import { useSelector } from "react-redux"

function Charcard() {

  const { list } = useSelector((state) => state.account)

  return (
    <div className="charcardContainer">
      {list.map((char) => {
        return (
          <div className="cardBorder">
            <div className="charImage">
              <img className="charImg" alt={char.name} src={char.image} />
            </div>
            <div className="charDetails">
              <div className="charStatus">{char.status}</div>
              <div className="charSpecies">{char.species}</div>
              <div className="charName">{char.name}</div>
              <div className="lastLocation">{char.location.name}</div>
              <div className="charFirstseen">{char.episode}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Charcard
