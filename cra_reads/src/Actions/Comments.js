import {
    addCommentToPost,
    voteCommentUp,
    editComment,
    deleteComment,
    voteCommentDown
} from "../utils/API";

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const ADD_COMMENT_TO_POST = "ADD_COMMENT_TO_POST";
export const VOTE_COMMENT_DOWN = "VOTE_COMMENT_DOWN";
export const VOTE_COMMENT_UP = "VOTE_COMMENT_UP";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const DELETE_COMMENT_PARENT_OF_ONE = "DELETE_COMMENT_PARENT_OF_ONE";

export function receiveComments(comments) {
    return {
        type: RECEIVE_COMMENTS,
        comments
    };
}

export function addCommentToPostR(commentObj) {
    return {
        type: ADD_COMMENT_TO_POST,
        commentObj
    };
}

//CALL
export function _addCommentToPost(commentObj) {
    return dispatch => {
        dispatch(addCommentToPostR(commentObj));
        return addCommentToPost(commentObj);
    };
}

export function voteCommentUPR(commentId) {
    return {
        type: VOTE_COMMENT_UP,
        commentId
    };
}

export function _voteCommentUp(commentId) {
    return dispatch => {
        dispatch(voteCommentUPR(commentId));
        return voteCommentUp(commentId);
    };
}

export function voteCommentDOWNR(commentId) {
    return {
        type: VOTE_COMMENT_DOWN,
        commentId
    };
}

export function _voteCommentDown(commentId) {
    return dispatch => {
        dispatch(voteCommentDOWNR(commentId));
        return voteCommentDown(commentId);
    };
}

export function editCommentR(commentId, commentObj) {
    return {
        type: EDIT_COMMENT,
        commentId,
        commentObj
    };
}

export function _editComment(commentId, commentObj) {
    return dispatch => {
        dispatch(editCommentR(commentId, commentObj));
        return editComment(commentId, commentObj);
    };
}
export function deleteCommentR(commentId) {
    return {
        type: DELETE_COMMENT,
        commentId
    };
}
export function _deleteComment(commentId) {
    return dispatch => {
        dispatch(deleteCommentR(commentId));
        return deleteComment(commentId);
    };
}

export function deleteCommentParentOfONE(commentId) {
    return {
        type: DELETE_COMMENT_PARENT_OF_ONE,
        commentId
    };
}

export function deleteCommentParent(postId) {
    return (dispatch, getState) => {
        const { Comments } = getState();
        const ALLCommentIdArray = Object.keys(Comments);
        ALLCommentIdArray.forEach(eachElement => {
            if (Comments[eachElement].parentId === postId) {
                deleteCommentParentOfONE(postId);
            }
        });
        return;
    };
}
