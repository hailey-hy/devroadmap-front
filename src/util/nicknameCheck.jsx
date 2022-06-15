import axios from 'axios';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export const nicknameCheck = (props) => {
    axios({
        method: 'post',
        url: '/edit/nickname/check'
    }).then(response => {
        console.log(response.data)
        if (response.data == 'ok'){
            
        }
    });
}