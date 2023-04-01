import instance from '../../api'
import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Garden from '../garden/Garden'
import { JOIN_MESSAGES, DOMAINS, JOIN_ALERT } from '../UI/Constants';
import './join.css'
import { useModal } from '../hooks/useModal';


const JoinMail = (props) => {

// 이메일 입력 관련 변수 및 함수
const [email, setEmail] = useState('')

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
  var domain = emailInput;
  if (emailDefault.length > 0){var domain = emailDefault}
  //테스트용!
  handleOpen();
  instance({
      method: 'post',
      url: '/signup/mail',
      params: {
          "email" : email + '@' + domain
      }
  }).then(response => {
      handleOpen();
  })
}

// 이메일 인증 요청 Alert창 관련 변수 및 함수
// const [show, setShow] = useState(false);

// const handleClose = () => setShow(false);
const { openModal } = useModal();
const handleOpen = () => {
  openModal(JOIN_ALERT.MAIL_SENT_TITLE, JOIN_ALERT.MAIL_SENT_BODY);
};
    
  return (
    <>
    <div id="login-garden">
        <Garden login={true}></Garden>
    </div>
    <div className="container-login">
        <h3 id='login-title'>{JOIN_MESSAGES.JOIN_1}</h3>
        <br/>
        <div id='login-input-grid'>
            <div id='login-lable-container'>
            <Form.Control
              className='login-id'
              type="text"
              aria-describedby="passwordHelpBlock"
              placeholder= {JOIN_MESSAGES.EMAIL}
              value={email}
              onChange={handleEmail}
            />
            <label id='email-lable'>{DOMAINS.AT}</label>
            </div>
            <div>
            <Form.Select 
            aria-label="Default select example"
            id='login-id-email'
            value={emailDefault}
            onChange={handleEmailDefault}
            >
              <option>{DOMAINS.CHOOSE}</option>
              <option value="naver.com">{DOMAINS.NAVER}</option>
              <option value="gmail.com">{DOMAINS.GOOGLE}</option>
              <option value="hanmail.net">{DOMAINS.DAUM}</option>
              <option value="kakao.com">{DOMAINS.KAKAO}</option>
              <option value="user-input">{DOMAINS.USER_INPUT}</option>
            </Form.Select>

            <Form.Control
              id='email-input'
              type="text"
              placeholder={DOMAINS.USER_INPUT}
              value={emailInput}
              onChange={handleEmailInput}
              name='email-input'
            />
            </div>
          </div>
        <br/>
        
        <Button className='btn-login' onClick={() => {
            onClickJoinMail();
            }}>{JOIN_MESSAGES.EMAIL_AUTH}</Button>
    </div>
    </>
  )
}

export default JoinMail