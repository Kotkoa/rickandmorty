import axios from "axios"

const ADD_CHARACTERS = "ADD_CHARACTERS"
const SET_BASE = "SET_BASE"
const ADD_EPINAME = "ADD_EPINAME"

const initialState = {
  base: "",
  list: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHARACTERS:
      return { ...state, list: action.list }
    case SET_BASE:
      return { ...state, base: action.base }
    case ADD_EPINAME: {
      const newList = state.list.map((it, id) =>
        id === action.i ? { ...it, name: action.name } : it
      )
      return {
        ...state,
        list: newList,
      }
    }
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
