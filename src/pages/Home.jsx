import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Layout from '../components/Layout/Layout';
import GlobalStyles from '../styles/GlobalStyles';


const Home = () => {
  const {user, logoutUser} = useContext(AuthContext)

  return (
    <>
      <Layout/>
      <GlobalStyles/>
    </>
  )
}

export default Home