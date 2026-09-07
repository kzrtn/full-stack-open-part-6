import useNotification from '../hooks/useNotification'

const Notification = () => {
  const { notif } = useNotification()
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (notif.message === '') return null

  return <div data-testid="notification" style={style}>{notif.message}</div>
}

export default Notification
