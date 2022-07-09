import React, {useEffect, useState} from 'react'
import './main.css'
import '../garden/garden.css'
import Status from './Status'
import Roadmap from '../roadmap/Roadmap'
import { loginCheck } from '../../util/loginCheck'
import Garden from '../garden/Garden'
import grass from '../../assets/img-garden/땅.png';
import sun from '../../assets/img-garden/해.png';
import cloud1 from '../../assets/img-garden/구름1.png';
import cloud2 from '../../assets/img-garden/구름2.png';
import cloud3 from '../../assets/img-garden/구름3.png';
import cloud4 from '../../assets/img-garden/구름4.png';
import cloud5 from '../../assets/img-garden/구름5.png';
import bird from '../../assets/img-garden/새.png'
import axios from 'axios'


const Main = () => {
  // loginCheck();

  const [savedItem, setSavedItem] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://localhost:8080/history',
      params: {
        "Authorization": "Bearer " + localStorage.getItem("user")
      }
    }).then(response => {
      console.log(response.data.complete_subjects)
      setSavedItem(response.data.complete_subjects)
    })
  }, [])

  for(let i = 1; i < savedItem.length; i++){
    if(i in savedItem[i].object){
    var target = document.getElementById('img' + i);
    target.classList.remove('hide');
    target.classList.add('show');
    }
  }
      
  return (
    <>
    
        <section id='main'>
        {/* <div id="container-img">
          <img id='grass' class='garden-img' src={grass} alt=""/>
          <img id='sun' class='garden-img' src={sun} alt=""/>
          <img id='cloud1' class='garden-img' src={cloud1} alt=""/>
          <img id='cloud2' class='garden-img' src={cloud2} alt=""/>
          <img id='cloud3' class='garden-img' src={cloud3} alt=""/>
          <img id='cloud4' class='garden-img' src={cloud4} alt=""/>
          <img id='cloud5' class='garden-img' src={cloud5} alt=""/>
          <img id='bird' class='garden-img' src={bird} alt=""/>
        </div>
        <div id="container-garden"> */}
          <Garden></Garden>
        {/* </div> */}
          <Status/>
        </section>
        <section>
          <Roadmap></Roadmap>
        </section>
        
    </>
  )
}

export default Main