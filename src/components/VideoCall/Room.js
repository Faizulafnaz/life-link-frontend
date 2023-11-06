import React, { useContext, useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Room = () => {
  const { RoomId } = useParams();
  const { user } = useContext(AuthContext);
  const zpRef = useRef(null);
  const meetingContainerRef = useRef(null);

  useEffect(() => {
    const initializeZego = async () => {
      const appID = 436116211;
      const serverSecret = '7f824259038083d08c67ab134d51e78c';
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        RoomId,
        Date.now().toString(),
        user.username
      );

      zpRef.current = ZegoUIKitPrebuilt.create(kitToken);

      zpRef.current.joinRoom({
        container: meetingContainerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        showPreJoinView: false,
      });
    };

    initializeZego();

    return () => {
      zpRef.current?.hangUp();
      zpRef.current?.destroy();
      console.log('hangup function');
    };
  }, [RoomId, user.username]);

  return (
    <div
      className="myCallContainer"
      ref={meetingContainerRef}
      style={{ width: '79.5vw', height: '85vh', marginTop: '30px' }}
    ></div>
  );
};

export default Room;