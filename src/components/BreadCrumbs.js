import React, {Component} from 'react';
import * as utils from '../utils/index'
import Helper from './helper';

class BreadCrumbs extends Component {
  render() {
    const {url} = this.props
    const postPaths = utils.pathFromUrl(url)

    return (
      <ul className="nav-list">
        {postPaths && postPaths.length > 1 && postPaths.map((path, index) => {
          return <Helper path={path} hasDelimiter={index < (postPaths && (postPaths.length - 1))} key={path}/>
        })}
      </ul>
    )
  }
}

export default BreadCrumbs
