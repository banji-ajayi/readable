import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import * as Actions from '../actions/index'
import {connect} from 'react-redux';


class Post extends Component {

  render() {
    const {post, showPostDetails, showEdit} = this.props
	const fullPost = (post && showPostDetails)? <span><Link to={`${post.category}/${post.id}`}><span className="icon readFull" title="Read more"></span></Link></span> : ''
    const editLink = (post && showEdit)? <div ><Link to={`/${post.category}/${post.id}/edit`}><i className="icon edit" title="Edit this post"/><div className="icon-desc">Edit</div></Link></div> : ''
    return (
        <div>
        {post && (<section >
          <header >
          <h2 className>{post.title}</h2>
          <p >
          By <span >{post.author}</span> in  <Link to={`${post.category}`} className="post-category post-category-design">{post.category}</Link>
          </p>
          </header>
          <div>
		  <p>{post.body} {fullPost}</p>
          </div>
          <div>
          <div ><span >{post.voteScore}</span><div className="icon-desc">Votes</div></div>
          <div onClick={() => this.props.votePost(post.id, true)}><i className="icon like" title="Up vote the post"/><div className="icon-desc">Like</div></div>
          <div onClick={() => this.props.votePost(post.id, false)}><i className="icon dislike" title="Down vote the post"/><div className="icon-desc">Dislike</div></div>
		  <div onClick={() => this.props.deletePost(post.id)}><i className="icon remove" title="Delete this Post"/><div className="icon-desc">Remove</div></div>
          {editLink}
          </div>
          </section>)}
		  </div>
		  
    );
  }
}

function mapStateToProps({posts}) {
  return {posts}
}

export default connect(mapStateToProps, Actions)(Post)
