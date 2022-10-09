import React, {useState, useEffect, useRef} from 'react'
import { Button, ButtonGroup, ToggleButton, Modal, Tooltip, Overlay } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import instance from '../../api';
import './edit.css'
import { profileCheck } from '../../util/profileCheck';
import { useSelector } from 'react-redux';
import { upload } from '@testing-library/user-event/dist/upload';

//회원 정보 수정 페이지

const Edit = () => {

  const userNickname = useSelector((state) => state.nickname);
  const userProfile = useSelector((state) => state.profile);
  const userField = useSelector((state) => state.field);

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
      setPassword(e.target.value)
      
  }

  const handlePasswordCheck = (e) => {
    setPasswordCheck(e.target.value)
}

  //프로필 사진

  const [files, setFiles] = useState('');

  const onLoadFile = (e) => {
    const file = e.target.files;
    setFiles(file);
    preview();
  }

  //프로필 사진 미리보기
  useEffect(() => {
    preview();

    return () => preview();
  }, [files]);

  const preview = () => {
    if(!files) return false;

    const hide = document.querySelector('#original-img')
    const imgEL = document.querySelector('.img-box');
    if (hide != null){
      hide.style.display = 'none'
      const reader = new FileReader();

    reader.onload = () => {
        imgEL.style.backgroundImage = `url(${reader.result})`
    };
    if(files[0] != null){
    reader.readAsDataURL(files[0]);
    }
    }

  }

  //공부 유형
  const [radioSecValue, setRadioSecValue] = useState(userField);

  const radiosSec = [
    { name: 'front', value: 'front' },
    { name: 'back', value: 'back' }
  ];

  // const radioTargets = document.querySelectorAll('.btn-check');
  // radioTargets.forEach(target => {
  //   if(target.value == userField){
  //     target.setAttribute('active', '');
  //   }
  // });

  //중복 확인 관련
  const [nickCheck, setNickCheck] = useState(false);
  const [pwCheck, setPwCheck] = useState(false);
  const [pwDoubleCheck, setPwDoubleCheck] = useState(false);

  

    // 닉네임 확인 툴팁

    const [showNickCheck, setShowNickCheck] = useState(false);
    const [showNickCheck2, setShowNickCheck2] = useState(false);
    const target = useRef(null);

  //닉네임 확인
  const onClickNickCheck = () => {
    instance({
      method: 'post',
      url: '/edit/nickname/check',
      params: {
        "nickname" : nickname
      }
    }).then(response => {
      if(response.data == 'ok'){
        setNickCheck(true);
        setShowNickCheck(true);
        setShowNickCheck2(false);
      } else {
        setShowNickCheck2(true);
        setShowNickCheck(false);
      }
    }).catch(err => {
      console.error(err);
    });
  }

  //비밀번호 확인 툴팁
  const [showPwCheck, setShowPwCheck] = useState(false);
  const [showPwCheck2, setShowPwCheck2] = useState(false);
  const [showPwCheck3, setShowPwCheck3] = useState(false);
  const targetPw = useRef(null);


  //비밀번호 자리 수 확인
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

  // 모달창 관련
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);


   //수정하기 버튼

  //  const [ok, setOk] = useState(false);
  var ok = false;
   const onClickEdit = () => {
    //닉네임 중복, 비밀번호 자리수, 비밀번호 확인 여부 확인
    if(nickname.length > 0){
      // setOk(ok => false);
      ok = false
      if(nickCheck){
        // setOk(ok => true);
        ok = true
      } 
    }

    if(password.length > 0){
      // setOk(ok => false
      ok = false
      if(pwCheck){
        // setOk(ok => true);
        ok = true
      }
    }

    if(nickname.length == 0 && nickname.length == 0){
      ok = true
    }

    doEdit();

    
  }

  const doEdit = () => {
    console.log(nickname)
    console.log(nickCheck)
    console.log(password.length)
    console.log(pwCheck)
    console.log(ok)
    if(ok){
      console.log(radioSecValue);
      const formdata = new FormData();
      formdata.append('uploadImage', files[0]);
      console.log(formdata)
      for (let value of formdata.values()) {
        console.log(value);
      }
  
      instance({
        method: 'post',
        url: '/edit/userdetails',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        params: {
          "nickname" : nickname,
          "email" : email,
          "password" : password,
          "profile" : {formdata},
          "field" : radioSecValue
        }
      }).then(response => {
        handleShow();
      }).catch(err => {
        console.error(err);
      });
    } else {
      handleShow2();
    }
  }
    


  return (
    <section id="edit">
    <div className='container-white container'>
      <h3 id="white-title">회원 정보 수정</h3>
      <div className="chunck-container-edit">
        <div className='chunck-for-divide'>
          <div className="detail-container-edit">
            <h5 className='detail-title'>프로필 사진</h5>
            <form className='img-container img-container-edit'>
              <div id="img-edit" className="img-box">
                <img src={profileCheck(userProfile)} alt="" id='original-img'/>
              </div>
              <Form.Group controlId="formFileSm" className="mb-3" id='img-upload' accept='image/*' onChange={onLoadFile}>
                {/* <Form.Label>Default file input example</Form.Label> */}
                <Form.Control type="file" size="sm"/>
              </Form.Group>
              {/* <input id="img-upload" type="file" accept='image/*' onChange={onLoadFile}/> */}
            </form>
          </div>
          <div className="detail-container-edit">
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
        <div className='chunck-for-divide'>
          <div className="detail-container-edit">
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
            <div ref={target}>
            <div className='divider'>
              <Form.Control
                  className='join-input'
                  type="text"
                  placeholder={userNickname}
                  value={nickname}
                  onChange={handleNickname}
                />
              {/* <input className='login-input' type='text' value={nickname} onChange={handleNickname} placeholder={userNickname}/> */}
              <Button className='id-check' variant="primary" onClick={onClickNickCheck}>확인</Button>
            </div>
            </div>
          </div>
          <div className="detail-container-edit">
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

            <Button className='id-check' variant="primary" onClick={onClickPwDoubleCheck}>확인</Button>
            </div>
          </div>
        </div> 
      </div>
      <Button id='btn-edit' onClick={onClickEdit}>수정하기</Button>

      {/* 경고창 */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>회원 정보 수정 완료!</Modal.Title>
        </Modal.Header>
        <Modal.Body>입력하신 정보로 회원 정보가 수정되었어요.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>회원정보 수정 양식 미완성!</Modal.Title>
        </Modal.Header>
        <Modal.Body>확인되지 않은 항목이 있어요. <br/> 정상적인 회원 정보 수정을 위해 확인을 완료해 주세요.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </section>
  )
}

export default Edit