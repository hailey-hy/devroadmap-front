import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import './login.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Garden from '../garden/Garden';

import '../garden/garden.css'
import grass from '../../assets/img-garden/땅.png';
import sun from '../../assets/img-garden/해.png';
import cloud1 from '../../assets/img-garden/구름1.png';
import cloud2 from '../../assets/img-garden/구름2.png';
import cloud3 from '../../assets/img-garden/구름3.png';
import cloud4 from '../../assets/img-garden/구름4.png';
import cloud5 from '../../assets/img-garden/구름5.png';
import bird from '../../assets/img-garden/새.png'
import img1 from '../../assets/img-garden/소나무.png';
import img2 from '../../assets/img-garden/꽃나무.png';
import img3 from '../../assets/img-garden/울타리.png';
import img4 from '../../assets/img-garden/새집.png';
import img5 from '../../assets/img-garden/토끼.png';
import img6 from '../../assets/img-garden/연못.png';
import img7 from '../../assets/img-garden/개구리.png';
import img8 from '../../assets/img-garden/분수대.png';
import img9 from '../../assets/img-garden/두더지.png';
import img10 from '../../assets/img-garden/벤치의자.png';
import img11a from '../../assets/img-garden/튤립.png';
import img11b from '../../assets/img-garden/민들레.png';
import img11c from '../../assets/img-garden/토끼풀.png';
import img12 from '../../assets/img-garden/돌.png';
import img13 from '../../assets/img-garden/덤불.png';
import img14 from '../../assets/img-garden/사다리.png';
import img15 from '../../assets/img-garden/다람쥐 그네.png';
import img16 from '../../assets/img-garden/정원사 앉아있는 버전.png';
import img17 from '../../assets/img-garden/개미.png';
import img18 from '../../assets/img-garden/지렁이.png';
import img19 from '../../assets/img-garden/연꽃.png';

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
      setResult("로그인 실패")
    });
  }

  const goJoin = () => {
    navigate('/signup/mail');
  }

  
  
  // const item = [];

  // for(let i = 1; i <= 29; i++){
  //   var target = document.getElementById('img' + i);
  //   console.log(target);
  //   var imgId = 'img' + i;
  //   // target.classList.remove('hide');
  //   item.push(
  //     <img id={imgId} class='garden-img hide' src={require(`../../assets/img-garden/${imgSrc}.png`)} alt={i}/>
  //   )
  // }

  
  
  return (
    <>
      <Garden></Garden>
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
    </>
  )
}

export default Login;