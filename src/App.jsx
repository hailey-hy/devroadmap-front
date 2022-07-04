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


function App() {


  function reducer(currentState, action){
    if(currentState === undefined){
      return {
        defaultEmail: '',
        nickname: '',
        email: '',
        profile: '',
        field: 'front',
        garden: []
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
