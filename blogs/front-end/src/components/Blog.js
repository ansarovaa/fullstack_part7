/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { showNotification, removeNotification } from '../reducers/notificationReducer'

const Blog = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [isVisible,
    setVisible] = useState(false)

  const handleToggle = () => {
    setVisible(!isVisible)
  }

  const blogs = useSelector((state) => {
    console.log('sukiny deti')
    console.log(state)
    // const filteredBlogs = state.creationBlog.filter((a) =>
    //   a.title.toLowerCase().includes(state.filter.toLowerCase())
    // )
    return state.creationBlog.sort((a, b) => b.likes - a.likes)
  })

  const dispatch = useDispatch()

  return (

    <div  className='blog'>
      <h1>Blogs</h1>
      <div className = 'blogList'>
        {blogs.map(blog => <div style ={blogStyle} key = {blog.id}> 
          <span className = 'blog-title'>{blog.title}</span>
          <span className = 'blog-author'>{blog.author}</span>
          {isVisible && ( <> <span>{blog.url}</span> <span> Likes {blog.likes} 
            <button className = 'btn ml-8'>Like</button> by {blog.user.username}
          </span></>)}
          <div className = 'buttons'> <button onClick={handleToggle} className='btn ml-8' id = 'hideViewButton'>
            {isVisible
              ? 'Hide'
              : 'View'}
          </button>
          </div>
        </div>)}
        
      </div>
    </div>

  )
}

export default Blog