import * as API from '../utils/api'

export const DATA_LOADING = 'DATA_LOADING'
export const SORT_POSTS = 'SORT_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const LOAD_POST = 'LOAD_POST'
export const CATEGORIES_LOADED = 'CATEGORIES_LOADED'
export const LOAD_POST_BY_CATEGORY = 'LOAD_POST_BY_CATEGORY'
export const LOAD_POST_COMMENT = 'LOAD_POST_COMMENT'
export const SHOW_CATEGORY_POST = 'SHOW_CATEGORY_POST'

export const VOTE_COMMENT = 'VOTE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const DISPLAY_FORM = 'DISPLAY_FORM'
export const HIDE_FORM = 'HIDE_FORM'

export function loadingData(isLoading) {
  return {
	type: DATA_LOADING, 
	isLoading
  }
}

export const loadCategories = () => dispatch => {
    dispatch(loadingData(true))
    return API.getCategories().then((categories) => {
      dispatch({type: CATEGORIES_LOADED, categories})
      dispatch(loadingData(false))
    })
}

export function sortBy(sortBy) {
    return {
	  type: SORT_POSTS,
	  sortBy
	}
}

export const loadCategoryPost = (category) => dispatch => {
    dispatch(loadingData(true))
    return API.getCategoryPosts(category).then((posts) => {
      dispatch({type: LOAD_POST_BY_CATEGORY, posts})
      dispatch({type: SHOW_CATEGORY_POST, category})
      dispatch(loadingData(false))
    })
}

export const loadAllPosts = () => dispatch => {
    dispatch(loadingData(true))
    return API.getPosts().then((posts) => {
      dispatch({type: LOAD_POST, posts})
      dispatch(loadingData(false))
    })
}

export function addPost(post) {
  return {
	type: ADD_POST, 
	post
 }
}

export function updatePost(post) {
  return {
	type: UPDATE_POST,
	post
  }
}

export const votePost = (id, voteFor) => dispatch => {
    dispatch(loadingData(true))
    return API.votePost(id, voteFor).then((post) => {
      dispatch({type: VOTE_POST, post})
      dispatch(loadingData(false))
    })
}

export const deletePost = (postId) => dispatch => {
    dispatch(loadingData(true))
    return API.deletePost(postId).then((post) => {
      dispatch({type: DELETE_POST, post})
      dispatch(loadingData(false))
    })
}


export const loadPostComments = (postId) => dispatch => {
    dispatch(loadingData(true))
    return API.getComments(postId).then((comments) => {
      dispatch({type: LOAD_POST_COMMENT, comments})
      dispatch(loadingData(false))
    })
}

export function addComment(comment) {
  return {
	type: ADD_COMMENT,
	comment
  }
}

export function updateComment(comment) {
  return {
	type: UPDATE_COMMENT,
    comment}
}

export function commentDeleted(comment) {
  return {
	type: DELETE_COMMENT,
	comment}
}

export function displayCommentForm(comment) {
  return {
	type: DISPLAY_FORM,
	comment}
}

export function hideCommentForm() {
  return {
	type: HIDE_FORM
  }
}

export const voteComment = (id, voteFor) => dispatch => {
    dispatch(loadingData(true))
    return API.voteComment(id, voteFor).then((comment) => {
      dispatch({type: VOTE_COMMENT, comment})
      dispatch(loadingData(false))
    })
}

export const deleteComment = (commentId) => dispatch => {
    dispatch(loadingData(true))
    return API.deleteComment(commentId).then((comment) => {
      dispatch({type: DELETE_COMMENT, comment})
      dispatch(loadingData(false))
    })
}


