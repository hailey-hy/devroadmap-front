//친구 목록에 나올 친구 컴포넌트

import axios from 'axios'
import React from 'react'
import { Badge } from 'react-bootstrap'
import {MdCancel} from 'react-icons/md'
import './friendList.css'

const FriendItem = ({record, loading}) => {


  //친구 끊기
  const disconnect = (e) => {
    var friend_nickname = e.target.id;
    axios({
      method: 'post',
      url: 'https://localhost:8080/friend/disconnect',
      params: {
        "Authorization": "Bearer " + localStorage.getItem("user"),
        "friendnickname": friend_nickname
      }
    }).then(response => {
      if(response.data === 'ok'){
        var targetID = e.target.id;
        var target = document.getElementById(targetID);
        // target.classList.add('hide');
        target.remove();
      }
      // var delTarget = document.getElementsByClassName('friend');
      // console.log(delTarget)
      // if(delTarget.length === 0){
      //   console.log('ad')
      // }
    })
  }
  
  if(record.length === 0){
    return (
      <>
        <div className='util' id='container-no-friend'>
          <h5 id='title-no-friend'>아직 친구가 없어요.</h5>
        </div>
      </>
    )
  } else {
    return (
      <>
      {record.map((record) => (
      <div className="friend" id={record.friend_nickname}>
          <Badge pill bg={record.friend_field === 'front' ? 'primary' : 'success'} className='front friend-field'>{record.friend_field}</Badge>
          <div className="friend-img"></div>
          <div className="friend-detail-divider">
              <h5 className="friend-name">{record.friend_nickname}</h5>
              <h5 className='friend-progress'>{record.friend_progressRate}%</h5>
          </div>
          <div className="friend-cancle" id={record.friend_nickname} onClick={
            disconnect}>
            <MdCancel className="friend-cancle-img"/>
          </div>
      </div>
      ))}
      </>
    )
  }
}

export default FriendItem