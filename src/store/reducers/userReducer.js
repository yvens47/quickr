import {
  GET_USER,
  IS_LOGIN,
  IS_LOGIN_ERROR,
  SIGN_UP_USER,
  SIGN_OUT_USER
} from "../actions/type";
// const GET_USER = "GET_USER";
// const IS_LOGIN = "IS_LOGGED_IN";
// const IS_LOGIN_ERROR = "IS_LOGGED_IN_ERROR";

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };
    case "GET_USER_ERROR":
      return state;
    // is login
    case IS_LOGIN:
      return { ...state, user: action.payload, loggedIn: true };
    case IS_LOGIN_ERROR:
      return { ...state, user: action.payload, loggedIn: false };

    case SIGN_UP_USER:
      alert("your have signeud");
      return state;
    case SIGN_OUT_USER:
      return { ...state, loggedIn: false };

    default:
      return state;
  }
}
