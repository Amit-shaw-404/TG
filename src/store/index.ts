import { combineReducers } from "redux";
import currentDetailsReducer from "./reducers/currentDetailsReducer";

const reducers=combineReducers({
    currentDetails:currentDetailsReducer
});

export default reducers;