
const Notification = ({ error } : { error: string }) => {
  if (error === null) {
    return null
  }

  return (
    <div className='error'>
      {error}
    </div>
  )
}

export default Notification;