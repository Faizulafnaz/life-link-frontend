import React from 'react'
import {Container, Avatar, Message, Header, Content, Container_sender, Header_sender} from './ChannelMessageStyles'
import { MediaUrl } from '../../congifure/urls';
import { useNavigate } from 'react-router-dom';
export {Mention} from './ChannelMessageStyles';

const ChannelMessage = ({author, date, content,hasMention, isBot, profile_picture, is_sender, id}) => {
  const dateAndTime = new Date(date);
  const newdate = dateAndTime.toLocaleDateString(); // Extracts the date part
  const time = dateAndTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const navigate = useNavigate()
  if (is_sender){ 
  return (
    
    <Container className={hasMention?'mention':''}>
        
        <Message>
            <Header>
                <strong>{author}</strong>
                {isBot && <span>Bot</span>}
                <time>{newdate+' '+time}</time>
            </Header>
            <Content>{content}</Content>
        </Message>
        <div className="avatar p-2">
            <div className="w-8 rounded-full">
            <img src={profile_picture ? `${MediaUrl}${profile_picture}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"} />
            </div>
        </div>
    </Container>
  )}else{
    return (
    
      <Container_sender className={hasMention?'mention':''}>
        <div className="avatar p-2" onClick={()=>navigate(`/dm/${id}`)} style={{cursor:'pointer'}}>
            <div className="w-8 rounded-full">
            <img src={profile_picture ? `${MediaUrl}${profile_picture}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"} />
            </div>
        </div>
          <Message>
            <Header_sender>
                <strong>{author}</strong>
                {isBot && <span>Bot</span>}
                <time>{newdate+' '+time}</time>
            </Header_sender>
            <Content>{content}</Content>
        </Message>
        
      </Container_sender>
    )
  }
}

export default ChannelMessage;