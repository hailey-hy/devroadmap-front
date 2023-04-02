import React, {useState, useEffect} from 'react';
import {BsJustify} from 'react-icons/bs'
import {IoClose, IoGolfOutline} from 'react-icons/io5'
import { Button, Badge, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './nav.css'
import { loginCheck } from '../../util/loginCheck'
import {createStore} from 'redux';
import {Provider, useSelector, useDispatch, connect} from 'react-redux';
import instance from '../../api';
import basicImg from '../../assets/basic-profile.png'
import { profileCheck } from '../../util/profileCheck';
import { NAV, NAV_ALERT } from '../UI/Constants'

const Nav = (props) => {

  //내비게이션 바 내 유저 정보 불러오기 관련

  const [userDetail, setUserDetail] = useState('');
  const [email, setEmail] = useState('이메일');
  const [nickname, setNickname] = useState('닉네임');
  const [profile, setProfile] = useState('');
  const [field, setField] = useState('');
  
  const dispatch = useDispatch();

  useEffect(() => {
    instance({
      url: '/user/details',
    }).then((response) => {
      setNickname(response.data.nickname);
      setEmail(response.data.email);
      setField(response.data.field);
      setProfile(profileCheck(response.data.profile));
      setUserDetail(response.data);
      dispatch({type: 'load', nickname: nickname, email: email, field: field, profile: profile});

    }).catch((err) => {
      console.error(err)
    });
  },[field])

  //유저 분야 판단 함수

  const isFront = () => {
    if(field == 'front'){
      return true
    } else{
      return false
    }
  }
  

  //내비게이션 바 열고 닫기 관련 

  const [isOpen, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(isOpen => !isOpen);
  }

  //내비게이션 바가 열려 있을 때 스크롤을 내리면 내비게이션 바를 닫음

const [scroll, setScroll] = useState(false);

useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); //clean up
    };
  }, []);

const handleScroll = () => {
	// 스크롤이 Top에서 50px 이상 내려오면 true값을 useState에 넣어줌
    if(window.scrollY >= 40){
      setScroll(true);
      setMenu(false);
      console.log(scroll)
    }else{
    // 스크롤이 50px 미만일경우 false를 넣어줌
      setScroll(false);
    }
  };
  

  //로그아웃 함수
  const logout = () => {
    toggleMenu();
    localStorage.removeItem("user");
    window.location.replace('/'); //강제 새로고침
  }

  //내비게이션 바 바로가기 관련

  const navigate = useNavigate();

  const goLogin = () => {
    navigate('/signin');
  }

  const goMain = () => {
    navigate('/');
  }

  const goEdit = () => {
    navigate('/edit');
  }

  const goRecord = () => {
    navigate('/record')
  }

  const goFriend = () => {
    navigate('/friend')
  }

  const goNote = () => {
    navigate('/note')
  }

  // 회원 탈퇴 모달 

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showSecond, setShowSecond] = useState(false);

  const handleCloseSecond = () => setShow(false);
  const handleShowSecond = () => setShow(true);

  // 회원 탈퇴 함수

  const userWithdraw = () => {
    instance({
      method: 'post',
      url: '/edit/withdraw',
    }).then((response) => {
      if(response.data == 'ok'){
        setShowSecond(true);
        localStorage.removeItem("user");
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
          <img src={profile} alt="" className="user-profile" />
          <div id="contianer-user-detail">
            <Badge pill bg={isFront() ? 'primary' : 'success'}>{field}</Badge>
            <h5 id='user-nickname'>{nickname}{NAV.USER}</h5>
          </div>
          <Button id='logout' onClick={() => {
            logout()
            toggleMenu()
          }}>{NAV.LOGOOUT}</Button>
        </div>
        
        
        <h3 class='go-tab' onClick={() => {
            goMain()
            toggleMenu()
          }}>{NAV.MAIN}</h3>
        <h3 class='go-tab' onClick={() => {
          goRecord()
          toggleMenu()
        }}>{NAV.RECORD}</h3>
        <h3 class='go-tab' onClick={() => {
          goFriend()
          toggleMenu()
        }}>{NAV.FRIEND}</h3>
        <h3 class='go-tab' onClick={() => {
          goNote()
          toggleMenu()
        }}>{NAV.NOTE}</h3>
        <h3 class='go-tab' onClick={() => {
          goEdit()
          toggleMenu()
        }}>{NAV.EDIT}</h3>

        <Button id="user-delete" variant='warning' onClick={handleShow}>{NAV.DELETE}</Button>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{NAV_ALERT.DEL_TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {NAV_ALERT.DEL_BODY}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            handleClose();
            
            }}>
            취소
          </Button>
          <Button variant="warning" onClick={userWithdraw}>{NAV.DELETE}</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showSecond}
        onHide={handleCloseSecond}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{NAV_ALERT.DEL_DONE_TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {NAV_ALERT.DEL_DONE_BODY}
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
          }}>{NAV.LOGIN}</Button>
      </ul>
    </nav> 
    )
  }
}

export default Nav