import React, { useState } from 'react'
import { Tooltip, OverlayTrigger, Modal, Button, Pagination, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Memo from '../note/Memo';

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

const Garden = (props) => {


  const field = useSelector(state => state.field);
  console.log(field);

  const frontList = useSelector(state => state.frontList);
  const backList = useSelector(state => state.backList);

  // const [savedItem, setSavedItem] = useState([]);



  if(props.friend === true){
    var birdControl = 'hide';
    // bird.classList.add('hide');
  } else {
    var birdControl = 'show';
  }

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
      }else if(i == 22){
        var msg = "CSS 프레임워크, 서버 사이드 렌더링";
      }
    } else {
      if(i <= 11){
        var msg = backList[i - 1];
      }else if(i >= 14){
        var msg = backList[i - 3];
      }
    }

    // if(props.)
    console.log(props.login);
    
    //로그인에서 접근할 경우 툴팁 해제
    if(props.login === true || props.join === true){
      item.push(
        <img id={imgId} class='garden-img' src={require(`../../assets/img-garden/${imgSrc}.png`)} alt={i}/>
      )
    }

    else{


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
    )}
  }


  //안읽은 메시지 데이터 불러오는 api
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(2);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/users',
      params: {
        "Authorization": "Bearer " + localStorage.getItem("user")
      }
    }).then(response => {
        setRecord(response.data);
        setLoading(false);
      })
  })

  //안 읽은 메시지 모달 창
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //안 읽은 메시지 페이지네이션
  const indexOfLast = currentPage * recordPerPage;
    const indexOfFirst = indexOfLast - recordPerPage;
    const recordArray = Array.from(record);
    const currentRecord = (record) => {
      console.log(record)
      let currentRecord = 0;
      currentRecord = recordArray.slice(indexOfFirst, indexOfLast);
      return currentRecord;
    };
    const totalrecord = record.length;

    let [active, setActive] = useState(1);
    let items = [];
    for (let number = 1; number <= Math.ceil(record.length / recordPerPage); number++) {
    items.push(
        <Pagination.Item key={number} active={number === active} onClick={() => {
        setCurrentPage(number)
        setActive(number)
        }}>
        {number}
        </Pagination.Item>,
    )}

  //안읽은 메시지가 없을 경우 모달 창
  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  //새 클릭시 작동 함수
  const onBird = () => {
    if(record.length > 0){
      handleShow();
    }
    else{
      handleShow2();
    }
  }


  // const ladder = document.getElementById('img16');
  //   const gardener = document.getElementById('img18');
  //   const sittingGardener = document.getElementById('img22');

  //   if(!ladder.classList.contains('hide') 
  //       && !gardener.classList.contains('hide')){
  //           if(field === 'front'){
  //             msg = 
  //           }
  //     }


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
          <div id="bird-container" className={onBird}>
            <img id='bird' class='garden-img bird' src={bird} alt="" onClick={handleShow}/>
            <Badge bg="danger" className='bird-alert'>{record.length}</Badge>
            <span className="visually-hidden">unread messages</span>
          </div>
        </div>
        <div id="container-garden">
          {item}
          <OverlayTrigger
          overlay={
            <Tooltip id={`tooltip-top`} className='tooltips'>
              <strong>CSS 프레임워크, <br></br>서버 사이드 렌더링</strong>
            </Tooltip>
          }
        >
          <img id='img22' class='garden-img hide' src={img20} alt='22'/>
        </OverlayTrigger>
        </div>  

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>안읽은 메시지</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Memo record={currentRecord(record)} loading={loading}></Memo>
              <Pagination>{items}</Pagination>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                닫기
            </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={show2} onHide={handleClose2}>
            <Modal.Header closeButton>
            <Modal.Title>안읽은 메시지</Modal.Title>
            </Modal.Header>
            <Modal.Body>
             읽지 않은 메시지가 없습니다.
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
                닫기
            </Button>
            </Modal.Footer>
        </Modal>
        </>
        
      )
    } 
  

export default Garden