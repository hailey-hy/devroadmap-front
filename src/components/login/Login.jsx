import React from 'react'
import './login.css'
import Button from 'react-bootstrap/Button'
import {KAKAO_AUTH_URL} from './OAuth'
import axios from 'axios'

const Login = () => {

  
  
  return (
    <div className="container-login">
        <h3 id='login-title'>로그인</h3>
        <Button className="btn-login-select" variant="primary">GOOGLE</Button> <br></br>
        <Button className="btn-login-select" variant="primary" >NAVER</Button> <br></br>
        <Button className="btn-login-select" variant="primary" href={KAKAO_AUTH_URL}>KAKAO</Button>
        <a href="#"><h5 id='login-back'>뒤로 가기</h5></a>
    </div>
  )
}

export default Login