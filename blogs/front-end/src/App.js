/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Error from './components/Error'
import Notification from './components/Notification'
import AddBlog from './components/AddBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import store from './store'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/creationBlog'
import { useDispatch } from 'react-redux'

const App = () => {
  const [newLikes,
    setNewLikes] = useState('')
  const [username,
    setUsername] = useState('')
  const [password,
    setPassword] = useState('')
  const [user,
    setUser] = useState(null)
  const [errorMessage,
    setErrorMessage] = useState(null)
  const [addBlogVisible] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  useEffect(() => {
    const loggedUserJSON = window
      .localStorage
      .getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window
        .localStorage
        .setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
                username
        <input id = "username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
                password
        <input id = "password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  // eslint-disable-next-line no-unused-vars
  const logOut = () => {
    window
      .localStorage
      .removeItem('loggedNoteappUser')
    setUser(null)

  }

  /*const handleBlogLikeClick = async(id) => {
    const blogToUpdate = blogs.find((item) => item.id === id)
    if (blogToUpdate) {
      const likes = blogToUpdate.likes
        ? blogToUpdate.likes + 1
        : 1
      const updatedBlog = {
        ...blogToUpdate,
        likes
      }
      const response = await blogService.updateBlog(id, updatedBlog)
      if (response) {
        const updatedBlogList = blogs.map((item) => item.id === id
          ? updatedBlog
          : item)
        setBlogs(updatedBlogList)
      }
    }
  }*/

  /*const handleBlogRemoveClick = async(id, title, author) => {
    const message = `Remove blog ${title} by ${author}`
    if (window.confirm(message)) {
      try {
        await blogService.deleteBlog(id)
        const updatedBlogList = blogs.filter((item) => item.id !== id)
        setBlogs(updatedBlogList)
      } catch (error) {
        const { data, statusText } = error.response
        setErrorMessage({
          message: data.error || statusText,
          type: 'unsuccessful'
        })
        console.warn(error)
      }
    }
  }*/

  return (
    <div>
      <Notification/>
      <Error message={errorMessage}/> {user === null

        ? loginForm()
        : <div>
          <p>{user.name}
                        logged-in
            <button id = "logout" onClick={logOut}>logout</button>
          </p>

          <Blog/>
          <Togglable buttonLabel="Show Add blog form">
            <AddBlog/>
          </Togglable>
        </div>
      }

    </div>
  )
}

export default App
