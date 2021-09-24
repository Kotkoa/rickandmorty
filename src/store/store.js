import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import reducers from './reducers/index.js'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export const store = createStore(
  reducers,
  {},
  composedEnhancer
)
