import React from 'react'
import { Route, redirect } from 'react-router-dom'



const PrivateRoute = ({children, ...rest}) => {
    console.log('Private routes work')

  return (
    <Route {...rest}>{children}</Route>
  )
}

export default PrivateRoute