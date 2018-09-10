import {
    votePostUP,
    votePostDOWN,
    editPost,
    deletePost,
    setPost
} from "../utils/API";
import { deleteCommentParent } from "./Comments";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const SET_POST = "SET_POST";
export const VOTE_POST_UP = "VOTE_POST_UP";
export const VOTE_POST_DOWN = "VOTE_POST_DOWN";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";

export function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    };
}

export function setPostR(postObj) {
    return {
        type: SET_POST,
        postObj
    };
}

//CALL
export function _setPost(postObj) {
    return dispatch => {
        dispatch(setPostR(postObj));
        return setPost(postObj);
    };
}

export function votePostUPR(postId) {
    return {
        type: VOTE_POST_UP,
        postId
    };
}

// CALL
export function _votePostUP(postId) {
    return dispatch => {
        dispatch(votePostUPR(postId));
        return votePostUP(postId);
    };
}

export function votePostDOWNR(postId) {
    return {
        type: VOTE_POST_DOWN,
        postId
    };
}

// CALL
export function _votePostDOWN(postId) {
    return dispatch => {
        dispatch(votePostDOWNR(postId));
        return votePostDOWN(postId);
    };
}

export function editPostR(postId, editObj) {
    return {
        type: EDIT_POST,
        postId,
        editObj
    };
}

export function _editPost(postId, editObj) {
    return dispatch => {
        dispatch(editPostR(postId, editObj));
        return editPost(postId, editObj);
    };
}

export function deletePostR(postId) {
    return {
        type: DELETE_POST,
        postId
    };
}

export function _deletePost(postId) {
    return dispatch => {
        dispatch(deletePostR(postId));
        dispatch(deleteCommentParent(postId));
        return deletePost(postId);
    };
}
