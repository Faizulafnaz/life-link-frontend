import React from 'react'
import { Button } from './ServerButtonStyles';
import { useNavigate } from 'react-router-dom';

const HomeButton = ({isHome,selected,hasNotifications,mentions}) => {
    const navigate = useNavigate()
  return (
    <Button
        isHome={isHome}
        hasNotifications={hasNotifications}
        mentions={mentions}
        className={selected ? 'active':''}
        onClick={()=>navigate('/dm/')}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
  <path d="M13.354 7.354L8 1.707 2.646 7.354a.5.5 0 0 0 .708.708L8 2.707l4.646 4.646a.5.5 0 0 0 .708-.708z" />
  <path fill-rule="evenodd" d="M7.5 15a.5.5 0 0 1-.5-.5V9a.5.5 0 0 1 1 0v5.5a.5.5 0 0 1-.5.5zM7 8a.5.5 0 0 1 .5.5V15h1V8.5A.5.5 0 0 1 8 8z" />
</svg>



        {isHome}
    </Button>
  )
}

export default HomeButton