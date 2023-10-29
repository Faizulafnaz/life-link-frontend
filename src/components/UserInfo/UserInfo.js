import React, { useContext, useEffect, useState } from 'react';
import {Container,Profile, Avatar, UserData, Icons,
        SettingsIcon, LogoutIcon} from './UserInfoStyles'
import { baseUrl, MediaUrl } from '../../congifure/urls';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';


const UserInfo = () =>{
    const {user, logoutUser} = useContext(AuthContext) 
    const [userDetails, setUserDetails] = useState('')
    
    const getUserDetails = async () => {
        axios.get(`${baseUrl}/getuserdetails/${user?.user_id}`).then((response) => {
          if (response.status == 200) {
            console.log(response.data, '1232323232')
            setUserDetails(response.data)
          }
      })
      }

      useEffect(()=>{
        getUserDetails()
      },[])

 return (
    <Container>
        <Profile>
        <div className="avatar p-2">
            <div className="w-8 rounded-full">
            <img src={userDetails?.profile_picture ? `${MediaUrl}${userDetails.profile_picture}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"} />
            </div>
        </div>
            <UserData>
                <strong>{userDetails?.username}</strong>
            </UserData>
        </Profile>
        <Icons>
            <SettingsIcon onClick={()=>document.getElementById('my_modal_3').showModal()}/>
            <LogoutIcon onClick={()=>logoutUser()}/>
        </Icons>
    </Container>
)};

export default UserInfo;