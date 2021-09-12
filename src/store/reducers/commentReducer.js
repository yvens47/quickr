import { COMMENTS, ADD_COMMENT_POST } from "../actions/type";

export default function commentReducer(state = [], action) {
  switch (action.type) {
    case COMMENTS:
      return { ...state, comments: action.payload };
    case "READ_POSTS_SUCCESS":
      return state;
    case "READ_POST_ERROR":
      return state;
    case ADD_COMMENT_POST:
      return state;
    default:
      return state;
  }
}
