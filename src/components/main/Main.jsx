import React from 'react'
import './main.css'
import Header from '../header/Header'
import Status from './Status'
import Login from './Login'

const Main = () => {
  return (
    <>
      <section id='main'>
        <Status/>
        <Login/>
      </section>
    </>
  )
}

export default Main