import { getInitialData } from "../utils/FuncAPI";
import { receivePosts } from "./Posts";
import { receiveComments } from "./Comments";

export function handleInitialData() {
  return dispatch => {
    getInitialData().then(({ posts, comments }) => {
      dispatch(receivePosts(posts));
      dispatch(receiveComments(comments));
    });
  };
}
