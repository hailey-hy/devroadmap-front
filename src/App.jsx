import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Login from './components/login/Login';
import Join from './components/join/Join';
import Edit from './components/edit/Edit';
import JoinMail from './components/join/JoinMail';
import Record from './components/record/Record';
import {createStore} from 'redux';
import {Provider, useSelector, useDispatch, connect} from 'react-redux';
import axios from 'axios';
import FriendList from './components/friendList/FriendList';
import FriendGarden from './components/friendGarden/FriendGarden';
import Note from './components/note/Note';
import Modals from './components/UI/modals/Modals';


function App() {

  //redux에서 관리할 상태값
  function reducer(currentState, action){
    if(currentState === undefined){
      return {
        //로그인 후
        nickname: '', //닉네임
        email: '', //이메일
        profile: '', //프로필 사진 src
        field: 'front', //공부 분야
        progress: '', //진행율
        date: '', //진행 일수
        garden: [], //진행 완료된 목록
        modalState: [],
        //코드 전체에서 쓸 front/back 항목 리스트
        // frontList: ['인터넷', 'HTML', 'CSS', 'JS', '버전관리', '웹 보안 지식', '패키지 관리자', 'CSS설계', 'CSS전처리기', '빌드 툴', '프레임워크', 'CSS in JS', '타입 체커', 'CSS프레임워크', '테스트', '서버 사이드 렌더링', '그래프 QL', '정적 사이드 생성기'],
        // backList: ['인터넷', '프론트 기본 지식', 'OS', '언어', '버전관리', 'DB', 'API', '캐시', '웹 보안 지식', '테스트', 'CI/CD', '개발 설계 원칙', '아키텍처 패턴', '검색엔진', '메시지 브로커', '컨테이너화 vs 가상화', '그래프 QL', '웹서버', '확장성 있는 구축']
      }
    }

    const newState = {...currentState};
    if(action.type === 'load'){ 
      //새로 로그인했을 경우 닉네임, 이메일, 공부 분야, 프로필 정보를 갱신하여 저장
      newState.nickname = action.nickname;
      newState.email = action.email
      newState.field = action.field;
      newState.profile = action.profile;
     } 
      else if (action.type === 'load-progress'){
      newState.progress = action.progress;
      newState.date = action.date;
    }
      else if (action.type === 'modal'){
        //모달과 관련된 정보를 배열에 저장
        newState.modalState = action.modalState;
      }
    return newState
  }

  const store = createStore(reducer);

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/signin' element={<Login/>}/>
            <Route path='/signup' element={<Join/>}/>
            <Route path='/signup/mail' element={<JoinMail/>}/>
            <Route path='/edit' element={<Edit/>}/>
            <Route path='/record' element={<Record/>}/>
            <Route path='/friend' element={<FriendList/>}/>
            <Route path='/friend/garden' element={<FriendGarden/>}/>
            <Route path='/note' element={<Note/>}/>
          </Routes>
        </BrowserRouter>
        <Modals></Modals>
      </Provider>
      <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
      <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossorigin></script>
      <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin></script>
      <script>var Alert = ReactBootstrap.Alert;</script>
    </div>
  );
}

export default App;
