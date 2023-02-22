import { MOST_POPULAR_USER, REMOVE_MOST_POPULAR_USER } from "../actions/type";

export default function userActionReducer(state = {}, action) {
  switch (action.type) {
    case MOST_POPULAR_USER:

      return { ...state , popularUsers:action.payload};

    case REMOVE_MOST_POPULAR_USER:

      return { ...state, popularUsers: action.payload };
    
    default:
      return state;
  }
}
