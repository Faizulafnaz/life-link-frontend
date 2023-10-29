import React, { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import { baseUrl } from '../../congifure/urls'
import { useNavigate } from 'react-router-dom'

const ServerModal = () => {
    
    const [profile_img, setImage] = useState()
    const { user, authTokens, logoutUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const createServer = async (e) =>{
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', e.target.name?.value);
        if (profile_img) { formData.append('profile_picture', profile_img);}
        try {
            const response = await fetch(`${baseUrl}/groups/create`, {
                method: 'POST',
                body:formData,
            });
            const data = await response.json()
            console.log(data, 'uuuuuuuuuuuuuuuuuu')
            if (response.ok) {
                const closeButton = document.getElementById('closeButtonserver');
                if (closeButton) {
                    closeButton.click();
                }
                let response = await fetch(`${baseUrl}/group-members/`, {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body:JSON.stringify({'user_id':user?.user_id, 'group_id':data.id})
                })
                navigate(`/group/${data.id}`)
            } else if (response.status === 401) {
                return logoutUser();
            } else {
                alert('create server failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while creating the server');
        }
    }

  return (
    <div>
        <dialog id="my_modal_server" className="modal">
          <div className="modal-box">
              <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button id="closeButtonserver" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <form onSubmit={createServer}>
              <h1>Create New Server</h1>
              <div className="avatar p-2 absolute right-10 top-6">
                  <div className="w-20 rounded-full">
                  {/* <img src={userDetails?.profile_picture ? `${MediaUrl}${userDetails.profile_picture}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"} /> */}
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
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white-900  p-2">Server name</label>
                <input type="text" placeholder="Type here" name='name' className="input input-bordered text-gray-900  bg-white input-sm w-full max-w-xs"  />
              </div>

 
              <div className="modal-footer mx-5 p-3">
                                <button type="submit" className="btn btn-primary p-2" >Create</button>
                                
                            </div>
              </form>
              
              
              
          </div>
        </dialog> 
    </div>
  )
}

export default ServerModal