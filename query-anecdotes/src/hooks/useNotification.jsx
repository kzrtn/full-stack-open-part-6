import { useContext } from 'react'
import NotifContext from '../components/NotificationContext'

const useNotification = () => useContext(NotifContext)

export default useNotification