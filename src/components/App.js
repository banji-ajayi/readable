import React, {Component} from 'react';

import * as ACTION_CREATORS from '../actions/index'

import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import ListPosts from './ListPosts'

class App extends Component {
  componentDidMount() {
	const ACTION_CREATORS = this.props;
    ACTION_CREATORS.loadCategories()
    ACTION_CREATORS.loadAllPosts()
  }
  render() {
    const {categories} = this.props
    return (
      <div>
        <nav className="nav">
          <ul className="nav-list">
            {categories && categories.map((category) => (
              <li className="nav-item" key={category.path}>
                <Link to={`${category.path}`} >
                  <b>{category.name}</b>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ListPosts/>
      </div>
    );
  }
}

function mapStateToProps({posts, categories, filterByCategory, loadingData}) {
return {posts, categories, filterByCategory, loadingData}
}

export default connect(mapStateToProps, ACTION_CREATORS)(App)

