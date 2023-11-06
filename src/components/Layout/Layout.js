import React from 'react';
import LayoutStyles from './LayoutStyles';
import ServerList from '../ServerList/ServerList';
import ServerName from '../ServerName/ServerName';
import ChannelInfo from '../ChannelInfo/ChannelInfo';
import ChannelList from '../ChannelList/ChannelList';
import UserInfo from '../UserInfo/UserInfo';
import UserList from '../UserList/UserList';
import ChannelData from '../ChannelData/ChannelData';
import { useParams } from 'react-router-dom';
import Room from '../VideoCall/Room';
import { AudioRoom } from '../AudioCall/AudioRoom';



const Layout = () => {

    const {RoomId, aRoomId} = useParams()

return (
    <LayoutStyles>
        <ServerList/>
        <ServerName/>
        <ChannelInfo/>
        <ChannelList/>
        <UserInfo/>
        {RoomId ? <Room /> : aRoomId ? <AudioRoom /> : <ChannelData />}
        {/* <UserList/> */}  
    </LayoutStyles>
)
}

export default Layout