import React, {useState, useEffect} from 'react';
import {BsJustify} from 'react-icons/bs'
import {IoClose, IoGolfOutline} from 'react-icons/io5'
import { Button, Badge, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './nav.css'
import { loginCheck } from '../../util/loginCheck'
import {createStore} from 'redux';
import {Provider, useSelector, useDispatch, connect} from 'react-redux';
import axios from 'axios';
import basicImg from '../../assets/basic-profile.png'

const Nav = (props) => {
  const [userDetail, setUserDetail] = useState('');
  const [email, setEmail] = useState('이메일');
  const [nickname, setNickname] = useState('닉네임');
  const [profile, setProfile] = useState('');
  const [field, setField] = useState('front');
  // const [userJwt, setUserJwt] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://localhost:8080/user/details',
      params:{
        "Authorization": "Bearer " + localStorage.getItem("user")
      }
    }).then((response) => {
      setNickname(response.data.nickname);
      setEmail(response.data.email);
      setField(response.data.field);
      if(response.data.profile == undefined) {
        setProfile(basicImg);
      } else {
        setProfile(response.data.profile)
      }
      setUserDetail(response.data);
      dispatch({type: 'load', nickname: nickname, email: email, field: field, profile: profile});

    }).catch((err) => {
      console.error(err)
    });
  },[nickname])
  



  const [isOpen, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(isOpen => !isOpen);
    // props.navOpen(!isOpen);
  }

  const navigate = useNavigate();

  const isFront = () => {
    if(field == 'front'){
      return true
    } else{
      return false
    }
  }

  const logout = () => {
    toggleMenu();
    localStorage.removeItem("user");
     navigate('/');
  }

  const goLogin = () => {
    navigate('/signin');
  }

  const goMain = () => {
    navigate('/');
  }

  const goEdit = () => {
    navigate('/edit');
  }

  const goRoadmap = () => {
    navigate('/')
  }

  const goRecord = () => {
    navigate('/record')
  }

  const goFriend = () => {
    navigate('/friend')
  }

  // 회원 탈퇴 모달 

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showSecond, setShowSecond] = useState(false);

  const handleCloseSecond = () => setShow(false);
  const handleShowSecond = () => setShow(true);

  // 회원 탈퇴 비즈니스 로직

  const userWithdraw = () => {
    axios({
      method: 'post',
      url: '/edit/withdraw',
      params: {
        "Authorization": "Bearer " + localStorage.getItem("user")
      }
    }).then((response) => {
      if(response.data == 'withdraw success'){
        console.log('탈퇴')
        setShowSecond(true);
      }
    })
  }

  if(localStorage.getItem("user")){
  return (
    <nav>
      <ul className='header-wrapper'>
        <BsJustify id='nav-icon' className={isOpen ? 'white' : 'black'} onClick={() => toggleMenu()}/>
      </ul>
      <ul id='nav-content' className={isOpen ? "show-menu" : "hide-menu"}>
        <IoClose id='nav-cancel' onClick={() => toggleMenu()}/>
        
        {/* 유저 정보 요약 창 */}
        <div id="container-user">
          <img src={profile} alt="" id="user-profile" />
          <div id="contianer-user-detail">
            <Badge pill bg={isFront() ? 'primary' : 'success'}>{field}</Badge>
            <h5 id='user-nickname'>{nickname}님</h5>
          </div>
          <Button id='logout' onClick={() => {
            logout()
            toggleMenu()
          }}>로그아웃</Button>
        </div>
        
        
        {/* <div id="goEdit"> */}
        <h3 class='go-tab' onClick={() => {
            goMain()
            toggleMenu()
          }}>메인</h3>
        <h3 class='go-tab' onClick={() => {
          goRoadmap()
          toggleMenu()
        }}>로드맵</h3>
        <h3 class='go-tab' onClick={() => {
          goEdit()
          toggleMenu()
        }}>회원 정보 수정</h3>
        <h3 class='go-tab' onClick={() => {
          goRecord()
          toggleMenu()
        }}>정원 기록</h3>
        <h3 class='go-tab' onClick={() => {
          goFriend()
          toggleMenu()
        }}>친구 목록</h3>

        {/* </div> */}
        <Button id="user-delete" variant='warning' onClick={handleShow}>회원 탈퇴</Button>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>회원 탈퇴</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          정말 회원을 탈퇴할까요?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            handleClose();
            
            }}>
            취소
          </Button>
          <Button variant="warning" onClick={userWithdraw}>탈퇴</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showSecond}
        onHide={handleCloseSecond}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>회원 탈퇴 완료!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          회원 탈퇴되었어요.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            handleCloseSecond();
            logout();
            goLogin();
            }}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
      </ul>

    </nav>  
  )}

  else{
    return (
      <nav>
      <ul className='header-wrapper'>
        <BsJustify id='nav-icon' className={isOpen ? 'white' : 'black'} onClick={() => toggleMenu()}/>
      </ul>
      <ul id='nav-content' className={isOpen ? "show-menu" : "hide-menu"}>
        <IoClose id='nav-cancel' onClick={() => toggleMenu()}/>
        <Button onClick={() => {
            goLogin()
            toggleMenu()
          }}>로그인</Button>
      </ul>
    </nav> 
    )
  }
}

export default Nav