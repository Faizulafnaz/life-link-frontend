import React, { useContext, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { baseUrl } from '../../congifure/urls';
import AuthContext from '../../context/AuthContext';
import ChannelList from '../ChannelList/ChannelList';
import { Navigate, useNavigate } from 'react-router-dom';


export const SearcModal = () => {
    const [groups, setGroups] = useState()
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const searchServer = async (keyword) => {
        if (!keyword == ''){
            let response = await fetch(`${baseUrl}/groups-list/?search=${keyword}`, {
                method:'GET',
                headers:{
                  'Content-Type':'application/json',
          
                } 
              })
              let data = await response.json()
              console.log(data)
              if (response.status === 200){
                
                setGroups(data)
              }}
    }
    const addMember = async (group_id) => {
        console.log('hiiii')
        let response = await fetch(`${baseUrl}/group-members/`, {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({'user_id':user?.user_id, 'group_id':group_id})
        })
        let data = await response.json()
        console.log(data)
        console.log(response.status)
        if (response.status === 201){
          const closeButton = document.getElementById('closeButtonsearch');
          if (closeButton) {
              closeButton.click();
              
          }
          navigate(`/group/${data.group_id}`)
            
        }else{
            alert('somethingwrong')
        } 
    }

  return (
    <div>
        <dialog id="my_modal_search" className="modal">
          <div className="modal-box">
              <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button id="closeButtonsearch" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <form >
                <h1>Search for new servers.......</h1>
                <br></br>
                <input type="text" onChange={(e)=>searchServer(e.target.value)} placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs" />
              </form>
                <br></br>
                {groups && 
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.dark' ,  overflow: 'auto', maxHeight:350}}>
                {
                 groups?.map((group)=>{
                     return(
                         <>
                         <ListItem alignItems="flex-start">
                             <ListItemAvatar>
                             <Avatar alt="Remy Sharp" src={group?.profile_picture && group?.profile_picture} />
                             </ListItemAvatar>
                             <ListItemText
                             primary={group.name}
                             />
                             <Button variant="contained" onClick={()=>{
                                 addMember(group.id)
                             }}>
                                 Join
                             </Button>
                         </ListItem>
                         <Divider variant="inset" component="li" />
                 </>
                     )
                 })
                }
                 
                 
                 </List>}
              
               
          </div>
        </dialog> 
    </div>
  )
}
