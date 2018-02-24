import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class PostForm extends Component {

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.selectedCategory = ''
    this.author = ''
    this.body = ''
    this.title = ''
  }

  

  onFormSubmit(event) {
    event.preventDefault()
	const {onSubmit} = this.props
	

    if (onSubmit && this.title.value && this.body.value && this.author.value && this.selectedCategory) {
      onSubmit({title: this.title.value, body: this.body.value, author: this.author.value, category: this.selectedCategory})
    }
  }

  render() {
    const {categories, post} = this.props

    const {title, body, author, category } = post || {}

    this.selectedCategory = this.selectedCategory || category || (categories[0]? categories[0].path : "")

    return (
      <form onSubmit={this.onFormSubmit} className="pure-form post-form">
       <fieldset >
          <label htmlFor="category">Category</label>
          <select id="category" disabled={category? "disabled" : ""} value={this.selectedCategory} onChange={(event) => this.selectedCategory = event.target.value}>
            {categories && categories.map((category) => (
              <option key={category.path}>{category.name}</option>
            ))}
          </select>
        </fieldset>

        <fieldset className="form-group">
          <input type="text" className="form-control" placeholder="Name" defaultValue={author} disabled={author? "disabled" : ""} ref={(input) => {
            this.author = input;
          }}/>
          <input type="text" className="form-control" placeholder="post title" defaultValue={title} ref={(input) => {
            this.title = input;
          }}/>
          <textarea className="form-control " placeholder="post content" defaultValue={body} ref={(input) => {
            this.body = input;
          }}></textarea>
        </fieldset>
        <Link to="/">Cancel</Link>
        <button type="submit">{'Submit'}</button>
      </form>
    );
  }
}

export default PostForm
