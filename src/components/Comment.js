import React, { Component } from 'react';
import * as Actions from '../actions/index'
import {connect} from 'react-redux';


class Comment extends Component {
  render() {
    const {comment} = this.props
    return (
      <section className="comment" key={comment.id}>
        <header >
            <p ><span>{comment.author}</span></p>
        </header>
        <div >{comment.body}</div>
        <div >
          <div  title="Comment Score">Vote<span className="votes">{comment.voteScore}</span></div>
          <span title="Up vote" className="icon like" onClick={() => this.props.voteComment(comment.id, true)}>Like</span>
          <span title="Down vote" className="icon dislike" onClick={() => this.props.voteComment(comment.id, false)}>Dislike</span>
          <span title="Delete" className="icon remove" onClick={() => this.props.deleteComment(comment.id)}>Remove</span>
          <span title="Edit" className="icon edit"  onClick={() => this.props.displayCommentForm(comment)}>Edit</span>
        </div>
      </section>
    );
  }
}

function mapStateToProps({comments}) {
  return {comments}
}

export default connect(mapStateToProps, Actions)(Comment)
