import axios from 'axios';
import React, {} from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './roadmap.css'

const Objects = (props) => {

  // console.log(props.number)

  const field = useSelector(state => state.field);

  

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
      console.log(index)
      //튤립, 민들레, 토끼풀
      if(index == 10) {
        var targetId = 'img' + 11;
        var target = document.getElementById(targetId);
        target.classList.remove('hide');

        var targetId = 'img' + 12;
        var target = document.getElementById(targetId);
        target.classList.remove('hide');

        var targetId = 'img' + 13;
        var target = document.getElementById(targetId);
        target.classList.remove('hide');

        var subject = index + 1
      } else {
        if(index == 21 && field == 'front') {
          var targetId = 'img' + 6;
        }
        else if(index < 10){
          var targetId = 'img' + (index + 1);
          var subject = index + 1
        }else if(index >= 11){
          var targetId = 'img' + (index + 3);
          var subject = index + 3
        }
        var target = document.getElementById(targetId);
        target.classList.remove('hide');
      }

      const ladder = document.getElementById('img16');
      const gardener = document.getElementById('img18');
      const sittingGardener = document.getElementById('img22');

      if(!ladder.classList.contains('hide') 
        && !gardener.classList.contains('hide')){
          ladder.classList.add('hide');
          gardener.classList.add('hide');
          sittingGardener.classList.remove('hide');
      }
      axios({
        method: 'get',
        url: '/subject/complete/add',
        params: {
          "Authorization": "Bearer " + localStorage.getItem("user"),
          'subject': subject
        }
      }).then(response => {
        console.log('체크 성공');
      })
    }

    const withdraw = (index) => {
      if(index == 10) {
        var targetId = 'img' + 11;
        var target = document.getElementById(targetId);
        target.classList.add('hide');

        var targetId = 'img' + 12;
        var target = document.getElementById(targetId);
        target.classList.add('hide');

        var targetId = 'img' + 13;
        var target = document.getElementById(targetId);
        target.classList.add('hide');

        var subject = index + 1
      } else {
        if(index == 21 && field == 'front') {
          var targetId = 'img' + 6;
        }
        else if(index < 10){
          var targetId = 'img' + (index + 1);
          var subject = index + 1
        }else if(index >= 11){
          var targetId = 'img' + (index + 3);
          var subject = index + 3
        }
        var target = document.getElementById(targetId);
        target.classList.add('hide');
      }

      const ladder = document.getElementById('img16');
      const gardener = document.getElementById('img18');
      const sittingGardener = document.getElementById('img22');

      if(!sittingGardener.classList.contains('hide') 
        && index == 15){
          ladder.classList.remove('hide');
          sittingGardener.classList.add('hide');
      } else if (!sittingGardener.classList.contains('hide') 
        && index == 13){
          gardener.classList.remove('hide');
          sittingGardener.classList.add('hide');
        } 
        // else if (ladder.classList.contains('hide')
        //   && gardener.classList.contains('hide')){
        //     gardener.classList.add('hide');
        //     ladder.classList.add('hide');
        // }

      axios({
        method: 'get',
        url: '/subject/complete/withdraw',
        params: {
          "Authorization": "Bearer " + localStorage.getItem("user"),
          'subject': subject
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