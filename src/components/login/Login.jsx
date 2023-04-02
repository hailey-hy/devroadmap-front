import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import { useModal } from '../../hooks/useModal';
import Form from 'react-bootstrap/Form';
import './login.css'
import instance from '../../api'
import { useNavigate } from "react-router-dom";
import Garden from '../garden/Garden';
import { LOGIN_MSSAGES, LOGIN_PLACE_HOLDERS, DOMAINS } from '../UI/Constants';

import '../garden/garden.css'

const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailDefault, setEmailDefault] = useState('')
  const [result, setResult] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
      setPassword(e.target.value)
  }

  //이메일 직접입력 선택시 작동 함수

  const [emailInput, setEmailInput] = useState('');

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

  

  // login 버튼 클릭 이벤트
  const onClickLogin = () => {
    //직접 입력된 이메일이 있을 경우 해당 입력값을 도메인으로 사용
    if (emailInput.length > 0){
      var domain = emailInput
    }
    else {
      var domain = emailDefault
    }

    instance({
      method: 'post',
      url: '/signin',
      params: {
        "email" : email + '@' + domain,
        "password" : password
      }
    }).then(response => {
      console.log(response.headers['jwtToken'])
  
      window.localStorage.setItem("user", response.data);
      console.log(window.localStorage.getItem("user"));
      window.location.replace('/'); //강제 새로고침
      
    }).catch(error => {
      console.error(error);
      handleOpen();
    });
  }

  //회원가입 이동

  const navigate = useNavigate();

  const goJoin = () => {
    navigate('/signup/mail');
  }
  

  //로그인 실패 모달
  const { openModal } = useModal();
  const handleOpen = () => {
    openModal();
  }
  
  return (
    <>
      <div id="login-garden">
        <Garden login={true}></Garden>
      </div>
      <div className="container-login">
          <h3 id='login-title'>{LOGIN_MSSAGES.LOGIN}</h3>
          <div id='login-input-grid'>
            <div className='login-lable-container'>
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
            <div className='login-lable-container'>
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
              // className='login-id-email'
              id='email-input'
              type="text"
              placeholder={DOMAINS.USER_INPUT}
              value={emailInput}
              onChange={handleEmailInput}
              name='email-input'
            />
            </div>
          </div>
          

          <Form.Control
            className='login-input'
            id='login-pw'
            type="password"
            aria-describedby="passwordHelpBlock"
            placeholder={LOGIN_PLACE_HOLDERS.PW}
            value={password}
            onChange={handlePassword}
          />
      
          <div>
          {/* 로그인 오류 시 오류 메시지 출력 창 */}
          </div>
          <Button className='btn-login' onClick={onClickLogin}>{LOGIN_MSSAGES.LOGIN}</Button>
          <h5 id='login-back' onClick={goJoin}>{LOGIN_MSSAGES.JOIN}</h5>
      </div>

      {/* <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
      <Modal.Header closeButton>
          <Modal.Title>로그인 실패</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          이메일 또는 비밀번호를 확인해 주세요.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            handleClose();
            
            }}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  )
}

export default Login;