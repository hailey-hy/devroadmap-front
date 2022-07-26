import React, {useEffect, useState} from 'react'
import './main.css'
import '../garden/garden.css'
import Status from './Status'
import Roadmap from '../roadmap/Roadmap'
import { loginCheck } from '../../util/loginCheck'
import instance from '../../api'
import Garden from '../garden/Garden'



const Main = () => {
  loginCheck();

  const [savedItem, setSavedItem] = useState([]);

  // history api로 불러온 DB 데이터에 따라 정원 오브젝트 표시

  useEffect(() => {
    instance({
      method: 'get',
      url: '/history',
    }).then(response => {

      const savedItem = response.data.complete_subjects;

       for(let i = 0; i < savedItem.length; i++){
          var targetID = savedItem[i].object
          console.log(targetID)
          var target = document.getElementById('img' + targetID);
          target.classList.remove('hide');

          if(targetID === 11){
            var target = document.getElementById('img' + 12);
            target.classList.remove('hide');

            var target = document.getElementById('img' + 13);
            target.classList.remove('hide');
          }
        }
    })
  }, [])



      
  return (
    <>
    
        <section id='main'>
          <Garden></Garden>
          <Status/>
        </section>
        <section>
          <Roadmap></Roadmap>
        </section>
        
    </>
  )
}

export default Main