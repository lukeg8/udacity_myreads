import { getInitialData } from "../utils/FuncAPI";
import { receivePosts } from "./Posts";
import { receiveComments } from "./Comments";
import { setCategories } from "./Categories";

export function handleInitialData() {
    return dispatch => {
        return getInitialData().then(({ categories, posts, comments }) => {
            dispatch(setCategories(categories));
            dispatch(receivePosts(posts));
            dispatch(receiveComments(comments));
        });
    };
}
