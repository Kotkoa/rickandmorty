import axios from "axios"

const ADDCHARACTERS = "ADDCHARACTERS"

const initialState = {
  list: "empty",
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDCHARACTERS":
     return {
       list: action.list,
     }
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
