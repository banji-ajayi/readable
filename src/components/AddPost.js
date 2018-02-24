import React, {Component} from 'react'
import * as Actions from '../actions/index'
import * as API from '../utils/api'
import {connect} from 'react-redux'
import PostForm from './PostForm'
import BreadCrumbs from './BreadCrumbs'

class AddNewPost extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({title, body, author, category}) 
  {
    const {addPost, history: {push} } = this.props

	if (title && body && author && category) 
	{
	  API.addNewPost(title, body, author, category)
	  .then((post) => {
        addPost(post)
        push("/")
      })
    }
  }

  render() {
    const {categories, match} = this.props
    return (
      <div>
        <BreadCrumbs url={match && match.url}/>
        <PostForm categories={categories} onSubmit={this.onSubmit}/>
      </div>
    );
  }
}

function mapStateToProps({categories}) {
  return {categories}
}

export default connect(mapStateToProps, Actions)(AddNewPost)
