import React, { useContext, useEffect, useState } from 'react'
import ChannelButton from '../ChannelButton/ChannelButton'
import {Container, Category, AddCategoryIcon} from './ChannelListStyles'
import {UserRow} from '../UserList/UserList'
import AuthContext from '../../context/AuthContext'
import { baseUrl } from '../../congifure/urls'
import { Link, useNavigate } from 'react-router-dom'


const DmList = () => {
  const [users, setUsers] = useState([])
  const {user, logoutUser, authTokens} = useContext(AuthContext)
  const searchUser = async (keyword)=>{
    if (!keyword == ''){
    let response = await fetch(`${baseUrl}/user-list/?search=${keyword}`, {
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization' : 'Bearer '+String(authTokens.access),
  
        } 
      })
      let data = await response.json()
      console.log(data)
      if (response.status === 200){
        
        setUsers(data)
      }else{
        getUser()
      }
    }else{
        getUser()
    }
}

const getUser = async ()=>{
  let response = await fetch(`${baseUrl}/chat-list/${user?.user_id}/`, {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization' : 'Bearer '+String(authTokens.access),

      } 
    })
    let data = await response.json()
    if (response.status === 200){
      setUsers(data)
    }else if(response.statusText === 'Unauthorized'){

      return logoutUser()
    } 
}

  useEffect(()=>{
    getUser()
    console.log(users)
  }, [])


  

  const navigate = useNavigate()
  return (
    
    <Container>
        <Category>
            <span>Chats</span>
            <AddCategoryIcon/>
        </Category>
        <input type="text" onChange={(e)=>searchUser(e.target.value)} placeholder="Search for new friends" className="input input-bordered input-sm w-full max-w-xs" />
        <br></br>
        { users?.map((usr) => {
          return(
            <Link to={`/dm/${usr.id}`} onClick={async ()=>{
              let formData = new FormData();
              formData.append('user_id', user.user_id);
              formData.append('sender_id', usr.id);
              console.log(usr.id,'fdsfds', user.id)
              const response = await fetch(`${baseUrl}/message-update/`, {
                method: 'POST',
                body:formData,
            });
    
            if (response.ok) {
              getUser()
            } else {
                alert('somthing went wrong');
            }
            }}>
          <UserRow nickname={usr.username} profile_pic={usr.profile_picture} unread={usr.unread} id={usr.id}></UserRow>
          </Link>
          )
        })}
    </Container>
  )
}

export default DmList