import axios from 'axios';
import React, {useEffect, useState} from 'react'
import './record.css'



const Record = () => {

    const bubble = () => {
    }
    
    // const insertBubble = () => {
    //     const container = document.getElementById('container-bubble');
    //     container.innerHTML = {bubble};
    // }
    
    // insertBubble();
    
    const [record, setRecord] = useState([]);
    
    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/users'
        }).then((response)=> {
            setRecord(response.data);
        })
    
    }, []);

  return (
    <div className='container-white container'>
        <h3 id="white-title">정원 기록</h3>
        {record.map(record => (
            <div className="container-content">
                <div></div>
                <div></div>
                <div className="record-bubble">
                    <div className='container-bubble'>
                        <h5 className='record-date'>{record.id}</h5>
                        <h5 className='record-subject'>{record.name}</h5>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Record