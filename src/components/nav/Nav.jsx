import React, {useState} from 'react'
import {BsJustify} from 'react-icons/bs'
import {IoClose} from 'react-icons/io5'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './nav.css'

const Nav = (props) => {
  const [isOpen, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(isOpen => !isOpen);
    props.navOpen(!isOpen);
  }

  const navigate = useNavigate();

  const logout = () => {
    toggleMenu();
    localStorage.removeItem("user");
     navigate('/');
  }

  return (
    <nav>
      <ul className='header-wrapper'>
        <BsJustify id='nav-icon' className={isOpen ? 'white' : 'black'} onClick={() => toggleMenu()}/>
      </ul>
      <ul id='nav-content' className={isOpen ? "show-menu" : "hide-menu"}>
        <IoClose id='nav-cancel' onClick={() => toggleMenu()}/>
        <Button onClick={logout}>로그아웃</Button>
      </ul>
    </nav>  
  )
}

export default Nav