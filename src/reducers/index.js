import * as ACTIONS from '../actions/index'

export function categories(state = [], action) {
  switch (action.type) {
    case ACTIONS.CATEGORIES_LOADED:
      return action.categories
    default:
      return state
  }
}

export function posts(state = {}, action) {
  const { posts, post, type} = action
  switch (type) {
    case ACTIONS.LOAD_POST:
      if(posts) {
        return posts.reduce((obj, p) => {
          obj[p.id] = p
          return obj
        }, {})
      }
      return state
    case ACTIONS.VOTE_POST:
    case ACTIONS.ADD_POST:
    case ACTIONS.UPDATE_POST:
    case ACTIONS.DELETE_POST:
      return {
        ...state,
        [post.id]: post
      }
    default:
      return state
  }
}

export function comments(state = {}, action) {
  const {comments, comment} = action
  switch (action.type) {
    case ACTIONS.LOAD_POST_COMMENT:
      if(comments) {
        return comments.reduce((object, cmt) => {
          object[cmt.id] = cmt
          return object
        }, {})
      }
      return state
    case ACTIONS.VOTE_COMMENT:
    case ACTIONS.ADD_COMMENT:
    case ACTIONS.UPDATE_COMMENT:
      return {
        ...state,
        [comment.id] : comment
      }
    case ACTIONS.DELETE_COMMENT:
      delete state[comment.id]
      return state
    default:
      return state
  }
}

export function filterByCategory(state = '', action) {
  switch (action.type) {
    case ACTIONS.SHOW_CATEGORY_POST:
      return action.category
    default:
      return state
  }
}

export function loadingData(state = false, action) {
  switch (action.type) {
    case ACTIONS.DATA_LOADING:
      return !!action.isLoading
    default:
      return state;
  }
}

export function sortPosts(state = '', action) {
  switch (action.type) {
    case ACTIONS.SORT_POSTS:
      return action.sortBy
    default:
      return state;
  }
}

export function commentModal(state = {}, action) {
  const {comment} = action
  switch (action.type) {
    case ACTIONS.DISPLAY_FORM:
      return {
        comment,
        isOpen: true
      }
    case ACTIONS.HIDE_FORM:
      return {
        isOpen: false
      }
    default:
      return state;
  }
}
