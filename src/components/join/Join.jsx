import React, {useState, useEffect, useRef} from 'react';
import {Button, ButtonGroup, ToggleButton, Tooltip, Overlay, OverlayTrigger, Modal} from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import instance from '../../api';
import { useNavigate } from "react-router-dom";
import Garden from '../garden/Garden';
import './join.css'

import { nicknameCheck } from '../../util/nicknameCheck';
import {BiInfoCircle} from 'react-icons/bi'
import { useSelector } from 'react-redux';

const Join = (props) => {
  // const defaultEmail = useSelector(state => state.defaultEmail);
  const defaultEmail = window.localStorage.getItem("email");
  console.log(defaultEmail);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  

  const handleNickname = (e) => {
    setNickname(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handlePasswordCheck = (e) => {
    setPasswordCheck(e.target.value)
}

//서버에서 이메일 불러오기

useEffect(() => {
  instance({
    url: '/signup/mail/confirm'
}).then((response) => {
  const target = document.getElementById('email-input-fixed');
  target.value = response.data;
  console.log(response.data);
  setEmail(response.data);
  
})
},[])

console.log(email);

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

    instance({
      method: 'post',
      url: '/signup',
      headers: {
        "Content-Type": "application/text",
        // "Content-Type": "multipart/form-data"
      },
      params: {
        "nickname" : nickname,
        "email" : defaultEmail,
        "password" : password,
        "field" : radioSecValue
      }
    }).then(response => {
      handleShow2();
      // navigate('/signin');
    }).catch(err => {
      console.error(err);
    });
  } else {
    handleShow();
    
  }
  }

  //중복 확인 관련
  const [nickCheck, setNickCheck] = useState(false);
  
  const [pwCheck, setPwCheck] = useState(false);
  const [pwDoubleCheck, setPwDoubleCheck] = useState(false);



  //닉네임 중복 확인 툴팁, 버튼
  const [showNickCheck, setShowNickCheck] = useState(false); //닉네임 검사 성공
  const [showNickCheck2, setShowNickCheck2] = useState(false);  //닉네임 중복
  const [showNickCheck3, setShowNickCheck3] = useState(false); //닉네임 유효성 검사
  const target = useRef(null);

  const nickServerCheck = () => {
    const lowerNick = nickname.toLowerCase();
    if(nickname == lowerNick && nickname.length >= 2 && nickname.length < 11){
      instance({
        method: 'get',
        url: '/signup/nickname/',
        params: {
          "nickname" : nickname}
      }).then((response) => {
        if(response.data == 'ok'){ //닉네임 검사에 성공한 경우
        setShowNickCheck(true);
        setShowNickCheck2(false);
        setShowNickCheck3(false);
        setNickCheck(true);
        } else { //중복 닉네임이 있을 경우
          setShowNickCheck2(true);
          setShowNickCheck(false);
          setShowNickCheck3(false);
          setNickCheck(false);
        }
      }).catch((err) => {
        console.error(err)
      })
    } else { //닉네임 유효성 검사 실패한 경우
      setShowNickCheck3(true);
      setShowNickCheck(false);
      setShowNickCheck2(false);
      setNickCheck(false);
    }
    
  }
  
  //비밀번호 중복 확인 툴팁
  const [showPwCheck, setShowPwCheck] = useState(false);
  const [showPwCheck2, setShowPwCheck2] = useState(false);
  const [showPwCheck3, setShowPwCheck3] = useState(false);
  const targetPw = useRef(null);

  //비밀번호 확인 버튼
  const onClickPwDoubleCheck = () => {
    if(password.length < 4 || password.length > 10){
      setPwCheck(false);
      setPwDoubleCheck(false);
      setShowPwCheck(false);
      setShowPwCheck2(false);
      setShowPwCheck3(true);
    }else if(password == passwordCheck){
      setPwCheck(true);
      setPwDoubleCheck(true);
      setShowPwCheck(true);
      setShowPwCheck2(false);
      setShowPwCheck3(false);
    }else{
      setPwCheck(false);
      setPwDoubleCheck(false);
      setShowPwCheck2(true);
      setShowPwCheck(false);
      setShowPwCheck3(false);
    }
  }

  // 경고창 관련
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 완료 모달창 관련

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const goLogin = () => navigate('/');

  //프로필 사진 미리보기
  // useEffect(() => {
  //   preview();

  //   return () => preview();
  // });

  // const preview = () => {
  //   if (!files) return false;

  //   const imgEL = document.querySelector('.img-box');
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //       imgEL.style.backgroundImage = `url(${reader.result})`
  //   };
  //   if(files[0] != null){
  //   reader.readAsDataURL(files[0]);
  //   }
  // }

  return (
    <>
    <div id="login-garden">
        <Garden login={true}></Garden>
    </div>
    <div id="join-second" className="container-login">
        <h3 id='login-title'>회원가입 (2/2)</h3>
        <div className="chunck-container">
          <div>
            {/* 닉네임 */}
            <div className="detail-container">
              <div id="detail-pw" >
                <h5 className='detail-title'>닉네임</h5>
                <Overlay target={target.current} show={showNickCheck} placement="top-end" id="tooltip-nickCheck">
                  {(props) => (
                    <Tooltip id="nick-alert" {...props}>
                      사용 가능한 닉네임이에요.
                    </Tooltip>
                  )}
                </Overlay>
                <Overlay target={target.current} show={showNickCheck2} placement="top-end">
                  {(props) => (
                    <Tooltip id="nick-alert" {...props}>
                      다른 닉네임을 사용해 주세요.
                    </Tooltip>
                  )}
                </Overlay>
                <Overlay target={target.current} show={showNickCheck3} placement="top-end">
                  {(props) => (
                    <Tooltip id="nick-alert" {...props}>
                      닉네임은 2~8자리 한글, 영문 소문자, 숫자만 포함 가능해요.
                    </Tooltip>
                  )}
                </Overlay>
                {/* <h5 id='nick-alert'></h5> */}
              </div>
              <div ref={target}>
              <div className='divider'>
                <Form.Control
                  className='join-input'
                  type="text"
                  placeholder='2~8자리 한글, 영문 소문자'
                  value={nickname}
                  onChange={handleNickname}
                />
                <Button className='id-check' variant="primary" onClick={nickServerCheck}>확인</Button>
                </div>
              </div>

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
        <div>
          {/* 이메일 */}
          <div className="detail-container" id='detail-email'>
              <h5 className='detail-title'>이메일</h5>
                <Form.Control
                  className='join-input-email'
                  id='email-input-fixed'
                  type="text"
                  placeholder='이메일'
                  value={defaultEmail}
                  disabled
                />
            </div>
            {/* 비밀번호 */}
            <div className="detail-container">
              <div id="detail-pw">
                <h5 className='detail-title pw'>비밀번호</h5>
                {/* <h5 className='pw' id='pw-alert'></h5> */}
              </div>
                <div ref={targetPw}>
                  <Form.Control
                    className='join-input'
                    id='input-pw'
                    type="password"
                    placeholder='비밀번호'
                    value={password}
                    onChange={handlePassword}
                  />
                </div>
                <div className='divider'>
                <Form.Control
                    className='join-input'
                    id='input-pw'
                    type="password"
                    placeholder='비밀번호 확인'
                    value={passwordCheck}
                    onChange={handlePasswordCheck}
                  />
                <Button className='id-check' variant="primary" onClick={onClickPwDoubleCheck}>확인</Button>
                </div>
                <Overlay target={targetPw.current} show={showPwCheck} placement="top-end">
                  {(props) => (
                    <Tooltip id="nick-alert" {...props}>
                  비밀번호 확인 완료!
                    </Tooltip>
                  )}
                </Overlay>
                <Overlay target={targetPw.current} show={showPwCheck2} placement="top-end">
                  {(props) => (
                    <Tooltip id="nick-alert" {...props}>
                  비밀번호가 일치하지 않아요.
                    </Tooltip>
                  )}
                </Overlay>
                <Overlay target={targetPw.current} show={showPwCheck3} placement="top-end">
                  {(props) => (
                    <Tooltip id="nick-alert" {...props}>
                  4~10자리 비밀번호를 <br/> 사용해 주세요.
                    </Tooltip>
                  )}
                </Overlay>
                
            </div>
        </div>
      </div>
        
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

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>회원가입 완료!</Modal.Title>
        </Modal.Header>
        <Modal.Body>회원가입이 완료되었어요.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            handleClose2();
            goLogin();
            }}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  )
}

export default Join