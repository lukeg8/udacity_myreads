import {
    RECEIVE_POSTS,
    SET_POST,
    VOTE_POST_UP,
    VOTE_POST_DOWN,
    EDIT_POST,
    DELETE_POST
} from "../Actions/Posts";

export default function Posts(state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return {
                ...action.posts
            };
        case SET_POST:
            return {
                ...state,
                [action.postObj.id]: {
                    ...action.postObj
                }
            };
        case VOTE_POST_UP:
            return {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    voteScore: state[action.postId].voteScore + 1
                }
            };
        case VOTE_POST_DOWN:
            return {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    voteScore: state[action.postId].voteScore - 1
                }
            };
        case EDIT_POST:
            return {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    title: action.editObj.title,
                    body: action.editObj.body
                }
            };
        case DELETE_POST:
            return {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    deleted: true
                }
            };

        default:
            return state;
    }
}
