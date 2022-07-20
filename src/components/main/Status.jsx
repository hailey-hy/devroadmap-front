import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const Status = (prop) => {

  //공부 분야 관련

  const field = useSelector((state) => state.field);

  const isFront = () => {
    if(field == 'front'){
      return true
    } else{
      return false
    }
  }

  //진도율 관련

  const [rate, setRate] = useState(0);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://localhost:8080/progressrate',
      params: {
        "Authorization": "Bearer " + localStorage.getItem("user")
      }
    }).then(response => {
      console.log(response.data)
      setRate(response.data.progressRate);
    })

  }, [])

  return (
    <div className='container-status'>
        <div className="container-status-main">
        <Badge pill bg={isFront() ? 'primary' : 'success'}>{field}</Badge>
            <h5 id="status-d-day">현재 진도를 시작한지 {}일</h5>
        </div>
        <h5 id="status-percent">전체 진도율 {rate}%</h5>
    </div>
  )
}

export default Status