import axios from 'axios'
import React, {useState} from 'react'
import { Button, Modal } from 'react-bootstrap'
import './join.css'
import { useDispatch } from 'react-redux';

const JoinMail = (props) => {

    // 이메일 입력 관련 변수 및 함수
    const [email, setEmail] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
      }
    
    const dispatch = useDispatch();
      
    // 이메일 인증 버튼 클릭시 작동 함수
    const onClickJoinMail = () => {
        axios({
            method: 'post',
            url: '/signup/mail',
            params: {
                "email" : email
            }
        }).then(response => {
            handleShow();
            dispatch({type: 'sent', defaultEmail: email})
        })
    }

    // 이메일 인증 요청 Alert창 관련 변수 및 함수
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
    <div className="container-login">
        <h3 id='login-title'>회원가입 (1/2)</h3>
        <br/>
        <br/>
        <input className='login-input' type='text' value={email} onChange={handleEmail} placeholder='EMAIL'/>
        <br/>
        
        <Button className='btn-login' onClick={() => {
            onClickJoinMail();
            }}>이메일 인증</Button>
    </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>인증 이메일 발송!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>입력하신 이메일로 인증 메일이 발송되었습니다. <br/> 메일에서 인증 링크를 클릭해 주세요.</p>
        </Modal.Body>

        {/* <Modal.Footer>
            <Button variant="secondary"></Button>
        </Modal.Footer> */}
    </Modal>
    </>
  )
}

export default JoinMail