import React, { useContext, useEffect, useRef, useState } from 'react'
import ChannelMessage, {Mention} from '../ChannelMessage/ChannelMessage';
import {Container, Messages, InputWrapper, Input, InputIcon, SendIcon} from './ChannelDataStyles'
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import {baseUrl, WsUrl, MediaUrl} from '../../congifure/urls'
import { useNavigate, useParams } from 'react-router-dom';


const DMData = () => {
  const { username } = useParams();
  console.log('paraaaaaaaaaaa',username )
  const [recipientdetails, setRecipientDetails] = useState({})
  const [senderdetails, setSenderDetails] = useState({});
  const [senderid, setSenderId] = useState(null);
  const [recipientid, setRecipientId] = useState(null)
  const [clientstate, setClientState] = useState('');
  const [thread, setThread] = useState('');
  const [req, setReq] = useState('');
  const [messages, setMessages] = useState([]);

  const {user} = useContext(AuthContext)
  console.log(user, 'dfffffffffffff')
  const messageRef = useRef()

  const navigate=useNavigate()
 

  useEffect(()=>{
    return ()=>{
      console.log('chat closing function')
    }
  },[username, senderid, recipientid])

  const setUserProfileDetails = async () => {
    axios.get(`${baseUrl}/getuserdetails/${username}`).then((response) => {
        if (response.status == 200) {
            setRecipientDetails(response.data)
        }
    })
}

const setSenderProfile = async () => {
    axios.get(`${baseUrl}/getuserdetails/${user.user_id}`).then((response) => {
        if (response.status == 200) {
            console.log(response.data, 'ddddddddddddddddddddddddddd')
            setSenderDetails(response.data)

        }
    })
}

useEffect(()=>{
  setUserProfileDetails()
  setSenderProfile()

},[username])

  const setUpChat = () => {
    if (clientstate) {
      clientstate.close();
    }
    if (senderid !== null && recipientid !== null && senderid === user.user_id && recipientid === username){
    axios.get(`${baseUrl}/user-previous-chats/${senderid}/${recipientid}`).then((response) => {
        if (response.status == 200) {
          console.log(response.data)
            setMessages(response.data)
        }
    })

    const client = new W3CWebSocket(`${WsUrl}/ws/chat/${senderid}/?${recipientid}`);
    console.log('jfdkjkdj');
    setClientState(client)
    client.onopen = () => {
      console.log('WebSocket Client Connected');
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
  }

  const getReq = ()=>{
    axios.get(`${baseUrl}/message-request/${user.user_id}/${username}`).then((response) => {
      if (response.status == 200) {
          setReq(response.data[0])

      }
  })
  }

  const handleReq = () =>{
    axios.patch(`${baseUrl}/accept_request/${req.id}/`, {'is_accepted':true}).then((response) => {
      if (response.status == 200) {
          setReq(response.data)
      }
  })
  }


  useEffect(() => {
    setSenderId(user.user_id)
    setRecipientId(username)
    let thread_name = user.user_id > username ? `${user.user_id}_${username}` : `${username}_${user.user_id}`
    setThread(thread_name)
    getReq()
    
  }, [username])

  



  useEffect(() => {
    console.log('calling',senderid,recipientid)
    if (senderid != null && recipientid != null) {
    
      setUpChat()
    }
  }, [senderid, recipientid, username])

  


  const onButtonClicked = () => {

    if (messageRef.current.value.trim() == "") {
      return
    }
    clientstate.send(
      
      JSON.stringify({
        message: messageRef.current.value,
        senderUsername: senderdetails.username,
        receiverUsername: recipientdetails.username,
      })
      
    );
    messageRef.current.value = ''

  };
  const chatContainerRef = useRef();
  useEffect(() => {
    // Scroll to the bottom of the chat container
    if(req.is_accepted || messages[0]?.sender_username === senderdetails.username){chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight}
    
  });


  return (
    <Container>
      {req.is_accepted || messages[0]?.sender_username === senderdetails.username || messages?.length === 0 ?
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
                  author={recipientdetails.username}  
                  date={message.send_at}
                  content={message.message}
                  profile_picture={recipientdetails.profile_picture}
                  is_sender={false}
                />
              );
            }
          }) 
        }

        </Messages>

        :
        <div className='test p-3' style={{display:"flex", justifyContent:'center'}}> 
        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title">You have a message request!</h2>
            <p>do you want to accept</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={handleReq}>Accept</button>
            </div>
          </div>
        </div>
        </div>}
        <InputWrapper>
            <Input type='text' placeholder='type here' ref={messageRef}/>
            
            <InputIcon/>

           <SendIcon onClick={onButtonClicked}/>
        </InputWrapper>
    </Container>
    )
}


export default DMData;