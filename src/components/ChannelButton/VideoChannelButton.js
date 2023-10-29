import React from 'react'
import { Container, VideoIcon, InviteIcon, SettingsIcon } from './ChannelButtonStyles';

const VideoChannelButton = ({channelName,selected}) => {
  return (
    <Container className={selected ? 'active':''}>
          <div>
              <VideoIcon/>
              <span>{channelName}</span>
          </div>
          <div className='iconsRight'>
              {/* <InviteIcon/>
              <SettingsIcon/> */}
          </div>
      </Container>
  )
}

export default VideoChannelButton