import React, {useState, useEffect} from 'react'
import './roadmap.css'
import Objects from './Objects'
import instance from '../../api'
import { useSelector } from 'react-redux'
import Footer from '../footer/Footer'
import { studyList } from '../../util/studyList'

const Roadmap = () => {


  const [resp, setResp] = useState(false);
  const [showLists, setShowLists] = useState([]);
  const userType = useSelector(state => state.field);

  useEffect(() => {

    // /history와 통신하여 유저가 이미 완료한 데이터 가져오기
    instance({
      method: 'get',
      url: '/history',
    }).then((response)=> {
      setShowLists(response.data.complete_subjects);
    })
  }, [])

  showLists.map(list => {
    const target = document.getElementById(list.object);
    target.classList.remove('un-checked');
    target.classList.add('checked');
  })

 //공부 분야에 따른 항목 표시
  const frontObjects = studyList('front')
  const backObjects = studyList('back')

  let obejct_list = [];
  if(userType == 'front'){
  for (let number = 1; number < 19; number++) {
    
    obejct_list.push(
        <Objects number={number} resp={resp} name={frontObjects[number - 1]}></Objects>
        
    )}
    } else {
      for (let number = 1; number < 20; number++) {
        obejct_list.push(
          <Objects number={number} resp={resp} name={backObjects[number - 1]}></Objects>
      )}
    }
  

  return (
    <>
    <div id='roadmap'>
      <div id="container-roadmap">
        <div id="container-roadmap-content">
        {obejct_list}
        </div>
        <Footer/>
      </div>
    </div>
    
    </>
  )
}

export default Roadmap