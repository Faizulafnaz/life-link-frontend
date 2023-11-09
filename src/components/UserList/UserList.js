import React from 'react';
import {Container, Role, User, Avatar} from './UserListStyles'
import { MediaUrl } from '../../congifure/urls';

export const UserRow = ({nickname, isBot, profile_pic, unread, id}) =>{

  

  
  return (
    <User >
      <div className="avatar p-2">
        <div className="w-8 rounded-full">
          <img src={profile_pic? `${profile_pic}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"} />
          {unread && <div style={{right:'4px', position:'absolute', bottom:'5px'}}><div className="badge badge-primary badge-xs" >{unread}</div></div>}
          
        </div>
      </div>

        <strong>{nickname}</strong>
        
        {isBot && <span>Bot</span> }
        
    </User>
  )
}

const UserList = () =>{
    
 return (
    <Container>
        <Role>Disponivel - 5</Role>
        <UserRow nickname='José Gonsalves'/>
        <UserRow nickname='Júliana Soba Java23'/>
        <UserRow nickname='Pam Pam'/>

        <Role>Offine - 23</Role>
        <UserRow nickname='António Muteka' isBot/>
        <UserRow nickname='Mauricio Da Costa'/>
        <UserRow nickname='Félix Domingos'/>
        <UserRow nickname='Gerux114'/>
        <UserRow nickname='Manuel Dembo'/>
        <UserRow nickname='Deltom'/>
        <UserRow nickname='Fulano'/>
        <UserRow nickname='Fulano'/>
        <UserRow nickname='Fulano'/>
        <UserRow nickname='Fulano'/>
        <UserRow nickname='Fulano'/>
        <UserRow nickname='Fulano'/>
        <UserRow nickname='Fulano'/>
        <UserRow nickname='Fulano'/>
        <UserRow nickname='Fulano'/>
        <UserRow nickname='Fulano'/>
        <UserRow nickname='Fulano'/>
        <UserRow nickname='Fulano'/>

        
    </Container>
)};

export default UserList;