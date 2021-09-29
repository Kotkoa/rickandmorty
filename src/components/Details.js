import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setDetails } from "../store/reducers/rootReducer"

function Details() {
  const dispatch = useDispatch()
  const persDetail = useSelector((store) => store.account.details)
  const episodeTabs = useSelector((store) => store.account.details.episode) || []
  const pathinfo =
    "M6 0.6875C2.79007 0.6875 0.1875 3.29101 0.1875 6.5C0.1875 9.71087 2.79007 12.3125 6 12.3125C9.20993 12.3125 11.8125 9.71087 11.8125 6.5C11.8125 3.29101 9.20993 0.6875 6 0.6875ZM6 3.26562C6.54366 3.26562 6.98438 3.70634 6.98438 4.25C6.98438 4.79366 6.54366 5.23438 6 5.23438C5.45634 5.23438 5.01562 4.79366 5.01562 4.25C5.01562 3.70634 5.45634 3.26562 6 3.26562ZM7.3125 9.21875C7.3125 9.37407 7.18657 9.5 7.03125 9.5H4.96875C4.81343 9.5 4.6875 9.37407 4.6875 9.21875V8.65625C4.6875 8.50093 4.81343 8.375 4.96875 8.375H5.25V6.875H4.96875C4.81343 6.875 4.6875 6.74907 4.6875 6.59375V6.03125C4.6875 5.87593 4.81343 5.75 4.96875 5.75H6.46875C6.62407 5.75 6.75 5.87593 6.75 6.03125V8.375H7.03125C7.18657 8.375 7.3125 8.50093 7.3125 8.65625V9.21875Z"
  const ifoMap = ["gender", "origin", "type"]


  return (
    <div
      className={`${
        persDetail === "hideDetails" ? "hideWindow" : "detailsLayer"
      }`}
    >
      <div className="containerDetails">
        <div className="infoPrimary">
          <div className="bgImg">
            <div className="overlay">
              <div
                className="closet"
                type="button"
                onClick={() => dispatch(setDetails("hideDetails"))}
              >
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
                </svg>
              </div>
            </div>
            <div className="infoBasic">
              <div className="infoImg">
                <img
                  className="charIm"
                  alt="character"
                  src={`${persDetail.image}`}
                />
              </div>
              <div className="infoText">
                <div className="status ">{persDetail.status}</div>
                <div className="name">{persDetail.name}</div>
                <div className="species">
                  {persDetail.species}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="informacion">
          <div className="textStyle">Información</div>
          <div className="tabs">
            {ifoMap.map((it, id) => {
              return (
                <div className="infoTab" key={`info:${id}`}>
                  <div className="titleInfo">
                    <div className="ifoSvg">
                      <svg
                        width="12"
                        height="13"
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d={`${pathinfo}`} fill="#828282" />
                      </svg>
                    </div>
                    <div className="infoTabText">
                      {it[0].toUpperCase() + it.split("").splice(1).join("")}:
                    </div>
                  </div>
                  <div className="infoTabTextDetails">
                  { typeof persDetail.[it] === "string" ? `${persDetail.[it]}` : `json` }</div>
                  {/* ${JSON.stringify(persDetail.[it].name)} */}
                </div>
              )
            })}
          </div>
          <div className="borderLine"></div>
        </div>
        <div className="episodes">
          <div className="textStyle">Episodios</div>
          <div className="episodeTabs">
            {episodeTabs.map((it, id) => {
              return(
                <div className="infEpisoTab" key={`episode:${id}`}>
                  <div className="epiInfo">
                    <div className="epiName">{it.name}</div>
                    <div className="episode">{it.episode}</div>
                    <div className="epiDate">{it.air_date}</div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="borderLine"></div>
        </div>
        <div className="personajes">
          <div className="textStyle">Personajes interesantes</div>
          <div className="personageTabs">

          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
