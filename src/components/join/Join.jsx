import React, {useState, useEffect} from 'react';
import {Button, ButtonGroup, ToggleButton, Tooltip, OverlayTrigger, Modal} from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './join.css'
import { nicknameCheck } from '../../util/nicknameCheck';
import {BiInfoCircle} from 'react-icons/bi'

const Join = (props) => {
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const handleNickname = (e) => {
    setNickname(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
      const alertMsg = document.querySelector('#pw-alert');
      setPassword(e.target.value)
      if (password.length >= 4 && password.length < 12) {
        setPwCheck(true);
        alertMsg.innerHTML = '';
      } else {
        setPwCheck(false);
        alertMsg.innerHTML = '4자리 이상 12자리 이하';
      } 
      
  }

  const handlePasswordCheck = (e) => {
    setPasswordCheck(e.target.value)
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
    //닉네임 중복, 비밀번호 자리수, 비밀번호 확인 여부
    if(nickCheck == true && pwCheck == true && pwDoubleCheck == true){
    console.log(radioSecValue);
    const formdata = new FormData();
    formdata.append('uploadImage', files[0]);

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
  } else {
    handleShow();
    
  }
  }

  //중복 확인 관련
  const [nickCheck, setNickCheck] = useState(true);
  const [pwCheck, setPwCheck] = useState(false);
  const [pwDoubleCheck, setPwDoubleCheck] = useState(false);
  
  //비밀번호 자리 수 확인
  const onClickPwDoubleCheck = () => {
    if(password == passwordCheck){
      setPwDoubleCheck(true);
    }
  }

  // 경고창 관련
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    if(files[0] != null){
    reader.readAsDataURL(files[0]);
    }
  }

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
              <div id="detail-pw">
                <h5 className='detail-title pw'>비밀번호</h5>
                <h5 className='pw' id='pw-alert'></h5>
              </div>
                <input id='input-pw' className='login-input' type='password' value={password} onChange={handlePassword} placeholder='PW'/>
                <input className='login-input' type='password' value={passwordCheck} onChange={handlePasswordCheck} placeholder='PW CHECK'/>
                <Button className='id-check' variant="primary" onClick={onClickPwDoubleCheck}>확인</Button>
              
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

        {/* 경고창 */}
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>회원가입 양식 미완성!</Modal.Title>
        </Modal.Header>
        <Modal.Body>완료되지 않은 항목이 있어요. <br/> 정상적인 회원가입을 위해 모든 항목을 완료해 주세요.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Join