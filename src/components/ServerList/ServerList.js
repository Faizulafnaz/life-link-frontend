import React, { useContext, useEffect, useState } from 'react'
import { Container, Separator } from './ServerListStyles';
import ServerButton from '../ServerButton/ServerButton';
import HomeButton from '../ServerButton/HomeButton';
import axios from 'axios';
import { baseUrl } from '../../congifure/urls';
import AuthContext from '../../context/AuthContext';
import ServeSearch from '../ServerButton/ServeSearch';
import { Link } from 'react-router-dom';


const ServerList = () => {
 
  const [groups, setGroups] = useState([])
  const {user} = useContext(AuthContext)

  const getServers = async () => {
    axios.get(`${baseUrl}/user-groups/${user.user_id}`).then((response) => {
      if (response.status == 200) {
          console.log(response.data)
          setGroups(response.data)

      }
  })
  }
  useEffect(()=>{
    getServers()
  },[])
  return (
    <Container>
      
      <HomeButton />
      <ServerButton isHome/>
      <ServeSearch />
        <Separator />
        { groups?.map((group)=>{
          return(
            <Link to={`/group/${group.id}`}>
          <div className="avatar p-2" style={{ cursor: 'pointer' }}>
          <div className="w-14 rounded-full">
            <img src={group.profile_picture? `${group.profile_picture}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"} />
          </div>
        </div>
        </Link>)
        })
          
        }
        
    </Container>
  )
}

export default ServerList;
