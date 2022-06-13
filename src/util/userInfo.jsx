import {useEffect} from 'react'
import axios from 'axios'

export const userInfo = () => {
    const authHeader = () => {
        const user = localStorage.getItem('user');
      
        if (user) {
          return { Authorization: 'Bearer ' + user.accessToken };
        } else {
          return {};
        }
      }

    if (localStorage.getItem("user")){
        axios({
            method: 'get',
            url: '',
            headers: authHeader()
        }).then(response => {
            console.log(response.data)
        })
    }
}