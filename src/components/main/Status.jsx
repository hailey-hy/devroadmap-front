import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux';
import instance from '../../api';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Status = (props) => {

  //공부 분야 관련
  let field = useSelector((state) => state.field);
  const friendField = props.friendField
  const rate = useSelector((state) => state.progress);
  console.log(props.friendField)
  console.log(props.friend)

    // if(props.friend === true){
    //   let field = props.friend-field
    // } else {
    //   let field = useSelector((state) => state.field);
    // }


  const isFront = () => {
    if((props.friend === true && props.friendField === 'front') || (field == 'front')){
      return true
    } else{
      return false
    }
  }

      //진도율 관련
      const dispatch = useDispatch();
    
      useEffect(() => {
        instance({
          url: '/progressrate',
        }).then(response => {
          console.log(response.data)
          // setRate(response.data.progressRate);
          dispatch({type: 'load-progress', progress: response.data.progressRate})
        })
      }, [rate])

  if(props.friend === true){
    console.log(props)
    return(
      <div className='container-status'>
          <div className="container-status-main">
          <Badge pill bg={isFront() ? 'primary' : 'success'}>{props.friendField}</Badge>
              
          </div>
      </div>
    )
  }
  else {
    return (
      <div className='container-status'>
          <div className="container-status-main">
          <Badge pill bg={isFront() ? 'primary' : 'success'}>{field}</Badge>
              <h5 id="status-d-day">공부를 시작한지 {}일</h5>
          </div>
          <h5 id="status-percent">전체 진도율 {rate}%</h5>
      </div>
      
    )
  }
  
}

export default Status