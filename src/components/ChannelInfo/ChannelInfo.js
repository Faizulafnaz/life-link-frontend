import React from 'react'
import { Container, HashtagIcon, Title, Separator, Description} from './ChannelInfoStyles'
import { useParams } from 'react-router-dom'
import { MediaUrl, baseUrl } from '../../congifure/urls'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const ChanelInfo = ({is_dm}) => {
  const {username, channel} = useParams()
  const [recipientDetails, setRecipientDetails] = useState()
  const [channelDetails, setChannelDetails] = useState()

  const setUserProfileDetails = async () => {
    axios.get(`${baseUrl}/getuserdetails/${username}`).then((response) => {
        if (response.status == 200) {
            setRecipientDetails(response.data)
        }
    })
  }
  const setChannels = async () => {
    axios.get(`${baseUrl}/channel-details/${channel}`).then((response) => {
        if (response.status == 200) {
          setChannelDetails(response.data[0])
        }
    })
  }

  useEffect(()=>{
    {username && setUserProfileDetails()}
    
  },[username])
  useEffect(()=>{
    {channel ? setChannels() : setChannelDetails(null)}
    console.log(channelDetails)
    
  },[channel])

  if (is_dm && username){
  return (
    <Container>
        <div className="avatar p-2">
        <div className="w-8 rounded-full">
          <img src={recipientDetails? `${MediaUrl}${recipientDetails.profile_picture}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"} />
        </div>
      </div>
        <strong>{recipientDetails?.username}</strong>
    </Container>
  )}else{
    return (
      <Container>
          <HashtagIcon />
          <Title>{channelDetails?.name}</Title>
          <Separator />
      </Container>
    )
  }
}

export default ChanelInfo