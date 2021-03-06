import * as APIUtil from '../util/post_api_util';
import * as CommentsUtil from '../util/comment_api_util';

export const RECEIVE_ALL_POSTS = "RECEIVE_ALL_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const REMOVE_POST = "REMOVE_POST";
export const ADD_NEW_POSTS = "ADD_NEW_POSTS";
export const RECEIVE_POST_ERRORS ="RECEIVE_POST_ERRORS";
export const REPLACE_POST = "REPLACE_POST";
export const REPLACE_LIKES = "REPLACE_LIKES";
export const VIEW_POST = "VIEW_POST";

export const receiveAllPosts = (posts) => ({
  type: RECEIVE_ALL_POSTS,
  posts
});

export const addNewPosts = (posts) => ({
  type: ADD_NEW_POSTS,
  posts
});

export const replacePost = post => ({
  type: REPLACE_POST,
  post
});

export const replaceLikes = post => ({
  type: REPLACE_LIKES,
  post
});

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

export const viewPost = post => ({
  type: VIEW_POST,
  post
});

export const removePost = post => ({
  type: REMOVE_POST,
  post
});

export const receivePostErrors = errors => ({
  type: RECEIVE_POST_ERRORS,
  errors
});

export const fetchNewPosts = () => dispatch => (
  APIUtil.allPosts()
  .then(posts => dispatch(receiveAllPosts(posts)))
);

export const fetchUserPosts = (id) => dispatch => (
  APIUtil.getFeed(id)
  .then(posts => dispatch(receiveAllPosts(posts)))
);

export const fetchMorePosts = (page) => dispatch => (
  APIUtil.allPosts(page)
  .then(posts => dispatch(addNewPosts(posts)))
);

export const fetchMoreUserPosts = (id, page) => dispatch => (
  APIUtil.getFeed(id, page)
  .then(posts => dispatch(addNewPosts(posts)))
);

export const createPost = post => dispatch => (
  APIUtil.createPost(post)
  .then(newPost => dispatch(receivePost(newPost)), 
    err => dispatch(receivePostErrors(err.responseJSON)))
);

export const fetchPost = id => dispatch => (
  APIUtil.getPost(id)
  .then(post => dispatch(receivePost(post)))
);

export const viewOnePost = id => dispatch => (
  APIUtil.getPost(id)
  .then(post => dispatch(viewPost(post)))
);



export const updatePost =  post => dispatch => (
  APIUtil.updatePost(post)
  .then(newPost => dispatch(receivePost(newPost)),
    err => dispatch(receivePostErrors(err.responseJSON)))
);

export const deletePost = id => dispatch => (
  APIUtil.deletePost(id)
  .then(newPost => dispatch(removePost(newPost)))
);

export const createComment = comment => dispatch => (
  CommentsUtil.postComment(comment)
  .then(newPost => dispatch(replacePost(newPost)))
);

export const updateComment = comment => dispatch => (
  CommentsUtil.changeComment(comment)
  .then(post => dispatch(replacePost(post)))
);

export const deleteComment = id => dispatch => (
  CommentsUtil.deleteComment(id)
  .then(post => dispatch(replaceLikes(post)))
);

export const toggleLikeOnPost = id => dispatch => (
  APIUtil.toggleLike(id)
  .then(post => dispatch(replaceLikes(post)))
);
