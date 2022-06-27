import React, {useState, useEffect} from 'react'
import Nav from '../nav/Nav'
import './header.css'

//메인 페이지 헤더

const Header = () => {

  
  return (
    <header>
      <div className="container-header">
        <h1 className='header-title'>(가제)개발 정원</h1>
        {/* <Nav navOpen= {navOpen}/> */}
        <Nav/>
      </div>
    </header>
  )
}

export default Header