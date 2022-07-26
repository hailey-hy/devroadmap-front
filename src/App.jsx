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
import { loginCheck } from './util/loginCheck';
import FriendList from './components/friendList/FriendList';
import FriendGarden from './components/friendGarden/FriendGarden';
import Note from './components/note/Note';


function App() {


  function reducer(currentState, action){
    if(currentState === undefined){
      return {
        defaultEmail: '',
        nickname: '',
        email: '',
        profile: '',
        field: 'front',
        progress: '',
        garden: [],
        frontList: ['인터넷', 'HTML', 'CSS', 'JS', '버전관리', '웹 보안 지식', '패키지 관리자', 'CSS설계', 'CSS전처리기', '빌드 툴', '프레임워크', 'CSS in JS', '타입 체커', 'CSS프레임워크', '테스트', '서버 사이드 렌더링', '그래프 QL', '정적 사이드 생성기'],
        backList: ['인터넷', '프론트 기본 지식', 'OS', '언어', '버전관리', 'DB', 'API', '캐시', '웹 보안 지식', '테스트', 'CI/CD', '개발 설계 원칙', '아키텍처 패턴', '검색엔진', '메시지 브로커', '컨테이너화 vs 가상화', '그래프 QL', '웹서버', '확장성 있는 구축']
      }
    }
    const newState = {...currentState};
    if(action.type === 'load'){
      newState.nickname = action.nickname;
      newState.email = action.email
      newState.field = action.field;
      newState.profile = action.profile;
    } else if(action.type === 'sent'){
      newState.defaultEmail = action.defaultEmail;
      console.log(newState.defaultEmail)
    } else if (action.type === 'load-progress'){
      newState.progress = action.progress;
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
      </Provider>
      <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
      <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossorigin></script>
      <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin></script>
      <script>var Alert = ReactBootstrap.Alert;</script>
    </div>
  );
}

export default App;
