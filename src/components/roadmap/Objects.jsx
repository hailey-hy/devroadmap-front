import axios from 'axios';
import React, {} from 'react'
import { useState } from 'react';
import './roadmap.css'

const Objects = (props) => {

  // console.log(props.number)

    const onCheck = (index) => {
      const target = document.getElementById(index);
      if(target.classList.contains('un-checked')){
        target.classList.remove('un-checked');
        target.classList.add('checked');
        add(index);
      } else {
        target.classList.add('un-checked');
        target.classList.remove('checked');
        withdraw(index);
      }


    }

    const add = (index) => {
      axios({
        method: 'post',
        url: '/subject/complete/add',
        headers: {
          "Content-Type": "application/text",
          "Authorization": "Bearer " + localStorage.getItem("user")
        },
        params: {
          'subject': index + 1
        }
      }).then(response => {
        console.log('체크 성공');
      })
    }

    const withdraw = (index) => {
      axios({
        method: 'post',
        url: '/subject/complete/withdraw',
        headers: {
          "Content-Type": "application/text",
          "Authorization": "Bearer " + localStorage.getItem("user")
        },
        params: {
          'subject': index + 1
        }
      }).then(response => {
        console.log('체크 해제');
      })
    }

  return (
        <div className='bubble-object un-checked' id={props.number} tabindex='1' onClick={() => {
            onCheck(props.number);
        }}>
            <h5>{props.number + 1}</h5>
            <h5 className='bubble-subject'>{props.name}</h5>
        </div>
  )
}

export default Objects