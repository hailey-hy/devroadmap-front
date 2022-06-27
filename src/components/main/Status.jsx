import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux';

const Status = (prop) => {

  const field = useSelector((state) => state.field);

  const isFront = () => {
    if(field == 'front'){
      return true
    } else{
      return false
    }
  }

  return (
    <div className='container-status'>
        <div className="container-status-main">
        <Badge pill bg={isFront() ? 'primary' : 'success'}>{field}</Badge>
            <h5 id="status-d-day">현재 진도를 시작한지 {}일</h5>
        </div>
        <h5 id="status-percent">진도율 상위 {}%</h5>
    </div>
  )
}

export default Status