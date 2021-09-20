import { READ_POSTS, ADD_POST } from "../actions/type";

export default function postReducer(state = [], action) {
  switch (action.type) {
    case READ_POSTS:
      return { ...state, posts: action.payload };
    case "READ_POSTS_SUCCESS":
      return state;
    case "READ_POST_ERROR":
      return state;
    case ADD_POST:
      return state;
    default:
      return state;
  }
}
