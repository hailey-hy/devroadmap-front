import React from 'react'
import './record.css'

const bubble = () => {
}

// const insertBubble = () => {
//     const container = document.getElementById('container-bubble');
//     container.innerHTML = {bubble};
// }

// insertBubble();

const Record = () => {
  return (
    <div className='container-white container'>
        <h3 id="white-title">정원 기록</h3>
        <div className="container-content">
            <div></div>
            <div></div>
            <div className="record-bubble">
                <div className='container-bubble'>
                    <h5 className='record-date'>2022.02.22</h5>
                    <h5 className='record-subject'>HTML</h5>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Record