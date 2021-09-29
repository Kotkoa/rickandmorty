import axios from "axios"

const ADD_CHARACTERS = "ADD_CHARACTERS"
const SET_BASE = "SET_BASE"
const SET_SHOW = "SET_SHOW"
const SET_FAVORIT = "SET_FAVORIT"
const SET_SELECTED = "SET_SELECTED"
const SET_DETAILS = "SET_DETAILS"
const SET_INTEREST = "SET_INTEREST"

const initialState = {
  button: "",
  bodyShow: "",
  details: "hideDetails",
  list: [],
  favorite: "",
  select: [],
  interest: "",
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHARACTERS:
      return { ...state, list: action.list }
    case SET_BASE:
      return { ...state, button: action.base }
    case SET_SHOW:
      return { ...state, bodyShow: action.show }
    case SET_DETAILS:
      return { ...state, details: action.show }
    case SET_FAVORIT:
      return { ...state, favorite: action.stat }
    case SET_SELECTED:
      return { ...state, select: [...state.select, action.id] }
    case SET_INTEREST:
      return { ...state, interest: action.pers }

    default:
      return state
  }
}

export default reducer

export function getChar(url) {
  return function getFoo(dispatch) {
    axios(`https://rickandmortyapi.com/api${url}`).then(({ data }) => {
      const { results } = data
      axios
        .all(results.map((it) => it.episode[0]).map((epiUrl) => axios(epiUrl)))
        .then((allNamesData) => allNamesData.map(({ data }) => data.name))
        .then((allNamesArr) => {
          const ser = results.map((it, id) => {
            return { ...it, episode: allNamesArr[id] }
          })
          dispatch({ type: ADD_CHARACTERS, list: ser })
        })
    })
  }
}

export function getSele(url) {
  return function getFoo(dispatch) {
    if (url.length > 1) {
      axios(`https://rickandmortyapi.com/api/character/${url}`).then(
        ({ data }) => {
          const results = data
          axios
            .all(
              results.map((it) => it.episode[0]).map((epiUrl) => axios(epiUrl))
            )
            .then((allNamesData) => allNamesData.map(({ data }) => data.name))
            .then((allNamesArr) => {
              const ser = results.map((it, id) => {
                return { ...it, episode: allNamesArr[id] }
              })
              dispatch({ type: ADD_CHARACTERS, list: ser })
            })
        }
      )
    } else {
      axios(`https://rickandmortyapi.com/api/character/${url}`).then(
        ({ data }) => {
          const res = [data]
          axios(res[0].episode[0]).then(({ data }) => {
            const ser = res.map((it) => {
              return { ...it, episode: data.name }
            })
            dispatch({ type: ADD_CHARACTERS, list: ser })
          })
        }
      )
    }
  }
}

export function setInterest(pers) {
  return { type: SET_INTEREST, pers }
}

export function setBase(base) {
  return { type: SET_BASE, base }
}

export function setShow(show) {
  return { type: SET_SHOW, show }
}

export function setDetails(show) {
  if (show === "hideDetails") {
    return function getFoo(dispatch) {
      dispatch({ type: SET_DETAILS, show })
    }
  }
  return function getFoo(dispatch) {
    axios(`https://rickandmortyapi.com/api/character/${show}`).then(
      ({ data }) => {
        const res = data
        axios
          .all(res.episode.map((epiUrl) => axios(epiUrl)))
          .then((allEpisodesData) => allEpisodesData.map((it) => it.data))
          .then((allEpisodes) =>
            dispatch({
              type: SET_DETAILS,
              show: { ...res, episode: allEpisodes },
            })
          )
      }
    )
  }
}

export function getFavoStatus(stat) {
  return { type: SET_FAVORIT, stat }
}

export function setSelected(id) {
  return { type: SET_SELECTED, id }
}
