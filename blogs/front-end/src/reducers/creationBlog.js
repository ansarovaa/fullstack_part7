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
    console.log('suka serik')
    const newBlog = await blogService.create(blog)
    dispatch({ type: 'NEW_BLOG', data: newBlog })
  }
}

export default reducer