import { combineReducers } from "redux"
import rootReducer from "./rootReducer"

const reducers = combineReducers({
  account: rootReducer,
})

export default reducers
