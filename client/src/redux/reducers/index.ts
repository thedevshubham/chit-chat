import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import chatReducer from "./chatReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  chat: chatReducer,
});

export default rootReducer;
