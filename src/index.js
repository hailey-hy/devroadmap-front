import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import axios from 'axios'

ReactDOM.render(<App/>, document.querySelector('#root'))

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;