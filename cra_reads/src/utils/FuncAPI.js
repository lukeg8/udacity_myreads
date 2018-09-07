import { getPosts, getCommentsOfPost } from "./API";

export async function getInitialData() {
  const response = await Promise.all([_getPost()]);
  const [posts] = await response;
  const postIDArray = Object.keys(posts);
  const comments = await getALLComments(postIDArray);
  return { posts, comments };
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
