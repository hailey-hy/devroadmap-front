import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import { Modal } from 'react-bootstrap'
import './login.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Garden from '../garden/Garden';

import '../garden/garden.css'

// const onClickLogin = (email, password) => {
// 	const data = {
// 		email,
// 		password,
// 	};
// 	axios.post('/login', data).then(response => {
// 		const { accessToken } = response.data;

// 		// API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
// 		axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

// 		// accessToken을 localStorage, cookie 등에 저장하지 않는다!

// 	}).catch(error => {
// 		console.error(error);
// 	});
// }

const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
      setPassword(e.target.value)
  }

  const navigate = useNavigate();

  // login 버튼 클릭 이벤트
  const onClickLogin = () => {

    axios({
      method: 'post',
      url: 'https://localhost:8080/signin',
      params: {
        "email" : email,
        "password" : password
      }
    }).then(response => {
      console.log(response.headers['jwtToken'])
  
      window.localStorage.setItem("user", response.data);
      console.log(window.localStorage.getItem("user"));
      navigate('/');
      
    }).catch(error => {
      console.error(error);
      // setResult("로그인 실패")
      setShow(true);
    });
  }

  const goJoin = () => {
    navigate('/signup/mail');
  }

  
  
  // const item = [];

    const targets = document.getElementsByClassName('hide');
    console.log(targets);
    
    // for(let i = 0; i < targets.length; i++){
    //   console.log(targets[i]);
    //   targets[i].classList.remove('hide');
    // }
    // target.classList.remove('hide');

  //로그인 실패 모달
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  
  return (
    <>
      <div id="login-garden">
        <Garden login={true}></Garden>
      </div>
      <div className="container-login">
          <h3 id='login-title'>로그인</h3>
          {/* 소셜 로그인 (중지)
          <Google></Google> <br></br>
          <Button className="btn-login-select" variant="primary" href={NAVER_AUTH_URL}>NAVER</Button> <br></br>
          <Button className="btn-login-select" variant="primary" href={KAKAO_AUTH_URL}>KAKAO</Button> */}
          <input className='login-input' type='text' value={email} onChange={handleEmail} placeholder='EMAIL'/><br/>
          <input className='login-input' type='password' value={password} onChange={handlePassword} placeholder='PW'/><br/>
          <div>
          {/* 로그인 오류 시 오류 메시지 출력 창 */}
            <h6 id='login-result'>{result}</h6> 
          </div>
          <Button className='btn-login' onClick={onClickLogin}>로그인</Button>
          <h5 id='login-back' onClick={goJoin}>회원가입</h5>
      </div>

      <Modal
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
          <Button variant="primary" onClick={() => {
            handleClose();
            
            }}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Login;