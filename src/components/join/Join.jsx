import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {BsFillCheckCircleFill} from 'react-icons/bs'

const Join = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
      setPassword(e.target.value)
  }

  const navigate = useNavigate();

  const onClickJoin = () => {

    axios({
      method: 'post',
      url: '/signup',
      headers: {
        "Content-Type": "application/text",
        "userEmail" : email,
        "userPassword" : password
      }
    }).then(response => {
      navigate('/login');
    })
  }

  return (
    <div className="container-login">
        <h3 id='login-title'>회원가입</h3>
        <input className='login-input' type='text' value={email} onChange={handleEmail} placeholder='EMAIL'/>
        <br/>
        <input className='login-input' type='password' value={password} onChange={handlePassword} placeholder='PW'/><br/>
        <Button className='btn-login' onClick={onClickJoin}>회원 가입</Button>
    </div>
  )
}

export default Join