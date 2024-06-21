import {applyMiddleware, combineReducers, createStore} from 'redux'
import {configureStore} from "@reduxjs/toolkit"
import {composeWithDevTools} from "redux-devtools-extension"

import accountReducer from './accounts/accountSlice'
import customerReducer from './customers/customerSlice'
import {thunk} from "redux-thunk"

const rootReducer = combineReducers ({
  account : accountReducer,
  customer : customerReducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;
  