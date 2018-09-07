import { RECEIVE_COMMENTS } from "../Actions/Comments";

export default function Comments(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...action.comments
      };
    default:
      return state;
  }
}
