import React, {useState, useEffect} from 'react'
import Nav from '../nav/Nav'
import {HEADER} from '../UI/Constants'
import './header.css'

//메인 페이지 헤더

const Header = () => {

  
  return (
    <header>
      <div className="container-header">
        <h1 className='header-title'>{HEADER.TITLE}</h1>
        <Nav/>
      </div>
    </header>
  )
}

export default Header