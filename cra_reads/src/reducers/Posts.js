import { RECEIVE_POSTS } from "../Actions/Posts";

export default function Posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...action.posts
      };
    default:
      return state;
  }
}
