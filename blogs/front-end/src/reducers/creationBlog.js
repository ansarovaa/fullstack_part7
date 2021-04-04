import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  console.log(action.type)
  switch (action.type) {
  case 'INIT_LIST':
    return action.data
  case 'NEW_BLOG':
    return [
      ...state,
      action.data
    ]
  case 'LIKE':
    // eslint-disable-next-line no-case-declarations
    const blog = state.find(a => a.id === action.data.id)
    blog.likes = blog.likes + 1
    return state.map(a => a.id === blog.id
      ? blog
      : a)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({ type: 'INIT_LIST', data: blogs })
  }
}

export const creationBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({ type: 'NEW_BLOG', data: newBlog })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.updateBlog(blog.id, {
      ...blog,
      likes: blog.likes + 1
    })
    dispatch({ type: 'LIKE', data: updatedBlog })
  }
}

export default reducer