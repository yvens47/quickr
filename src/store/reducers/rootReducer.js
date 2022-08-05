import { combineReducers } from "redux";
import postReducer from "./postReducer";


import userReducer from "./userReducer";

import profileReducer from "./profileReducer";

export const rootReducer = combineReducers({
  posts: postReducer,
  user: userReducer,
  profile: profileReducer,

});
