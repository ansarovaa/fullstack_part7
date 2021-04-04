import React from 'react'
import {
  useParams
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/creationBlog'
import { showNotification } from '../reducers/notificationReducer'


const SingleBlog = () => {
  const id = useParams().id
  const blog = useSelector((state) => {
    console.log(state)
    return state.creationBlog.find(n => n.id === id)
  })

  const dispatch = useDispatch()

  const like = (blog) => {
    console.log('like', blog)
    dispatch(likeBlog(blog))
    dispatch(showNotification('Voted!', 5))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <strong>Likes: {blog.likes}</strong>
      </div>
      <div>
        <strong>Author: {blog.author}</strong>
      </div>
      <div>
        <strong>URL: {blog.url}</strong>
      </div>
      <div>
        <button onClick={() => like(blog)}>like</button>
      </div>
    </div>
  )
}
export default SingleBlog