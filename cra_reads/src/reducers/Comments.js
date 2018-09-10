import {
    RECEIVE_COMMENTS,
    ADD_COMMENT_TO_POST,
    VOTE_COMMENT_DOWN,
    VOTE_COMMENT_UP,
    EDIT_COMMENT,
    DELETE_COMMENT,
    DELETE_COMMENT_PARENT_OF_ONE
} from "../Actions/Comments";

export default function Comments(state = {}, action) {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return {
                ...action.comments
            };
        case ADD_COMMENT_TO_POST:
            return {
                ...state,
                [action.commentObj.id]: {
                    ...action.commentObj
                }
            };
        case VOTE_COMMENT_DOWN:
            return {
                ...state,
                [action.commentId]: {
                    ...state[action.commentId],
                    voteScore: state[action.commentId].voteScore - 1
                }
            };
        case VOTE_COMMENT_UP:
            return {
                ...state,
                [action.commentId]: {
                    ...state[action.commentId],
                    voteScore: state[action.commentId].voteScore + 1
                }
            };
        case EDIT_COMMENT:
            return {
                ...state,
                [action.commentId]: {
                    ...state[action.commentId],
                    timestamp: action.commentObj.timestamp,
                    body: action.commentObj.body
                }
            };
        case DELETE_COMMENT:
            return {
                ...state,
                [action.commentId]: {
                    ...state[action.commentId],
                    deleted: true
                }
            };
        case DELETE_COMMENT_PARENT_OF_ONE:
            return {
                ...state,
                [action.commentId]: {
                    ...state[action.commentId],
                    parentDeleted: true
                }
            };
        default:
            return state;
    }
}
