import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification

  return (
    notification ?
      <div className="notification">
        {notification}
      </div>
      : null
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)