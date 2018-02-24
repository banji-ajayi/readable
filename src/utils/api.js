import * as utils from '../utils'

const api = "http://localhost:3001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': token
}

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
	.then(data => data)
	
export const getCategoryPosts = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
	.then(res => res.json())
	.then(data => data)

export const addNewPost = (title, body, author, category) =>
  fetch(`${api}/posts`, {
	method: 'POST',
	headers: headers,
	body: JSON.stringify({ title, body, author, category})
  }).then(res => res.json())

export const editPost = (postId, title, body) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({ title, body})
  }).then(res => res.json())

export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: headers
  }).then(res => res.json())
  .then(data => data)

export const votePost = (id, voteFor) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({'option': voteFor? 'upVote' : 'downVote'})
  }).then(res => res.json())
  
export const getComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
	.then(data => data)


export const addNewComment = (body, author, parentId) =>
 fetch(`${api}/comments`, {
	method: 'POST',
	headers: headers,
	body: JSON.stringify({ parentId, body, author, id: (parentId + '_' + utils.makeRandom(7))})
 }).then(res => res.json())
  
export const editComment = (commentId, body) =>
  fetch(`${api}/comments/${commentId}`, {
	method: 'PUT',
	headers: headers,
	body: JSON.stringify({timestamp:Date.now(), body})
  }).then(res => res.json())
  
export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
	method: 'DELETE',
	headers: headers
  }).then(res => res.json())
  
export const voteComment = (id, voteFor) =>
  fetch(`${api}/comments/${id}`, {
	method: 'POST',
	headers: headers,
	body: JSON.stringify({ option: voteFor? 'upVote' : 'downVote'})
  }).then(res => res.json())

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)





