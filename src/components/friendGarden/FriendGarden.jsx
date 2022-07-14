import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './friendGarden.css'
import { Button, Modal, Form } from 'react-bootstrap';
import Garden from '../garden/Garden'
import './friendGarden.css'
import grass from '../../assets/img-garden/땅.png';
import sun from '../../assets/img-garden/해.png';
import cloud1 from '../../assets/img-garden/구름1.png';
import cloud2 from '../../assets/img-garden/구름2.png';
import cloud3 from '../../assets/img-garden/구름3.png';
import cloud4 from '../../assets/img-garden/구름4.png';
import cloud5 from '../../assets/img-garden/구름5.png';
import bird from '../../assets/img-garden/새.png'

const FriendGarden = () => {

  //친구 정원 api
  const [friendOrNot, setFriendOrNot] = useState(true);
  const [friendName, setFriendName] = useState('');
  
  useEffect(() => {
        axios({
          method: 'get',
          url: 'https://localhost:8080/',
          params: {
            "Authorization": "Bearer " + localStorage.getItem("user")
          }
        }).then(response => {

        //친구 정보 불러오기


        //친구 완료 항목
          const savedItem = [];

          console.log(response.data.complete_subjects)
          savedItem = response.data.complete_subjects;

          for(let i = 1; i < savedItem.length; i++){
            if(i in savedItem[i].object){
            var target = document.getElementById('img' + i);
            target.classList.remove('hide');
            target.classList.add('show');
            }
        }

        //친구 여부에 따라 버튼 바꾸기
        if (friendOrNot === false){
          var target = document.getElementById('btn-note');
          target.innerHTML = '친구 신청';
        }
      })
      }, [])
    
     
      

  // 친구 여부에 따라 다른 버튼 내용
  const noteOrAdd = () => {
    if (friendOrNot === false){
      friendAdd();
    } else {
      handleShowMsg();
    }
  }

  //친구 신청 관련 모음
  const friendAdd = () => {
    axios({
      method: 'get',
      url: 'https://localhost:8080/',
      params: {
        "Authorization": "Bearer " + localStorage.getItem("user")
      }
    }).then(response => {
      var target = document.getElementById('btn-note');
      target.innerHTML = '친구 신청 완료!';
      target.style.pointerEvents = 'none';
    });
  }

  //방명록 모달창 관련 모음
  const [showMsg, setShowMsg] = useState(false);

  const handleCloseMsg = () => setShowMsg(false);
  const handleShowMsg = () => setShowMsg(true);

  const sendNote = () => {
    axios({
      method: 'get',
      url: 'https://localhost:8080/',
      params: {
        "Authorization": "Bearer " + localStorage.getItem("user")
      }
    }).then(response => {
      handleShow();
    })
  }

  //방명록 남긴 이후 모달창 관련 모음
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
          <Garden friend={true}></Garden>

          {/* 친구 정원 알림창 */}
          <div id="container-friend-notion">
            <h5 id='friend-notion-title'>{friendName}님의 정원입니다.</h5>
            <Button id='btn-note' variant="primary" onClick={noteOrAdd}>방명록 남기기</Button>
          </div>

          {/* 방명록 남기기 모달 창 */}
          <Modal show={showMsg} onHide={handleCloseMsg}>
            <Modal.Header closeButton>
              <Modal.Title>{friendName}님께 방명록 남기기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>200자 이하의 메시지만 남길 수 있습니다.</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseMsg}>
                취소
              </Button>
              <Button variant="primary" onClick={sendNote}>
                남기기
              </Button>
            </Modal.Footer>
          </Modal>

          {/* <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
          <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              방명록을 남겼어요.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => {
                handleClose();
                }}>
                확인
              </Button>
            </Modal.Footer>
          </Modal> */}
    </div>
  )
}

export default FriendGarden