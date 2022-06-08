import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import './login.css'
import axios from 'axios'

// const onLogin = (input_id, input_pw) => {
// 	const data = {
// 		input_id,
// 		input_pw,
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

  const [inputEmail, setInputEmail] = useState('')
  const [inputPw, setInputPw] = useState('')
  const [result, setResult] = useState('');

  const handleInputEmail = (e) => {
    setInputEmail(e.target.value)
  }

  const handleInputPw = (e) => {
      setInputPw(e.target.value)
  }

  // login 버튼 클릭 이벤트
  const onClickLogin = () => {
    const data = {
      		inputEmail,
      		inputPw,
      	};
      	axios.post('/login', data).then(response => {
      		const { accessToken } = response.data;
      
          localStorage.setItem("user", JSON.stringify(accessToken));
          console.log(localStorage.getItem("user"))
          
      		props.loginCallBack(true);
          props.history.push("/");
      
      	}).catch(error => {
      		console.error(error);
          setResult("로그인 실패")
      	});
  }

  // 페이지 렌더링 후 가장 처음 호출되는 함수
  useEffect(()=>{
    console.log("LoginPage render ... ");
})
  
  return (
    <div className="container-login">
        <h3 id='login-title'>로그인</h3>
        {/* 소셜 로그인 (중지)
        <Google></Google> <br></br>
        <Button className="btn-login-select" variant="primary" href={NAVER_AUTH_URL}>NAVER</Button> <br></br>
        <Button className="btn-login-select" variant="primary" href={KAKAO_AUTH_URL}>KAKAO</Button> */}
        <input className='login-input' type='text' name='input_id' value={inputEmail} onChange={handleInputEmail} placeholder='EMAIL'/><br/>
        <input className='login-input' type='password' name='input_pw' value={inputPw} onChange={handleInputPw} placeholder='PW'/><br/>
        <div>
        {/* 로그인 오류 시 오류 메시지 출력 창 */}
          <h6 id='login-result'>{result}</h6> 
        </div>
        <Button className='btn-login' onClick={onClickLogin}>로그인</Button>
        <a href="/join"><h5 id='login-back'>회원가입</h5></a>
    </div>
  )
}

export default Login;