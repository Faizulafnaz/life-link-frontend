import React from 'react'
import { Button } from './ServerButtonStyles';

const ServerButton = ({isHome,selected,hasNotifications,mentions}) => {
  return (
    <Button
        isHome={isHome}
        hasNotifications={hasNotifications}
        mentions={mentions}
        className={selected ? 'active':''}
        onClick={()=>document.getElementById('my_modal_server').showModal()}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
        <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1-2 0v-6H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
      </svg>
        {isHome}
    </Button>
  )
}

export default ServerButton