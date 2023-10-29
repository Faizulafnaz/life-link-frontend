import React from 'react'
import { Button } from './ServerButtonStyles';

const ServeSearch = () => {
  return (
    <Button

          onClick={()=>document.getElementById('my_modal_search').showModal()}
    >
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.343a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a6.5 6.5 0 1 0-1.418 1.416zM6.5 12a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
    </svg>

    </Button>
  )
}

export default ServeSearch