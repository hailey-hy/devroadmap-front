import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

const Status = (prop) => {
  return (
    <div className='container-status'>
        <div className="container-status-main">
            <Badge pill background-color={prop}>Front</Badge>{' '}
            <h5>다음 진도까지 {}일</h5>
        </div>
        <h5>진도율 상위 {}%</h5>
    </div>
  )
}

export default Status