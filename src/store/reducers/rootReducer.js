import axios from "axios"

const ADDCHARACTERS = "ADDCHARACTERS"
const SET_BASE = "SET_BASE"

const initialState = {
  base: "All",
  list: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDCHARACTERS:
      return { ...state, list: action.list }
    case SET_BASE:
      return { ...state, base: action.base }
    default:
      return state
  }
}

export default reducer

export function getCharacters() {
  return function getFoo(dispatch) {
    axios("https://rickandmortyapi.com/api/character").then(({ data }) => {
      // const info = data.info
      const results = data.results
      dispatch({ type: ADDCHARACTERS, list: results })
    })
  }
}

export function setBase(base) {
  return { type: SET_BASE, base }
}

export function getEpisode(link) {
  return axios(link).then((data) => {return data.name})
}
