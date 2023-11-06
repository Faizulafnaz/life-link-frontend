import React, { useContext, useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

export const AudioRoom = () => {
const { aRoomId } = useParams();
  const { user } = useContext(AuthContext);
  const zpRef = useRef(null);
  const audioMeetingContainerRef = useRef(null);

  useEffect(() => {
    const initializeZego = async () => {
      const appID = 1750612989;
      const serverSecret = '7152003dd6eae010012588591e89771c';
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        aRoomId,
        Date.now().toString(),
        user.username
      );

      zpRef.current = ZegoUIKitPrebuilt.create(kitToken);

      zpRef.current.joinRoom({
        container: audioMeetingContainerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        showPreJoinView: false,
        turnOnCameraWhenJoining: false,
        showTurnOffRemoteCameraButton: false,
        showMyCameraToggleButton: false,
        showScreenSharingButton: false,
      });
    };

    initializeZego();

    return () => {
      zpRef.current?.hangUp();
      zpRef.current?.destroy();
      console.log('hangup function');
    };
  }, [aRoomId, user.username]);

  return (
    <div
    className="myAudioCallContainer"
    ref={audioMeetingContainerRef}
    style={{ width: '79.5vw', height: '85vh', marginTop: '30px' }}
    ></div>
  )
}
