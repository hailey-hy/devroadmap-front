import React, {useState, useEffect} from 'react'
import instance from '../../api';
import './friendGarden.css'
import { Button, Modal, Form } from 'react-bootstrap';
import Garden from '../garden/Garden'
import Status from '../main/Status';
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
  const friendName = localStorage.getItem("friend-nickname");
  const friendEmail = localStorage.getItem("friend-email");
  const [friendField, setFriendField] = useState('front');
  
  useEffect(() => {
        instance({
          url: '/friend/details',
          params: {
            'friendNickname' : friendName
            }
        }).then(response => {

        //친구 정보 불러오기
          setFriendField(response.data.user_field)
          console.log(friendField)
        //친구 완료 항목
          let savedItem = [];

          console.log(response.data.complete_subjects)
          savedItem = response.data.complete_subjects;

          for(let i = 1; i < savedItem.length; i++){
            var targetID = savedItem[i].object
            console.log(targetID);
            var target = document.getElementById('img' + targetID);
            target.classList.remove('hide');
            target.classList.add('show');

            if(targetID === 11){
              var target = document.getElementById('img' + 12);
              target.classList.remove('hide');
  
              var target = document.getElementById('img' + 13);
              target.classList.remove('hide');
            }
            }
      
      })
      instance({
        url: '/friendornot',
        params: {
          'friendNickname' : friendName
          }
      }).then(response => {
        if (response.data === 'no'){
          var target = document.getElementById('btn-note');
          target.innerHTML = '친구 신청';
        }
      })
      //친구 여부에 따라 버튼 바꾸기
      
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
    instance({
      method: 'post',
          url: '/friend/proposal/acceptornot',
          params: {
            "friendnickname": friendName,
            "acceptornot": true
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

  const [text, setText] = useState('');

  const sendNote = () => {
    instance({
      url: '/guestbook/write',
      params: {
        "userReceive": friendEmail,
        "message": text
      }
    }).then(response => {
      handleCloseMsg();
      handleShow();
    })
  }


  //방명록 텍스트 관련
    
    const textCounter = (e) => {
      setText(e.target.value)

      //글자 수 세기
      var textCount = e.target.value.length;
      console.log(e.target.value);
      console.log(e.target.value.length);

      const target = document.getElementById('text-count');

      if(textCount <= 200){
        target.innerHTML = '(' + textCount + '/200)';
      } else {
        target.innerHTML = '(200/200)'
      }
    }

  //방명록 남긴 이후 모달창 관련 모음
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <section>
          <Garden friend={true} friend-field={friendField}></Garden>
          <Status friend={true} friendField={friendField}></Status>
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
                  <Form.Control as="textarea" rows={3} onChange={textCounter} maxlength='200'/>
                </Form.Group>
              </Form>
              <div id="text-count">(0/200)</div>
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

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
          <Modal.Header closeButton>
            <Modal.Title>방명록 작성 완료!</Modal.Title>
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
          </Modal>
    </section>
  )
}

export default FriendGarden