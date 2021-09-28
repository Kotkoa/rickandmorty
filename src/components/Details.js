import React from "react"
import { useSelector } from "react-redux"

function Details() {
  const hideDisplay = useSelector((store) => store.account.details)
  return (
    <div
      className={`${
        hideDisplay === "hideDetails" ? "hideWindow" : "detailsLayer"
      }`}
    >
      <div className="containerDetails">
        <div className="infoPrimary">
          <div className="bgImg">
            <div className="overlay">
              <div className="closet">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 0.46875C6.97266 0.46875 0.46875 6.97266 0.46875 15C0.46875 23.0273 6.97266 29.5312 15 29.5312C23.0273 29.5312 29.5312 23.0273 29.5312 15C29.5312 6.97266 23.0273 0.46875 15 0.46875ZM22.125 18.8145C22.4004 19.0898 22.4004 19.5352 22.125 19.8105L19.8047 22.125C19.5293 22.4004 19.084 22.4004 18.8086 22.125L15 18.2812L11.1855 22.125C10.9102 22.4004 10.4648 22.4004 10.1895 22.125L7.875 19.8047C7.59961 19.5293 7.59961 19.084 7.875 18.8086L11.7188 15L7.875 11.1855C7.59961 10.9102 7.59961 10.4648 7.875 10.1895L10.1953 7.86914C10.4707 7.59375 10.916 7.59375 11.1914 7.86914L15 11.7188L18.8145 7.875C19.0898 7.59961 19.5352 7.59961 19.8105 7.875L22.1309 10.1953C22.4062 10.4707 22.4062 10.916 22.1309 11.1914L18.2812 15L22.125 18.8145Z"
                    fill="white"
                  />
                </svg>{" "}
              </div>
            </div>
            <div className="infoBasic">
              <div className="infoImg">
                <img
                  className="charIm"
                  alt="character"
                  src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                />
              </div>
              <div className="infoText">
                <div className="status ">ALIVE</div>
                <div className="name">Beth Smith</div>
                <div className="species">HUMAN</div>
              </div>
            </div>
          </div>
        </div>
        <div className="informacion">
          <div className="textStyle">Información</div>
        </div>
        <div className="episodes">
          <div className="textStyle">Episodios</div>
        </div>
        <div className="personajes">
          <div className="textStyle">Personajes interesantes</div>
        </div>
      </div>
    </div>
  )
}

export default Details
