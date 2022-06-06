import React from 'react'
import Button from 'react-bootstrap/Button'
import {KAKAO_AUTH_URL} from './OAuthKakao'
import { NAVER_AUTH_URL } from './OAuthNaver'
import Google from './Google'
import './login.css'
import axios from 'axios'

const Login = () => {

  
  
  return (
    <div className="container-login">
        <h3 id='login-title'>로그인</h3>
        <Google></Google> <br></br>
        <Button className="btn-login-select" variant="primary" href={NAVER_AUTH_URL}>NAVER</Button> <br></br>
        <Button className="btn-login-select" variant="primary" href={KAKAO_AUTH_URL}>KAKAO</Button>
        <a href="#"><h5 id='login-back'>뒤로 가기</h5></a>
    </div>
  )
}

export default Login