import React, {useState, useEffect} from 'react';
import {Button, ButtonGroup, ToggleButton, Tooltip, OverlayTrigger} from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './join.css'
import { nicknameCheck } from '../../util/nicknameCheck';
import {BiInfoCircle} from 'react-icons/bi'

const Join = (props) => {
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleNickname = (e) => {
    setNickname(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
      setPassword(e.target.value)
  }

//프로필 사진

  const [files, setFiles] = useState('');

  const onLoadFile = (e) => {
    const file = e.target.files;
    setFiles(file);
  }

// 공부 시간 (사용 중지)

// const [radioValue, setRadioValue] = useState('1');

// const radios = [
//   { name: '8시간', value: '8시간' },
//   { name: '4시간', value: '4시간' },
//   { name: '2시간', value: '2시간' },
// ];

//공부 유형
const [radioSecValue, setRadioSecValue] = useState('1');

const radiosSec = [
  { name: 'front', value: 'front' },
  { name: 'back', value: 'back' }
];
//   const handleType = (e) => {
//     setType(e.target.value)
//   }

// const handleField = (e) => {
//   setField(e.target.value)
//   }

//툴팁
const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    하루동안 공부에 쓸 수 있는 <br/> 시간을 선택해 주세요.
  </Tooltip>
);

//뒤로 가기 
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/signin');
  }

  //회원가입 버튼
  const onClickJoin = () => {

    if(nickCheck == true){
    console.log(radioSecValue);
    console.log(files[0]);
    const formdata = new FormData();
    formdata.append('uploadImage', files[0]);
    console.log(formdata);

    axios({
      method: 'post',
      url: '/signup',
      headers: {
        "Content-Type": "application/text",
        // "Content-Type": "multipart/form-data"
      },
      params: {
        "nickname" : nickname,
        "email" : email,
        "password" : password,
        "profile" : formdata,
        "field" : radioSecValue
      }
    }).then(response => {
      navigate('/signin');
    }).catch(err => {
      console.error(err);
    });
  }
  }

  //프로필 사진 미리보기
  useEffect(() => {
    preview();

    return () => preview();
  });

  const preview = () => {
    if (!files) return false;

    const imgEL = document.querySelector('.img-box');
    const reader = new FileReader();

    reader.onload = () => {
        imgEL.style.backgroundImage = `url(${reader.result})`
    };
    console.log(reader)
    if(files[0] != null){
    reader.readAsDataURL(files[0]);
    }
  }


  //중복 확인 관련
  const [nickCheck, setNickCheck] = useState(true);

  return (
    <div id="join-second" className="container-login">
        <h3 id='login-title'>회원가입 (2/2)</h3>
        <div className="chunck-container">
          <div>
            {/* 닉네임 */}
            <div className="detail-container">
              <h5 className='detail-title'>닉네임</h5>
              
                <input className='login-input' type='text' value={nickname} onChange={handleNickname} placeholder='NICKNAME'/>
                <Button className='id-check' variant="primary">확인</Button>
              
            </div>

            {/* 이메일 */}
            <div className="detail-container">
              <h5 className='detail-title'>이메일</h5>
              
                <input className='login-input' type='text' value={email} onChange={handleEmail} placeholder='EMAIL'/>
                <Button className='id-check' variant="primary">확인</Button>
              
            </div>

            {/* 비밀번호 */}
            <div className="detail-container">
              <h5 className='detail-title'>비밀번호</h5>
              
                <input className='login-input' type='password' value={password} onChange={handlePassword} placeholder='PW'/>
                <Button className='id-check' variant="primary">확인</Button>
              
            </div>
          </div>
        {/* <input className='login-input' type='text' value={type} onChange={handleType} placeholder='Type'/><br/> */}
        
        <div>
        <div className="detail-container">
          <h5 className='detail-title'>프로필 사진</h5>
            <form className='img-container'>
              <div className="img-box"></div>
              <input id="img-upload" type="file" accept='image/*' onChange={onLoadFile}/>
            </form>
          {/* 공부 유형 (사용 중지)
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
            id='tooltip'
          >
            <h5 className='detail-title'>공부 유형 <BiInfoCircle/></h5>
          </OverlayTrigger>
            <ButtonGroup id="type" className="mb-2">
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant="primary"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup> */}
        </div>
        
        <div className="detail-container">
          <h5 className='detail-title'>공부 분야</h5>
            <ButtonGroup id="type" className="mb-2">
            {radiosSec.map((radioSec, idx) => (
              <ToggleButton
                key={idx}
                id={`radioSec-${idx}`}
                type="radio"
                variant="primary"
                name="radioSec"
                value={radioSec.value}
                checked={radioSecValue === radioSec.value}
                onChange={(e) => setRadioSecValue(e.currentTarget.value)}
              >
                {radioSec.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
        </div>
        </div>
        {/* <input className='login-input' type='text' value={field} onChange={handleField} placeholder='Field'/><br/> */}
        <Button className='btn-login' onClick={onClickJoin}>회원 가입</Button>
        <h5 id='go-back' onClick={goBack}>뒤로 가기</h5>

      
    </div>
  )
}

export default Join