import React, {Component} from 'react';

import {loadPostComments, addComment, updateComment, loadAllPosts, displayCommentForm, hideCommentForm} from '../actions/index'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import Post from './Post'
import Comment from './Comment'
import CommentForm from './CommentForm'
import BreadCrumbs from './BreadCrumbs'
import ReactModal from 'react-modal';

import * as API from '../utils/api'

class ViewPost extends Component {

  constructor(props) {
    super(props);
    this.openComment = this.openComment.bind(this);
    this.closeComment = this.closeComment.bind(this);
  }

  openComment = () => {
    this.props.displayCommentForm()
  }

  closeComment = () => {
    this.props.hideCommentForm()
  }

  onAddNewComment = ({body, author, id}) => {
    const {addComment, updateComment, match} = this.props
    const postId = (match && match.params && match.params.postId)
      ? match.params.postId
      : null
    if (body && author && postId) {
      if(id) {
        API.editComment(id, body).then((edit) => {
          updateComment(edit)
          this.closeComment()
        })
      } else {
        API.addNewComment(body, author, postId).then((comment) => {
          addComment(comment)
          this.closeComment()
        })
      }
    }
  }

  componentDidMount() {
    const {posts,match, loadPostComments,loadAllPosts} = this.props
    const postId = (match && match.params && match.params.postId)
      ? match.params.postId
      : null

    if(!posts || !posts[postId]) {
      loadAllPosts()
    }

    loadPostComments(postId)
  }
  render() {
    const {posts, match, comments, commentModal} = this.props

    const postId = (match && match.params && match.params.postId)
      ? match.params.postId
      : null


    const deletePst = (post && post.deleted)? <div>Post doesnt exists. checkout other <Link to={"/"}>posts</Link>.</div> : ''
    const postComment = Object.values(comments).filter(comment => comment.parentId === postId && !comment.deleted)
	 
	const post = posts[postId]
	const commentsCount = (postComment && postComment.length)? <span>&#40;{postComment.length}&#41;</span> : ''


    return (
      <div>
        <BreadCrumbs url={match && match.url}/>
        {post && !post.deleted && (<div><Post post={post} showReadMore={false} showEdit={true}/>
        <section>
          <div className="comments-section-title">Comments {commentsCount} <div onClick={this.openComment}><span className="icon add"></span><span>Add Comment</span></div></div>
          {postComment && postComment.map((comment) => (<Comment comment={comment} key={comment.id}/>))}
          <ReactModal className='Modal' overlayClassName='Overlay' isOpen={commentModal && commentModal.isOpen} onRequestClose={this.closeComment} contentLabel='Modal'>
            {commentModal && commentModal.isOpen && <CommentForm submitBtnText={commentModal.comment? 'Update' : 'Submit'} onSubmit={this.onAddNewComment} comment={commentModal.comment} post={post} onClose={this.closeComment}/>}
          </ReactModal>
        </section></div>)}
        {deletePst}
      </div>
    );
  }
}

function mapStateToProps({posts, loadingData, comments, commentModal}) {
  return {posts, loadingData, comments, commentModal}
}

export default connect(mapStateToProps, {loadAllPosts,loadPostComments, displayCommentForm, hideCommentForm, addComment, updateComment})(ViewPost)
