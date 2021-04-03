let timer = null

export const showNotification = (message, time) => {
  if (timer !== null) {
    clearInterval()
  }
  return async dispatch => {
    dispatch({ type: 'SHOW_NOTIFICATION', data: message })
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export const removeNotification = () => ({ type: 'REMOVE_NOTIFICATION' })

const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SHOW_NOTIFICATION':
    return action.data
  case 'REMOVE_NOTIFICATION':
    return null
  default:
    return state
  }
}

export default notificationReducer