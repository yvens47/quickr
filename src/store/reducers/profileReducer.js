import { GET_USER_PROFILE, CHANGE_PROFILE } from "../actions/type";

export default function profileReducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_PROFILE:
      return { ...state, user: action.payload };
    case CHANGE_PROFILE:
      console.log("line 36 ", action);
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
