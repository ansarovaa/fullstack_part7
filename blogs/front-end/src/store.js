import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import creationBlog from './reducers/creationBlog'


const reducer = combineReducers({
  notification: notificationReducer,
  creationBlog: creationBlog
})

const store = createStore(
  reducer,
  applyMiddleware(thunk))

export default store