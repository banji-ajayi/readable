import * as ACTION_TYPES from '../actions/actions_types'

export function categories(state = [], action) {
  switch (action.type) {
    case ACTION_TYPES.CATEGORIES_LOADED:
      return action.categories
    default:
      return state
  }
}

export function posts(state = {}, action) {
  const { posts, post, type} = action
  switch (type) {
    case ACTION_TYPES.LOAD_POST:
      if(posts) {
        return posts.reduce((obj, p) => {
          obj[p.id] = p
          return obj
        }, {})
      }
      return state
    case ACTION_TYPES.VOTE_POST:
    case ACTION_TYPES.ADD_POST:
    case ACTION_TYPES.UPDATE_POST:
    case ACTION_TYPES.DELETE_POST:
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
    case ACTION_TYPES.LOAD_POST_COMMENT:
      if(comments) {
        return comments.reduce((object, cmt) => {
          object[cmt.id] = cmt
          return object
        }, {})
      }
      return state
    case ACTION_TYPES.VOTE_COMMENT:
    case ACTION_TYPES.ADD_COMMENT:
    case ACTION_TYPES.UPDATE_COMMENT:
      return {
        ...state,
        [comment.id] : comment
      }
    case ACTION_TYPES.DELETE_COMMENT:
      delete state[comment.id]
      return state
    default:
      return state
  }
}

export function filterByCategory(state = '', action) {
  switch (action.type) {
    case ACTION_TYPES.SHOW_CATEGORY_POST:
      return action.category
    default:
      return state
  }
}

export function loadingData(state = false, action) {
  switch (action.type) {
    case ACTION_TYPES.DATA_LOADING:
      return action.isLoading
    default:
      return state;
  }
}

export function sortPosts(state = '', action) {
  switch (action.type) {
    case ACTION_TYPES.SORT_POSTS:
      return action.sortBy
    default:
      return state;
  }
}

export function commentModal(state = {}, action) {
  const {comment} = action
  switch (action.type) {
    case ACTION_TYPES.DISPLAY_FORM:
      return {
        comment,
        isOpen: true
      }
    case ACTION_TYPES.HIDE_FORM:
      return {
        isOpen: false
      }
    default:
      return state;
  }
}
