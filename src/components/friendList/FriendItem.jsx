//친구 목록에 나올 친구 컴포넌트

import instance from '../../api'
import React, {useState} from 'react'
import { Badge, Modal, Button } from 'react-bootstrap'
import {MdCancel} from 'react-icons/md'
import './friendList.css'

const FriendItem = ({record, loading}) => {

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
            handleShow}>
            <MdCancel className="friend-cancle-img"/>
          </div>
      </div>
      ))}

      {/* 친구 끊기 모달 창 */}
      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>친구 삭제</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                정말 {disconnectFriend}님을 삭제할까요?
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                취소
            </Button>
            <Button variant="primary" onClick={() => {
              disconnect();
              handleClose();
              handleShow2();
              }}>
                삭제
            </Button>
            </Modal.Footer>
        </Modal>

        {/* 친구 끊기 확인 모달 창 */}
        <Modal show={show2} onHide={handleClose2}>
            <Modal.Header closeButton>
            <Modal.Title>친구 삭제</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                삭제되었어요.
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
                닫기
            </Button>
            </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default FriendItem