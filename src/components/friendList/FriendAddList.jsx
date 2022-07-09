//친구 신청 목록 컴포넌트

import React from 'react'
import { Badge, Button } from 'react-bootstrap'
import {MdCancel} from 'react-icons/md'
import './friendList.css'
import axios from 'axios'

const FriendAddList = ({record, loading}) => {
    const accept = (friend_nickname) => {
        axios({
            method: 'post',
            url: 'https://localhost:8080/friend/proposal/acceptornot',
            params: {
              "Authorization": "Bearer " + localStorage.getItem("user"),
              "friendnickname": friend_nickname,
              "acceptornot": true
            }
          }).then(response => {
            if(response.data === 'ok'){
                var targetID = friend_nickname
                var target = document.getElementById({targetID});
                target.classList.add('hide');
              }
          })
    }

    return (
      <>
      {record.map((record) => (
      <div className="friend-add">
          <Badge pill className="friend-field">front</Badge>
          <div className="friend-img"></div>
          <div className="friend-detail-divider">
              <h5 className="friend-name">{record.name}</h5>
              <h5 className='friend-progress'>{record.bs}%</h5>
          </div>
          {/* <MdCancel className='friend-cancle'/> */}
          <div class="add-btn-random btn-friend-add" onClick={(friend_nickname) => {
              accept(friend_nickname)}}>+</div>
      </div>
      ))}
      </>
    )
  }

export default FriendAddList