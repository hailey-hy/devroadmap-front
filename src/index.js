import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import axios from 'axios'


ReactDOM.render(<App/>, document.querySelector('#root'))

// axios.defaults.baseURL = "http://ec2-43-200-80-56.ap-northeast-2.compute.amazonaws.com:8080/";
// axios.defaults.baseURL = "https://localhost:8080/";
// axios.defaults.withCredentials = true;