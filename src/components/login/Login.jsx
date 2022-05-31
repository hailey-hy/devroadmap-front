import React from 'react'
import './login.css'
import Button from 'react-bootstrap/Button'

const Login = () => {
  
  return (
    <div className="container-login">
        <h3 id='login-title'>로그인</h3>
        <Button className="btn-login-select" variant="primary">GOOGLE</Button> <br></br>
        <Button className="btn-login-select" variant="primary">NAVER</Button> <br></br>
        <Button className="btn-login-select" variant="primary">KAKAO</Button>
        <h5 id='login-back'>뒤로 가기</h5>
    </div>
  )
}

export default Login