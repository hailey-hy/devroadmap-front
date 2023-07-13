import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export const useLoginCheck = () => {

    const navigate = useNavigate();
    
    // useEffect(() => {
    //     if (! window.localStorage.getItem("user")) {
    //     navigate('/signin');
    // }
    // });
}