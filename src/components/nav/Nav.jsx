import React, {useState} from 'react'
import {BsJustify} from 'react-icons/bs'
import {IoClose, IoGolfOutline} from 'react-icons/io5'
import { Button, Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './nav.css'
import { loginCheck } from '../../util/loginCheck'
import { useSelector } from 'react-redux'

const Nav = (props) => {

  const nickname = useSelector((state) => state.nickname);
  const profile = useSelector((state) => state.profile);
  const field = useSelector((state) => state.field);

  const [isOpen, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(isOpen => !isOpen);
    // props.navOpen(!isOpen);
  }

  const navigate = useNavigate();

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
            <Badge pill >{field}</Badge>
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
          toggleMenu()
        }}>친구 목록 (임시)</h3>

        {/* </div> */}
        <Button id="user-delete" variant='warning'>회원 탈퇴</Button>
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