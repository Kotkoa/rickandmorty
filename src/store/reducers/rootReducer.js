import axios from "axios"

const ADD = "ADD"

const initialState = {
  list: "empty_text",
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return state
    default:
      return state
  }
}

export default reducer

export function getCharacters() {
  return function getFoo(dispatch) {
    axios("https://rickandmortyapi.com/api/character").then(({ data }) => {
      dispatch({ type: ADD, list: data })
    })
  }
}
