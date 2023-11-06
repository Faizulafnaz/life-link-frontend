import React from 'react'
import { Container, VideoIcon, InviteIcon, SettingsIcon, CallIcon } from './ChannelButtonStyles';

const VoiceChannelButton = ({channelName,selected}) => {
  return (
    <Container className={selected ? 'active':''}>
          <div>
              <CallIcon/>
              <span>{channelName}</span>
          </div>
          <div className='iconsRight'>
              {/* <InviteIcon/>
              <SettingsIcon/> */}
          </div>
      </Container>
  )
}

export default VoiceChannelButton