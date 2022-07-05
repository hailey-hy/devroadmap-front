import React from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import './garden.css'
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
import { useEffect } from 'react';
import axios from 'axios';

// 개구리 3

const Garden = () => {


  const field = useSelector(state => state.field);
  console.log(field);

  const frontList = useSelector(state => state.frontList);
  const backList = useSelector(state => state.backList);

  const item = []

  const imgList = ['소나무', '꽃나무', '울타리', '새집', '토끼', '연못', '개구리', '분수대', '두더지', '벤치의자', '튤립', 
  '민들레', '토끼풀', '돌', '덤불', '사다리', '다람쥐 그네', '정원사 앉아있는 버전', '개미', '지렁이', '연꽃']

  for(let i = 1; i <= imgList.length; i++){
    var imgId = 'img' + i;
    var imgSrc = imgList[i - 1];
    if(field === 'front'){
      if(i < 11){
        var msg = frontList[i - 1];
      }else if(i == 21) {
        var msg = frontList[5];
      }else if(i >= 14){
        var msg = frontList[i - 3];
      }
    } else {
      if(i < 11){
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
      <img id={imgId} class='garden-img' src={require(`../../assets/img-garden/${imgSrc}.png`)} alt={i}/>
      </OverlayTrigger>
    )
  }


  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://localhost:8080/history/subject/compelete/check',
      params: {
        "Authorization": "Bearer " + localStorage.getItem("user")
      }
    }).then(response => {
      console.log(response.data)
    })
  })

  
  
    return (
        <>  
          {item}
          {/* <img id='img1' class='garden-img' src={img1} alt="1"/>
          <img id='img2' class='garden-img' src={img2} alt="2"/>
          <img id='img3' class='garden-img' src={img3} alt="3"/>
          <img id='img4' class='garden-img' src={img4} alt="4"/>
          <img id='img5' class='garden-img' src={img5} alt="5"/>
          <img id='img6' class='garden-img' src={img6} alt="6"/>
          <img id='img7' class='garden-img' src={img7} alt="7"/>
          <img id='img8' class='garden-img' src={img8} alt="8"/>
          <img id='img9' class='garden-img' src={img9} alt="9"/>
          <img id='img10' class='garden-img' src={img10} alt="10"/>
          <img id='img11a' class='garden-img' src={img11a} alt="11"/>
          <img id='img11b' class='garden-img' src={img11b} alt="11"/>
          <img id='img11c' class='garden-img' src={img11c} alt="11"/>
          <img id='img12' class='garden-img' src={img12} alt="12"/>
          <img id='img13' class='garden-img' src={img13} alt="13"/>
          <img id='img14' class='garden-img' src={img14} alt="14"/>
          <img id='img15' class='garden-img' src={img15} alt="15"/>
          <img id='img16' class='garden-img' src={img16} alt="16"/>
          <img id='img17' class='garden-img' src={img17} alt="17"/>
          <img id='img18' class='garden-img' src={img18} alt="18"/>
          <img id='img19' class='garden-img' src={img19} alt="19"/> */}
          {/* <OverlayTrigger
            overlay={
              <Tooltip id={`tooltip-top`}>
                <strong>타입 체커</strong>.
              </Tooltip>
            }
          >
            
          </OverlayTrigger>                */}
        </>
        
      )
    } 
  

export default Garden