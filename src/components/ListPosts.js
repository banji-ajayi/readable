import React, {Component} from 'react';

import {loadAllPosts, votePost, loadCategories, sortBy} from '../actions/index'
import {connect} from 'react-redux';
import BreadCrumbs from './BreadCrumbs'
import Post from './Post'

class ListPosts extends Component {

  componentDidMount() {
    const {loadAllPosts, loadCategories, categories, posts} = this.props
    if (!categories || categories.length) {
      loadCategories()
    }

    if (!posts || !posts.length) {
      loadAllPosts()
    }
  }
  render() {
    const {posts, match, sortPosts} = this.props

    const selectParams = ["Date", "Votes"]

    const sortBy = sortPosts || selectParams[0]

    const category = (match && match.params && match.params.category)
      ? match.params.category
      : null

    if(category === 'addpost'){
      return <span/>
    }

    const filterPosts = Object.values(posts).filter(post => !post.deleted && (!category || (category && post.category === category)));

    filterPosts.sort(function(sort1, sort2) {
      if (sortBy === 'Date') {
        return (sort1.timestamp > sort2.timestamp) ? -1 : 1
      } else {
        return (sort1.voteScore > sort2.voteScore) ? -1 : 1
      }
    })

    return (
        <div>
          <BreadCrumbs url={match && match.url}/>
          <select className="sort-option" value={sortBy} onChange={(event) => this.props.sortBy(event.target.value)}>
            {selectParams.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
          {filterPosts && filterPosts.map((post) => (
            <Post post={post} key={post.id} showPostDetails={true}/>
          ))}
        </div>
    );
  }
}

function mapStateToProps({posts, categories, filterByCategory, loadingData, sortPosts}) {
  return {posts, categories, filterByCategory, loadingData, sortPosts}
}

export default connect(mapStateToProps, {loadAllPosts, loadCategories, sortBy, votePost})(ListPosts)
