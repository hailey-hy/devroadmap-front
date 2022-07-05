import React, {useState, useEffect} from 'react'
import { Button, ButtonGroup, ToggleButton, Modal } from 'react-bootstrap'
import axios from 'axios';
import './edit.css'
import { nicknameCheck } from '../../util/nicknameCheck';
import { useSelector } from 'react-redux';

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

  const [ok, setOk] = useState(true);

  //닉네임 확인
  const onClickNickCheck = () => {
    axios({
      method: 'post',
      url: 'https://localhost:8080/edit/nickname/check',
      params: {
        "Authorization": "Bearer " + localStorage.getItem("user"),
        "nickname" : nickname
        // "Content-Type": "multipart/form-data"
      }
    }).then(response => {
      // if(response.data == 'ok'){
      //   setNickCheck(true);
      // }
    }).catch(err => {
      console.error(err);
    });
  }

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

   //수정하기 버튼
   const onClickEdit = () => {
    //닉네임 중복, 비밀번호 자리수, 비밀번호 확인 여부 확인
    if(nickname){
      setOk(false);
      if(nickCheck){
        setOk(true);
      } else {
        //닉네임 중복 확인하라는 경고창
      }
    }

    if(ok){
    console.log(radioSecValue);
    const formdata = new FormData();
    formdata.append('uploadImage', files[0]);

    axios({
      method: 'post',
      url: 'https://localhost:8080/edit/userdetatils',
      headers: {
        "Content-Type": "multipart/form-data"
      },
      params: {
        "Authorization": "Bearer " + localStorage.getItem("user"),
        "nickname" : nickname,
        "email" : email,
        "password" : password,
        "profile" : formdata,
        "field" : radioSecValue
      }
    }).then(response => {
      handleShow();
    }).catch(err => {
      console.error(err);
    });
  }
}

  return (
    <div id="edit">
    <div className='container-white container'>
      <h3 id="white-title">회원 정보 수정</h3>
      <div className="chunck-container-edit">
        <div className='chunck-for-divide'>
          <div className="detail-container-edit">
            <h5 className='detail-title'>프로필 사진</h5>
            <form className='img-container'>
              <div id="img-edit" className="img-box" backgroundImage={userProfile}></div>
              <input id="img-upload" type="file" accept='image/*' onChange={onLoadFile}/>
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
            <input className='login-input' type='text' value={nickname} onChange={handleNickname} placeholder={userNickname}/>
            <Button className='id-check' variant="primary" onClick={onClickNickCheck}>확인</Button>
          </div>
          <div className="detail-container-edit">
            <div id="detail-pw">
              <h5 className='detail-title pw'>비밀번호</h5>
              <h5 className='pw' id='pw-alert'></h5>
            </div>
            <input id='input-pw' className='login-input' type='password' value={password} onChange={handlePassword} placeholder='PW'/>
            <input className='login-input' type='password' value={passwordCheck} onChange={handlePasswordCheck} placeholder='PW CHECK'/>
            <Button className='id-check' variant="primary" onClick={onClickPwDoubleCheck}>확인</Button>
              
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
    </div>
    </div>
  )
}

export default Edit