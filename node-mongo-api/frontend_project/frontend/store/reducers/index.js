import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { postReducer } from "./postReducer";
import { citiesReducer } from "./citiesReducer"
export default combineReducers({
    post: postReducer,
    login: loginReducer,
    citiesReducer: citiesReducer
})