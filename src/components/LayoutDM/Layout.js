import React from 'react';
import LayoutStyles from './LayoutStyles';
import ServerList from '../ServerList/ServerList';
import ServerName from '../ServerName/ServerName';
import ChannelInfo from '../ChannelInfo/ChannelInfo';
import ChannelList from '../ChannelList/ChannelList';
import UserInfo from '../UserInfo/UserInfo';
import UserList from '../UserList/UserList';
import ChannelData from '../ChannelData/ChannelData';
import { Container, Title, ExpandIcon} from '../ServerName/ServerNameStyles'
import {UserRow} from '../UserList/UserList'
import DmList from '../DmList/DmList';
import WelcomeData from '../WelcomeMessage/WelcomeData';
import { useParams } from 'react-router-dom';
import DMData from '../WelcomeMessage/DMData';

const Layout = () => {

    const {username} = useParams()
    console.log(username)

    return (
        <LayoutStyles>
            <ServerList/>
            <Container>
                <Title>Direct Message</Title>
            </Container>
            <ChannelInfo is_dm={true}/>
            <DmList/>
            <UserInfo/>
            { username ? <DMData/> :  <WelcomeData /> }
        
            
            {/* <UserList/> */}
            
        </LayoutStyles>
    )
}

export default Layout