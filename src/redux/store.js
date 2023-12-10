import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import { reducer as itemReducer } from "./reducer";
import { reducer  as billsReducer } from "../redux/bills/reducer";
const rootReducer=combineReducers({itemReducer,billsReducer})
export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))