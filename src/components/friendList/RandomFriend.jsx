import React from 'react'
import { Badge } from 'react-bootstrap'
import {MdCancel} from 'react-icons/md'
import axios from 'axios'

const RandomFriend = ({record}) => {
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
        <div className="friend" id={record.friend_nickname}>
            <Badge pill className="friend-field">front</Badge>
            <div className="friend-img"></div>
            <div className="friend-detail-divider">
                <h5 className="friend-name">{record.friend_nickname}</h5>
                <h5 className='friend-progress'>{record.friend_progressRate}%</h5>
            </div>
            <MdCancel className='friend-cancle' onClick={(friend_nickname) =>{ 
                accept(friend_nickname);
            }}/>
        </div>
        ))}
    </>
  )
}

export default RandomFriend