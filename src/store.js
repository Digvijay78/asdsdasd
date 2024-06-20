import {combineReducers, createStore} from 'redux'

import accountReducer from './accounts/accountSlice'
import customerReducer from './customers/customerSlice'

const rootReducer = combineReducers ({
  account : accountReducer,
  customer : customerReducer,
})

const store = createStore(rootReducer)

export default store;
  