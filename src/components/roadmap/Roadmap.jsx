import React, {useState, useEffect} from 'react'
import './roadmap.css'
import Objects from './Objects'
import instance from '../../api'
import { useSelector } from 'react-redux'
import Footer from '../footer/Footer'

const Roadmap = () => {

  const [total, setTotal] = useState(18);
  const [resp, setResp] = useState(false);
  const [showLists, setShowLists] = useState([]);
  // const [userType, setUserType] = useState('front');
  const userType = useSelector(state => state.field);

  useEffect(() => {
    //  리덕스 store에 저장된 field 확인하여 백/프론트 다른 내용 보여주기
    if(userType == 'back'){
      setTotal(19);
    };

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
    console.log(target);
    console.log(list.object);
    target.classList.remove('un-checked');
    target.classList.add('checked');
  })
  console.log(showLists)

  // const frontObjects = ['인터넷', 'HTML', 'CSS', 'JS', '버전관리', '웹 보안 지식', '패키지 관리자', 'CSS설계', 'CSS전처리기', '빌드 툴', '프레임워크', 'CSS in JS', '타입 체커', 'CSS프레임워크', '테스트', '서버 사이드 렌더링', '그래프 QL', '정적 사이드 생성기'];
  const frontObjects = useSelector(state => state.frontList);
 
  const backObjects = useSelector(state => state.backList);

  let obejct_list = [];
  if(userType == 'front'){
  for (let number = 1; number < total; number++) {
    
    obejct_list.push(
        <Objects number={number} resp={resp} name={frontObjects[number]}></Objects>
        
    )}
    } else {
      for (let number = 1; number < total + 1; number++) {
        obejct_list.push(
          <Objects number={number} resp={resp} name={backObjects[number]}></Objects>
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