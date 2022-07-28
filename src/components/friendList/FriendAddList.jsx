//친구 신청 목록 컴포넌트

import React from 'react'
import { Badge, Button } from 'react-bootstrap'
import {MdCancel} from 'react-icons/md'
import './friendList.css'
import instance from '../../api'
import { useNavigate } from 'react-router-dom'

const FriendAddList = ({record, loading}) => {
  console.log(record)
  const accept = (e) => {
    console.log(e.target.id)
      instance({
          method: 'post',
          url: '/friend/proposal/acceptornot',
          params: {
            "friendnickname": e.target.id,
            "acceptornot": true
          }
        }).then(response => {
          if(response.data === 'ok'){
            var targetID = e.target.id;
            var target = document.getElementById(targetID);
            console.log(target);
            target.classList.add('complete');
            target.innerHTML = '신청 완료!';
            }
        })
  }

  const navigate = useNavigate();

  const goFriend = (friend) => {
    window.localStorage.setItem("friend-nickname", friend.friend_nickname);
    window.localStorage.setItem("friend-email", friend.friend_email);
    navigate('/friend/garden')
  }

    if(record.length > 0){
    return (
      <>
      {record.map((record) => (
      <div className="friend-add go-friend" onClick={() => {
        goFriend(record);
      }}>
          <Badge pill className="friend-field" bg={record.friend_field === 'front' ? 'primary' : 'success'}>{record.friend_field}</Badge>
          <div className="friend-img"></div>
          <div className="friend-detail-divider">
              <h5 className="friend-name">{record.friend_nickname}</h5>
              <h5 className='friend-progress'>{record.friend_progressRate}%</h5>
          </div>
          {/* <MdCancel className='friend-cancle'/> */}
          <div class="add-btn-random btn-friend-add" id={record.friend_nickname} onClick={
              accept}>+</div>
      </div>
      ))}
      </>
    )
  }
  }

export default FriendAddList