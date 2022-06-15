import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Login from './components/login/Login';
import Join from './components/join/Join';
import Edit from './components/edit/Edit';
import JoinMail from './components/join/JoinMail';
import { userInfo } from './util/userInfo';


function App() {

  userInfo();
  const [userEmail, setUserEmail] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/signin' element={<Login/>}></Route>
          {/* <Route path='/login' render={(props)=> <Login {...props} loginCallBack={loginCallBack}/>}></Route> */}
          <Route path='/signup' element={<Join/>}></Route>
          <Route path='/signup/mail' element={<JoinMail/>}></Route>
          <Route path='/edit' element={<Edit/>}></Route>
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
