import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Login from './components/login/Login';
import Join from './components/join/Join';


function App() {
  const [isLogin , setIsLogin] = useState(false);

  useEffect(()=>{
     
  },[]);

  function loginCallBack(login){
    setIsLogin(login);
  }

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' isLogin={isLogin} element={<Main/>}></Route>
          <Route path='/login' isLogin={isLogin} element={<Login/>}></Route>
          <Route path='/join' isLogin={isLogin} element={<Join/>}></Route>
        </Routes>
      </BrowserRouter>
      <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
      <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossorigin></script>
      <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin></script>
      <script>var Alert = ReactBootstrap.Alert;</script>
    </>
  );
}

export default App;
