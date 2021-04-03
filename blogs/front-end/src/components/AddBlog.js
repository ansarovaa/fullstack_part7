import React from 'react'
// eslint-disable-next-line no-unused-vars
import { connect } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import { creationBlog } from '../reducers/creationBlog'
// eslint-disable-next-line no-unused-vars
import { showNotification } from '../reducers/notificationReducer'

const AddBlog = (props) => {
  const createBlog = async(event) => {
    event.preventDefault()
    let blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    console.log(blog)
    props.creationBlog(blog)
    // props.creationBlog(blog)
    props.showNotification(`Added blog by ${blog.author}`, 5)
  }
  return (
    <div>
      <h2>Add new</h2>
      <form onSubmit={createBlog}>
        <div><input name="title"/></div>
        <div><input name="author"/></div>
        <div><input name="url"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )

}

const mapDispatchToProps = {
  creationBlog,
  showNotification
}

export default connect(null, mapDispatchToProps)(AddBlog)