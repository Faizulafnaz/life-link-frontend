import React, { useEffect, useState } from 'react'
import ChannelButton from '../ChannelButton/ChannelButton'
import VideoChannelButton from '../ChannelButton/VideoChannelButton'
import VoiceChannelButton from '../ChannelButton/VoiceChannelButton'
import {Container, Category, AddCategoryIcon} from './ChannelListStyles'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { baseUrl } from '../../congifure/urls'
import DoneIcon from '@mui/icons-material/Done';

const ChannelList = () => {
  const [channels, setChannels] = useState([])
  const [vchannels, setvChannels] = useState([])
  const [cChannels, setcChannels] = useState([])
  const [name, setName] = useState()
  const [vname, setvName] = useState()
  const [cName, setcName] = useState()
  const {group} = useParams() 
  const [add, setAdd] = useState(false)
  const [vadd, setvAdd] = useState(false)
  const [cAdd, setcAdd] = useState(false)

  const getChannels = async () => {
    axios.get(`${baseUrl}/channels-list/${group}`).then((response) => {
      if (response.status == 200) {
          console.log(response.data)
          setChannels(response.data)

      }
  })
  }
  const getVChannels = async () => {
    axios.get(`${baseUrl}/video-channels-list/${group}`).then((response) => {
      if (response.status == 200) {
          setvChannels(response.data)

      }
  })
  }
  const getcChannels = async () => {
    axios.get(`${baseUrl}/voice-channels-list/${group}`).then((response) => {
      if (response.status == 200) {
          setcChannels(response.data)

      }
  })
  }

  useEffect(()=>{
    getChannels()
    getVChannels()
    getcChannels()
  },[group, ])

  const addChannel = async (e) =>{
    e.preventDefault();
        let formData = new FormData();
        formData.append('name', name);
        formData.append('group', group);
        try {
            const response = await fetch(`${baseUrl}/channel/create`, {
                method: 'POST',
                body:formData,
            });
    
            if (response.ok) {
                getChannels()
                setAdd(false)
            } else {
                alert('create channel failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while creating the channel');
        }
  }

  const addvChannel = async (e) =>{
    e.preventDefault();
        let formData = new FormData();
        formData.append('name', vname);
        formData.append('group', group);
        try {
            const response = await fetch(`${baseUrl}/video-channel/create`, {
                method: 'POST',
                body:formData,
            });
    
            if (response.ok) {
                getVChannels()
                setvAdd(false)
            } else {
                alert('video channel creation failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while creating the video channel');
        }
  }

  const addcChannel = async (e) =>{
    e.preventDefault();
        let formData = new FormData();
        formData.append('name', cName);
        formData.append('group', group);
        try {
            const response = await fetch(`${baseUrl}/voice-channel/create`, {
                method: 'POST',
                body:formData,
            });
    
            if (response.ok) {
                getcChannels()
                setcAdd(false)
            } else {
                alert('voice channel creation failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while creating the video channel');
        }
  }

  return (
    <Container>
        <Category>
            <span>Text Channels</span>
            <AddCategoryIcon onClick={()=>{add ? setAdd(false) : setAdd(true)}}/>
            
        </Category>
        {add && 
        <div className='flex'>
          
        <input type="text" placeholder="create channel" className="input input-bordered input-sm w-full max-w-xs" name='channel' onChange={(e)=>{setName(e.target.value)}}/>
        
        <DoneIcon style={{cursor:'pointer'}} onClick={addChannel}/>
        </div>
        }
        
        {channels.map((channel)=>{
          return(
            <Link to={`/group/${group}/${channel.id}`}>
          <ChannelButton channelName={channel.name}/>
          </Link>)
        })}
      <br></br>
      <Category>
            <span>video Channels</span>
            <AddCategoryIcon onClick={()=>{vadd ? setvAdd(false) : setvAdd(true)}}/>      
      </Category>
      {vadd && 
        <div className='flex'>
          
        <input type="text" placeholder="create video channel" className="input input-bordered input-sm w-full max-w-xs" name='channel' onChange={(e)=>{setvName(e.target.value)}}/>
        
        <DoneIcon style={{cursor:'pointer'}} onClick={addvChannel}/>
        </div>
        }
      {vchannels.map((channel)=>{
          return(
            <Link to={`/group/${group}/room/${channel.id}`}>
          <VideoChannelButton channelName={channel.name}/>
          </Link>)
        })}
      <br></br>
      <Category>
            <span>Voice Channels</span>
            <AddCategoryIcon onClick={()=>{cAdd ? setcAdd(false) : setcAdd(true)}}/>      
      </Category>
      {cAdd && 
        <div className='flex'>
          
        <input type="text" placeholder="create voice channel" className="input input-bordered input-sm w-full max-w-xs" name='channel' onChange={(e)=>{setcName(e.target.value)}}/>
        
        <DoneIcon style={{cursor:'pointer'}} onClick={addcChannel}/>
        </div>
        }
      {cChannels.map((channel)=>{
          return(
            <Link to={`/group/${group}/audio_room/${channel.id}`}>
          <VoiceChannelButton channelName={channel.name}/>
          </Link>)
        })}
        
    </Container>
  )
}

export default ChannelList