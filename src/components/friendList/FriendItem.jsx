//친구 목록에 나올 친구 컴포넌트

import instance from '../../api'
import React, {useState} from 'react'
import { Badge, Modal, Button } from 'react-bootstrap'
import {MdCancel} from 'react-icons/md'
import './friendList.css'
import { useNavigate } from 'react-router-dom'
import { profileCheck } from '../../util/profileCheck'
import { BUTTON, FRIEND, FRIEND_ALERT } from '../UI/Constants'

const FriendItem = ({record, loading}) => {
console.log(record)
//친구 끊기 모달 창
  const [show, setShow] = useState(false);
  const [disconnectFriend, setDisconnectFriend] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    setDisconnectFriend(e.target.id);
  };

//친구 끊기 확인 모달 창
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);


//  친구 끊기
  const disconnect = (e) => {
    var friend_nickname = disconnectFriend;
    instance({
      method: 'post',
      url: '/friend/disconnect',
      params: {
        "friendnickname": friend_nickname
      }
    }).then(response => {
      if(response.data === 'ok'){
        var targetID = friend_nickname;
        var targetChild = document.getElementById(targetID);
        var target = targetChild.parentNode;
        // target.classList.add('hide');
        target.remove();
      }
    })
  }

//친구 정원으로 이동

const navigate = useNavigate();

const goFriend = (friend) => {
  window.localStorage.setItem("friend-nickname", friend.friend_nickname);
  window.localStorage.setItem("friend-email", friend.friend_email);
  navigate('/friend/garden')
}
  
  if(record.length === 0){
    return (
      <>
        <div className='util' id='container-no-friend'>
          <h5 id='title-no-friend'>{FRIEND.NO_FRIEND}</h5>
        </div>
      </>
    )
  } else {
    return (
      <>
      {record.map((record) => (
      <div className="friend go-friend"> 
          <div className="friend-badge" id={record.friend_nickname} onClick={() => {
            goFriend(record);
          }}>
            <Badge pill bg={record.friend_field === 'front' ? 'primary' : 'success'} className='front friend-field'>{record.friend_field}</Badge>
          </div>
          <div id={record.friend_nickname} onClick={() => {
            goFriend(record);
          }}>
            <div className="friend-img">
              <img src={profileCheck(record.friend_profile)} alt="" className='friend-profile'/>
            </div>
          </div>
          <div className="friend-detail-divider" id={record.friend_nickname} onClick={() => {
        goFriend(record);
      }}>
              <h5 className="friend-name">{record.friend_nickname}</h5>
              <h5 className='friend-progress'>{record.friend_progressRate}%</h5>
          </div>
          <div className="friend-cancle" id={record.friend_nickname} onClick={
            handleShow}>
            <MdCancel className="friend-cancle-img"/>
          </div>
      </div>
      ))}

      {/* 친구 끊기 모달 창 */}
      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{FRIEND_ALERT.DEL_TITLE}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {disconnectFriend}{FRIEND_ALERT.DEL_BODY}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                {BUTTON.CANCLE}
            </Button>
            <Button variant="primary" onClick={() => {
              disconnect();
              handleClose();
              handleShow2();
              }}>
                {BUTTON.DEL}
            </Button>
            </Modal.Footer>
        </Modal>

        {/* 친구 끊기 확인 모달 창 */}
        <Modal show={show2} onHide={handleClose2}>
            <Modal.Header closeButton>
            <Modal.Title>{FRIEND_ALERT.DEL_DONE_TITLE}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {FRIEND_ALERT.DEL_DONE_BODY}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
                {BUTTON.CLOSE}
            </Button>
            </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default FriendItem