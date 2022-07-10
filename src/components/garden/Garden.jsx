import React, { useState } from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import './garden.css'
import grass from '../../assets/img-garden/땅.png';
import sun from '../../assets/img-garden/해.png';
import cloud1 from '../../assets/img-garden/구름1.png';
import cloud2 from '../../assets/img-garden/구름2.png';
import cloud3 from '../../assets/img-garden/구름3.png';
import cloud4 from '../../assets/img-garden/구름4.png';
import cloud5 from '../../assets/img-garden/구름5.png';
import bird from '../../assets/img-garden/새.png'
import img1 from '../../assets/img-garden/소나무.png';
import img2 from '../../assets/img-garden/꽃나무.png';
import img3 from '../../assets/img-garden/울타리.png';
import img4 from '../../assets/img-garden/새집.png';
import img5 from '../../assets/img-garden/토끼.png';
import img6 from '../../assets/img-garden/연못.png';
import img7 from '../../assets/img-garden/개구리.png';
import img8 from '../../assets/img-garden/분수대.png';
import img9 from '../../assets/img-garden/두더지.png';
import img10 from '../../assets/img-garden/벤치의자.png';
import img11a from '../../assets/img-garden/튤립.png';
import img11b from '../../assets/img-garden/민들레.png';
import img11c from '../../assets/img-garden/토끼풀.png';
import img12 from '../../assets/img-garden/돌.png';
import img13 from '../../assets/img-garden/덤불.png';
import img14 from '../../assets/img-garden/사다리.png';
import img15 from '../../assets/img-garden/다람쥐 그네.png';
import img16 from '../../assets/img-garden/정원사 앉아있는 버전.png';
import img17 from '../../assets/img-garden/개미.png';
import img18 from '../../assets/img-garden/지렁이.png';
import img19 from '../../assets/img-garden/연꽃.png';
import img20 from '../../assets/img-garden/정원사 사다리 올라가는 버전.png';
import { useEffect } from 'react';
import axios from 'axios';

// 개구리 3

const Garden = () => {


  const field = useSelector(state => state.field);
  console.log(field);

  const frontList = useSelector(state => state.frontList);
  const backList = useSelector(state => state.backList);

  // const [savedItem, setSavedItem] = useState([]);

  const item = []

  const imgList = ['소나무', '꽃나무', '울타리', '새집', '토끼', '연못', '개구리', '분수대', '두더지', '벤치의자', '튤립', 
  '민들레', '토끼풀', '돌', '덤불', '사다리', '다람쥐 그네', '정원사 앉아있는 버전', '개미', '지렁이', '연꽃']

  for(let i = 1; i <= imgList.length; i++){
    var imgId = 'img' + i;
    var imgSrc = imgList[i - 1];
    if(field === 'front'){
      if(i <= 11){
        var msg = frontList[i - 1];
      }
      else if(i == 21) {
        var msg = frontList[5];
      }else if(i >= 14){
        var msg = frontList[i - 3];
      }
    } else {
      if(i <= 11){
        var msg = backList[i - 1];
      }else if(i >= 14){
        var msg = backList[i - 3];
      }
    }
    item.push(
      <OverlayTrigger
          overlay={
            <Tooltip id={`tooltip-top`} className='tooltips'>
              <strong>{msg}</strong>
            </Tooltip>
          }
        >
      <img id={imgId} class='garden-img hide' src={require(`../../assets/img-garden/${imgSrc}.png`)} alt={i}/>
      </OverlayTrigger>
    )
  }


  // useEffect(() => {
  //   axios({
  //     method: 'get',
  //     url: 'https://localhost:8080/history',
  //     params: {
  //       "Authorization": "Bearer " + localStorage.getItem("user")
  //     }
  //   }).then(response => {
  //     console.log(response.data.complete_subjects)
  //     setSavedItem(response.data.complete_subjects)
  //   })
  // }, [])

  // for(let i = 1; i < savedItem.length; i++){
  //   if(i in savedItem[i].object){
  //   var target = document.getElementById('img' + i);
  //   target.classList.remove('hide');
  //   target.classList.add('show');
  //   }
  // }
  
  
    return (
        <>
        <div id="container-img">
          <img id='grass' class='garden-img' src={grass} alt=""/>
          <img id='sun' class='garden-img' src={sun} alt=""/>
          <img id='cloud1' class='garden-img' src={cloud1} alt=""/>
          <img id='cloud2' class='garden-img' src={cloud2} alt=""/>
          <img id='cloud3' class='garden-img' src={cloud3} alt=""/>
          <img id='cloud4' class='garden-img' src={cloud4} alt=""/>
          <img id='cloud5' class='garden-img' src={cloud5} alt=""/>
          <img id='bird' class='garden-img' src={bird} alt=""/>
        </div>
        <div id="container-garden">
          {item}
          <img id='img22' class='garden-img hide' src={img20} alt='22'/>
        </div>  
        </>
        
      )
    } 
  

export default Garden