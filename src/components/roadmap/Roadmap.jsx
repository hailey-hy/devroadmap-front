import React, {useState, useEffect} from 'react'
import './roadmap.css'
import Objects from './Objects'
import axios from 'axios'

const Roadmap = () => {

  const [total, setTotal] = useState(18);
  const [resp, setResp] = useState(false);
  const [userType, setUserType] = useState('front');

  useEffect(() => {
    axios({
      method: 'get',
      url: '/'
    }).then(response => {
      setUserType(response.body);
      if(userType == 'back'){
        setTotal(19);
      }
    })
  }, [])

  const frontObjects = ['인터넷', 'HTML', 'CSS', 'JS', '버전관리', '웹 보안 지식', '패키지 관리자', 'CSS설계', 'CSS전처리기', '빌드 툴', '프레임워크', 'CSS in JS', '타입 체커', 'CSS프레임워크', '테스트', '서버 사이드 렌더링', '그래프 QL', '정적 사이드 생성기'];
 
  const backObjects = ['인터넷', '프론트 기본(HTML, CSS, JS)', 'OS', '언어', '버전관리', 'DB', 'API', '캐시', '웹 보안 지식', '테스트', 'CI/CD', '개발 설계 원칙', '아키텍처 패턴', '검색엔진', '메시지 브로커', '컨테이너화 vs 가상화', '그래프 QL', '웹서버', '확장성 있는 구축'];

  let obejct_list = [];
  for (let number = 1; number <= total; number++) {
    if(userType == 'front'){
    obejct_list.push(
        <Objects object={number} resp={resp} name={frontObjects[number]}></Objects>
    );
    } else {
      obejct_list.push(
        <Objects object={number} resp={resp} name={backObjects[number]}></Objects>
    );
    }
  }

  return (
    <div id='roadmap'>
      <div id="container-roadmap">
        {obejct_list}
      </div>
    </div>
  )
}

export default Roadmap