import React from 'react';
import Header from './components/header/Header';
import Main from './components/main/Main'
import Nav from './components/nav/Nav'


function App() {
  return (
    <>
      <Main/>

      <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
      <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossorigin></script>
      <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin></script>
      <script>var Alert = ReactBootstrap.Alert;</script>
    </>
  );
}

export default App;
