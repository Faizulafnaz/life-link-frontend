import React, { useContext, useEffect, useRef, useState } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { MediaUrl, baseUrl } from '../../congifure/urls';
import axios from 'axios';


const Room = () => {

  const{RoomId} = useParams()
  const {user} = useContext(AuthContext)
  const [zp, setZp] = useState()

  const meetingContainerRef = useRef(null);

  function randomID(len) {
    let result = "";
    var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
    var maxPos = chars.length;
    len = 10;
    for (var i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  const meeting = async(element) => {
    const appID = 436116211;
    const serverSecret = '7f824259038083d08c67ab134d51e78c'
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, randomID(RoomId), Date.now().toString(), user.username)


    const Nzp = ZegoUIKitPrebuilt.create(kitToken);

    Nzp.joinRoom({
      container: element,
      scenario: {
       mode: ZegoUIKitPrebuilt.VideoConference,
      },
      showPreJoinView: false,
 });
  
  }


  

  return (
    <div className="myCallContainer"
    ref={meeting}
    style={{ width: '79.5vw', height: '85vh', marginTop:'30px' }}>
    </div>
  )
}

export default Room