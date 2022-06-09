import React, {useEffect} from 'react'
import './main.css'
import Status from './Status'
import { loginCheck } from '../../util/loginCheck'

const Main = () => {
  
  loginCheck();

  return (
    <>
      <section id='main'>
        <Status/>
      </section>
    </>
  )
}

export default Main