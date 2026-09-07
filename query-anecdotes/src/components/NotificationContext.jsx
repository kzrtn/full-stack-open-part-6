import { createContext, useState } from 'react'

const NotifContext = createContext()

export default NotifContext

export const NotifContextProvider = (props) => {
  const [notif, setNotif] = useState({
    message: '',
    type: ''
  })

  const setNotification = (content, type) => {
    setNotif({
      message: content,
      type: type
    })
    setTimeout(() => setNotif({
      message: '',
      type: ''
    }), 5000)
  }

  return (
    <NotifContext.Provider value={{ notif, setNotification }}>
      {props.children}
    </NotifContext.Provider>
  )
}
