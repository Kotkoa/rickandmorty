import axios from "axios"

const ADD_CHARACTERS = "ADD_CHARACTERS"
const SET_BASE = "SET_BASE"
const SET_SHOW = "SET_SHOW"
const SET_FAVORIT = "SET_FAVORIT"

const initialState = {
  button: "",
  bodyShow: "",
  list: [],
  favorite:""
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHARACTERS:
      return { ...state, list: action.list }
    case SET_BASE:
      return { ...state, button: action.base }
    case SET_SHOW:
      return { ...state, bodyShow: action.show }
    case SET_FAVORIT:
      return { ...state, favorite: action.stat }
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
        .all(
          results.map((it) => it.episode[0]).map((epiUrl) => axios(epiUrl))
        )
        .then((allNamesData) => allNamesData.map(({ data }) => data.name))
        .then((allNamesArr) =>{
          const ser = results.map((it, id) => {
            return { ...it, episode: allNamesArr[id] }
          } )
          dispatch({ type: ADD_CHARACTERS, list: ser })
        })
    })
  }
}

export function setBase(base) {
  return { type: SET_BASE, base }
}

export function setShow(show) {
  return { type: SET_SHOW, show }
}

export function getFavoStatus(stat) {
  return { type: SET_FAVORIT, stat }
}
