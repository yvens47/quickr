import {
  GET_USER,
  IS_LOGIN,
  IS_LOGIN_ERROR,
  SIGN_UP_USER,
  SIGN_UP_USER_ERROR,
  SIGN_OUT_USER,
  SUGGESTED_FRIENDS,
  SUGGESTED_FRIENDS_ERROR,
  CHANGE_PROFILE,
  MOST_POPULAR_USER,
  GET_USER_POSTS,
  GET_USER_POSTS_ERROR,
  BOOKMARK
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
      return { ...state, user: action.payload, loggedIn: true };
    case SIGN_UP_USER_ERROR:
      return { ...state, error: action.payload, loggedIn: false };
    case SIGN_OUT_USER:
      return { ...state, user: action.payload, loggedIn: false };

    case SUGGESTED_FRIENDS:
      return { ...state, suggestedFriends: action.payload };

    case GET_USER_POSTS:
      alert("dispatch")
      return { ...state, suggestedFriends: action.payload };
    case GET_USER_POSTS_ERROR:
      return { ...state, suggestedFriends: action.payload , user:"posts"};
      

    case SUGGESTED_FRIENDS_ERROR:
      return { ...state };

    case BOOKMARK:
      console.log(action)
      return state;


    default:
      return state;
  }
}
