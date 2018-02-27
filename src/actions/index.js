import * as API from '../utils/api'
import * as type from '../actions/actions_types'

export function loadingData(isLoading) {
  return {
	type: type.DATA_LOADING, 
	isLoading
  }
}

export const loadCategories = () => dispatch => {
    dispatch(loadingData(true))
    return API.getCategories().then((categories) => {
      dispatch({type: type.CATEGORIES_LOADED, categories})
      dispatch(loadingData(false))
    })
}

export function sortBy(sortBy) {
    return {
	  type: type.SORT_POSTS,
	  sortBy
	}
}

export const loadCategoryPost = (category) => dispatch => {
    dispatch(loadingData(true))
    return API.getCategoryPosts(category).then((posts) => {
      dispatch({type: type.LOAD_POST_BY_CATEGORY, posts})
      dispatch({type: type.SHOW_CATEGORY_POST, category})
      dispatch(loadingData(false))
    })
}

export const loadAllPosts = () => dispatch => {
    dispatch(loadingData(true))
    return API.getPosts().then((posts) => {
      dispatch({type: type.LOAD_POST, posts})
      dispatch(loadingData(false))
    })
}

export function addPost(post) {
  return {
	type: type.ADD_POST, 
	post
 }
}

export function updatePost(post) {
  return {
	type:type.UPDATE_POST,
	post
  }
}

export const votePost = (id, voteFor) => dispatch => {
    dispatch(loadingData(true))
    return API.votePost(id, voteFor).then((post) => {
      dispatch({type: type.VOTE_POST, post})
      dispatch(loadingData(false))
    })
}

export const deletePost = (postId) => dispatch => {
    dispatch(loadingData(true))
    return API.deletePost(postId).then((post) => {
      dispatch({type: type.DELETE_POST, post})
      dispatch(loadingData(false))
    })
}


export const loadPostComments = (postId) => dispatch => {
    dispatch(loadingData(true))
    return API.getComments(postId).then((comments) => {
      dispatch({type: type.LOAD_POST_COMMENT, comments})
      dispatch(loadingData(false))
    })
}

export function addComment(comment) {
  return {
	type: type.ADD_COMMENT,
	comment
  }
}

export function updateComment(comment) {
  return {
	type: type.UPDATE_COMMENT,
    comment}
}

export function commentDeleted(comment) {
  return {
	type: type.DELETE_COMMENT,
	comment}
}

export function displayCommentForm(comment) {
  return {
	type: type.DISPLAY_FORM,
	comment}
}

export function hideCommentForm() {
  return {
	type: type.HIDE_FORM
  }
}

export const voteComment = (id, voteFor) => dispatch => {
    dispatch(loadingData(true))
    return API.voteComment(id, voteFor).then((comment) => {
      dispatch({type: type.VOTE_COMMENT, comment})
      dispatch(loadingData(false))
    })
}

export const deleteComment = (commentId) => dispatch => {
    dispatch(loadingData(true))
    return API.deleteComment(commentId).then((comment) => {
      dispatch({type: type.DELETE_COMMENT, comment})
      dispatch(loadingData(false))
    })
}


