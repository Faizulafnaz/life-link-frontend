import React from 'react'
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { baseUrl, MediaUrl } from '../../congifure/urls';
import axios from 'axios';

const ProfileModal = () => {
    const [profile_img, setImage] = useState(null)
    const { user, authTokens, logoutUser} = useContext(AuthContext)
    const [userDetails, setUserDetails] = useState('')
    
    const getUserDetails = async () => {
      axios.get(`${baseUrl}/getuserdetails/${user?.user_id}`).then((response) => {
        if (response.status == 200) {
          console.log(response.data, '1232323232')
          setUserDetails(response.data)
        }
    })
    }
    console.log(user, 'userrrrrrrrrrrrrrrrrrrrrrrrr')
  
    let updateProfile = async (e) => {
      console.log('first')
      e.preventDefault();
      let formData = new FormData();
      if (e.target.username.value !== userDetails.username){
        console.log('done user')
        formData.append('username', e.target.username?.value);
      }
      if (e.target.email.value !== userDetails.email){
        formData.append('email', e.target.email?.value);
        console.log('done email')
      }
      
      
      formData.append('first_name', e.target.first_name?.value);
      formData.append('last_name', e.target.last_name?.value);
      if (profile_img) { formData.append('profile_img', profile_img);}
      console.log('second')
      try {
          const response = await fetch(`${baseUrl}/update_profile/${user?.user_id}`, {
              method: 'PATCH',
              headers: {
                  'Authorization': 'Bearer ' + String(authTokens.access),
              },
              body:formData,
          });
  
          if (response.ok) {
              const closeButton = document.getElementById('closeButton');
              if (closeButton) {
                  closeButton.click();
                  getUserDetails()
              }
          } else if (response.status === 401) {
              return logoutUser();
          } else {
              alert('Profile update failed');
          }
      } catch (error) {
          console.error('An error occurred:', error);
          alert('An error occurred while updating the profile');
      }
  };
  
      useEffect(()=>{
        if (user){
        getUserDetails()}
      },[])
  return (
    <div>
       <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
              <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button id="closeButton" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <form onSubmit={updateProfile}>
              <h1>Profile</h1>
              <div className="avatar p-2 absolute right-10 top-6">
                  <div className="w-20 rounded-full">
                  <img src={userDetails?.profile_picture ? `${MediaUrl}${userDetails.profile_picture}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"} />
                  </div>
              </div>
              <div className="p-2">
                  <label htmlFor="profile-img" className="col-form-label">Profile image</label>
                  <input type="file" className="form-control" id="profile-img" 
                      onChange={(e)=>{ 
                      if(e.target.value[0] != null)
                      setImage(e.target.files[0])}} 
                  />
              </div>
              <div className='p-2'>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white-900  p-2">Username</label>
                <input type="text" placeholder="Type here" name='username' className="input input-bordered text-gray-900  bg-white input-sm w-full max-w-xs" defaultValue={userDetails?.username} />
              </div>

              <div className='p-2'>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white-900 p-2">Email address</label>
                <input type="text" placeholder="Type here" name='email' className="input input-bordered text-gray-900 bg-white input-sm w-full max-w-xs" defaultValue={userDetails?.email} />
              </div>
         
              <div className='p-2'>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white-900 p-2">First Name</label>
                <input type="text" placeholder="Type here" name='first_name' className="input input-bordered text-gray-900 bg-white input-sm w-full max-w-xs" defaultValue={userDetails?.first_name} />
              </div>
         
              <div className='p-2'>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white-900 p-2">Last Name</label>
                <input type="text" placeholder="Type here" name="last_name" className="input input-bordered text-gray-900 bg-white input-sm w-full max-w-xs" defaultValue={userDetails?.last_name} />
              </div>

 
              <div className="modal-footer mx-5 p-3">
                                <button type="submit" className="btn btn-primary p-2" >Update</button>
                                
                            </div>
              </form>
              
              
              
          </div>
        </dialog> 
    </div>
  )
}

export default ProfileModal