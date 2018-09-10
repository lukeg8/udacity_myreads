import { getPosts, getCommentsOfPost, getCategories } from "./API";

export async function getInitialData() {
    const categories_response = await getCategories();
    const categories = await categories_response;
    const post_response = await Promise.all([_getPost()]);
    const [posts] = await post_response;
    const postIDArray = Object.keys(posts);
    const comments = await getALLComments(postIDArray);
    return { categories, posts, comments };
}

export async function _getPost() {
    const data = await getPosts();
    const newPostsObj = data.reduce((accumulator, eachElement) => {
        const newaccumulator = {
            ...accumulator,
            [eachElement.id]: {
                ...eachElement
            }
        };
        return newaccumulator;
    }, {});
    return newPostsObj;
}

export async function _getCommenOfPost(postId) {
    const data = await getCommentsOfPost(postId);
    const newCommentObj = data.reduce((accumulator, eachElement) => {
        const newaccumulator = {
            ...accumulator,
            [eachElement.id]: {
                ...eachElement
            }
        };
        return newaccumulator;
    }, {});
    return newCommentObj;
}

export const getALLComments = async postIDArray => {
    const newALLCommentsObj = postIDArray.reduce(
        async (accumulator, eachElement) => {
            const tempaccumulator = await accumulator;
            const eachCommentObj = await _getCommenOfPost(eachElement);
            const newaccumulator = {
                ...tempaccumulator,
                ...eachCommentObj
            };
            return newaccumulator;
        },
        {}
    );
    return newALLCommentsObj;
};
