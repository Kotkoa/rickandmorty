import { createStore } from 'redux'
import reducers from './reducers/index.js'

export const store = createStore(
  reducers,
  {}
)
