import React, {useState} from 'react'
import {BsJustify} from 'react-icons/bs'
import {IoClose, IoGolfOutline} from 'react-icons/io5'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './nav.css'
import { loginCheck } from '../../util/loginCheck'

const Nav = (props) => {

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
    navigate('/login');
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

  if(localStorage.getItem("user")){
  return (
    <nav>
      <ul className='header-wrapper'>
        <BsJustify id='nav-icon' className={isOpen ? 'white' : 'black'} onClick={() => toggleMenu()}/>
      </ul>
      <ul id='nav-content' className={isOpen ? "show-menu" : "hide-menu"}>
        <IoClose id='nav-cancel' onClick={() => toggleMenu()}/>
        <Button onClick={() => {
            logout()
            toggleMenu()
          }}>로그아웃</Button>
        {/* <div id="goEdit"> */}
        <h3 class='go-tab' onClick={() => {
            goMain()
            toggleMenu()
          }}>메인</h3>
        <h3 class='go-tab' onClick={() => {
          goMain()
          toggleMenu()
        }}>로드맵</h3>
        <h3 class='go-tab' onClick={() => {
          goEdit()
          toggleMenu()
        }}>회원 정보 수정</h3>
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