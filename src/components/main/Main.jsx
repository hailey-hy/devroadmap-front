import React, {useEffect} from 'react'
import './main.css'
import Status from './Status'
import Roadmap from '../roadmap/Roadmap'
import { loginCheck } from '../../util/loginCheck'

const Main = () => {
  
  // loginCheck();

  return (
    <>
      <section id='main'>
        <Status/>
      </section>
      <section>
        <Roadmap></Roadmap>
      </section>
    </>
  )
}

export default Main