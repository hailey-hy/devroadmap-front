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



function App() {
  const [userDetail, setUserDetail] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [profile, setProfile] = useState('');
  const [field, setField] = useState('');
  // const [userJwt, setUserJwt] = useState('');

  // if(window.localStorage.getItem("user")){
  //   setUserJwt(window.localStorage.getItem("user"));
  // }

  useEffect(() => {
    axios({
      method: 'get',
      url: '/user/details',
      headers:{
        'jwt': window.localStorage.getItem("user")
      }
      // params: {
      //   jwt: window.localStorage.getItem("user")
      // }
    }).then((response) => {
      setUserDetail(response.data);
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
      <BrowserRouter>
        <Header/>
        <Routes>
          
            <Route path='/' element={<Main/>}/>
          
          <Route path='/signin' element={<Login/>}/>
          {/* <Route path='/login' render={(props)=> <Login {...props} loginCallBack={loginCallBack}/>}></Route> */}
          <Route path='/signup' element={<Join/>}/>
          <Route path='/signup/mail' element={<JoinMail/>}/>
          <Route path='/edit' element={<Provider store={store}><Edit/></Provider>}/>
          <Route path='/record' element={<Record/>}/>
        </Routes>
      </BrowserRouter>
      <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
      <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossorigin></script>
      <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin></script>
      <script>var Alert = ReactBootstrap.Alert;</script>
    </div>
  );
}

export default App;
