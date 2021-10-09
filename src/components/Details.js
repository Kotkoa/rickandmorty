import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { setDetails, getRandom, setSelected } from "../store/reducers/rootReducer"

function Details() {
  const dispatch = useDispatch()
  const history = useHistory()

  const persDetail = useSelector((store) => store.account.details)
  const select = useSelector((state) => state.account.select)
  const episodeTabs = useSelector((store) => store.account.details.episode) || []
  const interest = useSelector((state) => state.account.interest)

  const ifoMap = ["gender", "origin", "type"]

  const randomInt = () => {
    const min = 1
    const max = 671
    return Math.floor(Math.random() * (max - min) + min)
  }

  const randomCharacterArr = [randomInt(),randomInt(),randomInt()]

  useEffect(() => {
    dispatch(getRandom(randomCharacterArr))
  }, [])


  const pathinfo =
    "M6 0.6875C2.79007 0.6875 0.1875 3.29101 0.1875 6.5C0.1875 9.71087 2.79007 12.3125 6 12.3125C9.20993 12.3125 11.8125 9.71087 11.8125 6.5C11.8125 3.29101 9.20993 0.6875 6 0.6875ZM6 3.26562C6.54366 3.26562 6.98438 3.70634 6.98438 4.25C6.98438 4.79366 6.54366 5.23438 6 5.23438C5.45634 5.23438 5.01562 4.79366 5.01562 4.25C5.01562 3.70634 5.45634 3.26562 6 3.26562ZM7.3125 9.21875C7.3125 9.37407 7.18657 9.5 7.03125 9.5H4.96875C4.81343 9.5 4.6875 9.37407 4.6875 9.21875V8.65625C4.6875 8.50093 4.81343 8.375 4.96875 8.375H5.25V6.875H4.96875C4.81343 6.875 4.6875 6.74907 4.6875 6.59375V6.03125C4.6875 5.87593 4.81343 5.75 4.96875 5.75H6.46875C6.62407 5.75 6.75 5.87593 6.75 6.03125V8.375H7.03125C7.18657 8.375 7.3125 8.50093 7.3125 8.65625V9.21875Z"

  const pathinfostar = "M8.10313 0.625785L6.06251 5.28047L1.49688 6.0293C0.678132 6.1629 0.350007 7.29844 0.943757 7.94883L4.24688 11.5699L3.46563 16.6852C3.32501 17.6098 4.19063 18.3024 4.91563 17.8699L9.00001 15.4547L13.0844 17.8699C13.8094 18.2988 14.675 17.6098 14.5344 16.6852L13.7531 11.5699L17.0563 7.94883C17.65 7.29844 17.3219 6.1629 16.5031 6.0293L11.9375 5.28047L9.89688 0.625785C9.53126 -0.203903 8.47188 -0.21445 8.10313 0.625785Z"
  const pathclothet = "M15 0.46875C6.97266 0.46875 0.46875 6.97266 0.46875 15C0.46875 23.0273 6.97266 29.5312 15 29.5312C23.0273 29.5312 29.5312 23.0273 29.5312 15C29.5312 6.97266 23.0273 0.46875 15 0.46875ZM22.125 18.8145C22.4004 19.0898 22.4004 19.5352 22.125 19.8105L19.8047 22.125C19.5293 22.4004 19.084 22.4004 18.8086 22.125L15 18.2812L11.1855 22.125C10.9102 22.4004 10.4648 22.4004 10.1895 22.125L7.875 19.8047C7.59961 19.5293 7.59961 19.084 7.875 18.8086L11.7188 15L7.875 11.1855C7.59961 10.9102 7.59961 10.4648 7.875 10.1895L10.1953 7.86914C10.4707 7.59375 10.916 7.59375 11.1914 7.86914L15 11.7188L18.8145 7.875C19.0898 7.59961 19.5352 7.59961 19.8105 7.875L22.1309 10.1953C22.4062 10.4707 22.4062 10.916 22.1309 11.1914L18.2812 15L22.125 18.8145Z"


  return (
    <div className="detailsLayer">
      <div className="containerDetails">
        <div className="infoPrimary">
          <div className="bgImg">
            <div className="overlay">
              <div
                className="closet"
                type="button"
                onClick={() => history.goBack()}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={pathclothet} fill="white" />
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
                <div className="starposition"></div>
              </div>
              <div className="infoStar">
                <svg
                  className="infoStarImg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d={pathinfostar}
                    fill={
                      +select.filter((it) => it === persDetail.id).join() ===
                      persDetail.id
                        ? "#F2994A"
                        : "#828282"
                    }
                  />
                </svg>
              </div>
              <div className="infoText">
                <div className="status ">
                  {(persDetail.status || "").toUpperCase()}
                </div>
                <div className="name">{persDetail.name}</div>
                <div className="species">
                  {(persDetail.species || "").toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="informacion">
          <div className="textStyle">Información</div>
          <div className="tabs">
            <div className="infoTab" key="info-gender">
              <div className="titleInfo">
                <div className="ifoSvg">
                  <svg
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={pathinfo} fill="#828282" />
                  </svg>
                </div>
                <div className="infoTabText">
                  Gender:
                </div>
              </div>
              <div className="infoTabTextDetails">{persDetail.gender}</div>
            </div>
            <div className="infoTab" key="info-origin">
              <div className="titleInfo">
                <div className="ifoSvg">
                  <svg
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={pathinfo} fill="#828282" />
                  </svg>
                </div>
                <div className="infoTabText">
                  Origin:
                </div>
              </div>
              <div className="infoTabTextDetails">{JSON.stringify(persDetail.origin.name)}</div>
            </div>
            <div className="infoTab" key="info-type">
              <div className="titleInfo">
                <div className="ifoSvg">
                  <svg
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={pathinfo} fill="#828282" />
                  </svg>
                </div>
                <div className="infoTabText">
                  Type:
                </div>
              </div>
              <div className="infoTabTextDetails">{persDetail.type}</div>
            </div>
          </div>
          <div className="borderLine"></div>
        </div>
        <div className="episodes">
          <div className="textStyle">Episodios</div>
          <div className="episodeTabs">
            {episodeTabs.map((it, id) => {
              return (
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
            {interest.map((char, iden) => {
              return (
                <div className="cardBorder" key={`${iden}`}>
                  <div className="charImage">
                    <img className="charImg" alt={char.name} src={char.image} />
                    <div
                      className="starButton"
                      key="setSelected"
                      type="button"
                      onClick={() => {
                        dispatch(setSelected(char.id))
                      }}
                    >
                      <div className="star">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M8.10313 0.625785L6.06251 5.28047L1.49688 6.0293C0.678132 6.1629 0.350007 7.29844 0.943757 7.94883L4.24688 11.5699L3.46563 16.6852C3.32501 17.6098 4.19063 18.3024 4.91563 17.8699L9.00001 15.4547L13.0844 17.8699C13.8094 18.2988 14.675 17.6098 14.5344 16.6852L13.7531 11.5699L17.0563 7.94883C17.65 7.29844 17.3219 6.1629 16.5031 6.0293L11.9375 5.28047L9.89688 0.625785C9.53126 -0.203903 8.47188 -0.21445 8.10313 0.625785Z"
                            fill={
                              +select.filter((it) => it === char.id).join() ===
                              char.id
                                ? "#F2994A"
                                : "#828282"
                            }
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div
                    className="charDetails"
                    type="button"
                    onClick={() => dispatch(setDetails(char.id))}
                  >
                    <div className="charStatus">
                      <div
                        className={
                          char.status === "Alive"
                            ? "sphereStatus"
                            : "sphereStatusred"
                        }
                      ></div>
                      <div className="textStatus">
                        {char.status} - {char.species}
                      </div>
                    </div>
                    <div className="charName">{char.name}</div>
                    <div className="lastLocation">
                      <div className="textLocation">Last known location:</div>
                      {char.location.name}
                    </div>
                    <div className="charFirstseen">
                      <div className="textLocation">First seen in:</div>
                      {char.episode}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="compartir">
          <div className="compButtn">
            <div className="continuar">Compartir personaje</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
