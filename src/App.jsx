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
  const [userDetail, setUserDetail] = useState('');
  const [email, setEmail] = useState('이메일');
  const [nickname, setNickname] = useState('닉네임');
  const [profile, setProfile] = useState('');
  const [field, setField] = useState('front');
  const [userJwt, setUserJwt] = useState('');

  // if(window.localStorage.getItem("user")){
  //   setUserJwt(window.localStorage.getItem("user"));
  // }

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://localhost:8080/user/details',
      params:{
        "Authorization": "Bearer " + localStorage.getItem("user")
      }
      // params: {
      //   'jwt': window.localStorage.getItem("user")
      // }
    }).then((response) => {
      console.log(response.data)
      // setNickname(response.data.nickname);
      // setEmail(response.data.email);
      // setField(response.data.field);

      // if(response.data.profile == '') {
      //   setProfile('src/assets/basic-profile.png')
      // } else {setProfile(response.data.profile);}
    
    }).catch((err) => {
      console.error(err)
    });
  }, [])



  function reducer(currentState, action){
    if(currentState === undefined){
      return {
        nickname: nickname,
        email: email,
        profile: profile,
        field: field
      }
    }
    const newState = {...currentState};
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
