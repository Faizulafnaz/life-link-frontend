import React, { useContext, useEffect, useRef, useState } from 'react'
import ChannelMessage, {Mention} from '../ChannelMessage/ChannelMessage';
import {Container, Messages, InputWrapper, Input, InputIcon, SendIcon} from '../WelcomeMessage/ChannelDataStyles'
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import {baseUrl, WsUrl, MediaUrl} from '../../congifure/urls'
import { useNavigate, useParams } from 'react-router-dom';

const ChannelData = () => {
  const [messages, setMessages] = useState([]);
  const [senderdetails, setSenderDetails] = useState({});
  const {user} = useContext(AuthContext)
  const {group, channel} = useParams()
  const [clientstate, setClientState] = useState('');
  const messageRef = useRef()
  const [senderid, setSenderId] = useState(null);

  const setSenderProfile = async () => {
    axios.get(`${baseUrl}/getuserdetails/${user.user_id}`).then((response) => {
        if (response.status == 200) {
            console.log(response.data, 'ddddddddddddddddddddddddddd')
            setSenderDetails(response.data)

        }
    })
  }
  useEffect(()=>{
    setSenderProfile()
  
  },[group, channel])


  const setUpChat = () => {
    if (clientstate) {
      clientstate.close();
    }
    if (senderid !== null && channel !== null && senderid === user.user_id){
    axios.get(`${baseUrl}/channel-previous-chat/${channel}`).then((response) => {
        if (response.status == 200) {
          console.log(response.data)
            setMessages(response.data)
        }
    })
    }else{
      setMessages(null)
    }
    const client = new W3CWebSocket(`${WsUrl}/ws/chat/group/${channel}/`);
    console.log('group');
    setClientState(client)
    client.onopen = () => {
      console.log('WebSocket Client Connected(group)');
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      const currentDate = new Date();
      const isoString = currentDate.toISOString();
      if (dataFromServer) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: dataFromServer.message,
            sender_username: dataFromServer.senderUsername,
            send_at:isoString,
          },
        ]);
      }
    };

    client.onclose = () => {
      console.log('Websocket disconnected');
    }

    return () => {
      client.close();
    };
  }
  
  useEffect(() => {
    setSenderId(user.user_id)
  }, [group, channel])

  useEffect(() => {
    console.log('calling',senderid)
    if (senderid != null && channel != null) {
    
      setUpChat()
    }else{
      setMessages([])
    }
  }, [group, channel, senderid])


  const onButtonClicked = () => {

    if (messageRef.current.value.trim() == "") {
      return
    }
    clientstate.send(
      
      JSON.stringify({
        message: messageRef.current.value,
        senderUsername: senderdetails.username,
        
      })
      
    );
    messageRef.current.value = ''

  };

  const chatContainerRef = useRef();
  useEffect(() => {
    // Scroll to the bottom of the chat container
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  });


  return (
    <Container>
        <Messages  ref={chatContainerRef}>
        {console.log('flajflafla',messages)}
        {/* {
            
            messages.map((message) => {
              return(
            <ChannelMessage
                // author='Mauricio Da Costa'
                date={message.date}
                content={message.message}
            />
            )
            
          })
          } */}
          {
          messages.map((message) => {
      
            if (message.sender_username === senderdetails.username) {
              return (
                <ChannelMessage
                  key={message.id}
                  author={senderdetails.username} 
                  date={message.send_at}
                  content={message.message}
                  profile_picture={senderdetails.profile_picture}
                  is_sender={true}
                  
                />
              );
            } else {
              return (
                <ChannelMessage
                  key={message.id}
                  author={message.sender_username} 
                  date={message.send_at}
                  content={message.message}
                  profile_picture={message.sender_profile_picture}
                  is_sender={false}
                  id = {message.user_id}
                />
              );
            }
          })
        }

        </Messages>
        {channel && <InputWrapper>
            <Input type='text' placeholder='type here' ref={messageRef}/>
            
            <InputIcon/>

           <SendIcon onClick={onButtonClicked}/>
        </InputWrapper>}
        
    </Container>
  )
}

export default ChannelData;