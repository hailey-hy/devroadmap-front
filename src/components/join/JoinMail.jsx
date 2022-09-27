import instance from '../../api'
import React, {useState} from 'react'
import { Button, Modal } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Garden from '../garden/Garden'
import './join.css'

const JoinMail = (props) => {

    // 이메일 입력 관련 변수 및 함수
    const [email, setEmail] = useState('')
    const defaultEmail = window.localStorage.getItem("email");
    console.log(defaultEmail);

    const handleEmail = (e) => {
        setEmail(e.target.value);
      }
    
      //이메일 직접입력 선택시 작동 함수

    const [emailInput, setEmailInput] = useState('');
    const [emailDefault, setEmailDefault] = useState('')

    const handleEmailInput = (e) => {
    setEmailInput(e.target.value)
    }

    const handleEmailDefault = (e) => {
    if(e.target.value == 'user-input'){
        var target = document.getElementById('email-input');
        console.log(target)
        target.style.display = 'block';
        target.style.pointerEvents = 'all'

        var target2 = document.getElementById('login-id-email');
        target2.style.display = 'none';
    } else{
        setEmailDefault(e.target.value)
    }

    }
      
    // 이메일 인증 버튼 클릭시 작동 함수
    const onClickJoinMail = () => {
        
        if (emailDefault.length > 0){
            var domain = emailDefault
          }
          else {
            var domain = emailInput
          }

        instance({
            method: 'post',
            url: '/signup/mail',
            params: {
                "email" : email + '@' + domain
            }
        }).then(response => {
            handleShow();
            // dispatch({type: 'sent', defaultEmail: email})
            window.localStorage.setItem("email", email + '@' + domain);
        })
    }

    // 이메일 인증 요청 Alert창 관련 변수 및 함수
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
    <div id="login-garden">
        <Garden login={true}></Garden>
    </div>
    <div className="container-login">
        <h3 id='login-title'>회원가입 (1/2)</h3>
        <br/>
        <div id='login-input-grid'>
            <div id='login-lable-container'>
            <Form.Control
              className='login-id'
              type="text"
              aria-describedby="passwordHelpBlock"
              placeholder='이메일'
              value={email}
              onChange={handleEmail}
            />
            <label id='email-lable'>@</label>
            </div>
            <div>
            <Form.Select 
            aria-label="Default select example"
            id='login-id-email'
            value={emailDefault}
            onChange={handleEmailDefault}
            >
              <option>선택</option>
              <option value="naver.com">naver</option>
              <option value="gmail.com">google</option>
              <option value="hanmail.net">daum</option>
              <option value="kakao.com">kakao</option>
              <option value="user-input">직접 입력</option>
            </Form.Select>

            <Form.Control
              // className='login-id-email'
              id='email-input'
              type="text"
              placeholder='직접 입력'
              value={emailInput}
              onChange={handleEmailInput}
              name='email-input'
            />
            </div>
          </div>
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
    </Modal>
    </>
  )
}

export default JoinMail