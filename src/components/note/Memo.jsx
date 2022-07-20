import React from 'react'
import './note.css'

const Memo = ({record, loading}) => {
    console.log(record)

    const item = [];

    for(let i = 0; i < record.length; i++){
    
    item.push(
        <div className="container-memo">
        <div className='img-memo-container'>
            <img src={record[i].id} alt="" className='img-memo'/>
        </div>
        <div className="record-bubble memo-bubble">
            <div className='container-memo-detail'>
                <div className="memo-grid">
                <h5 className='memo-name'>{record[i].username}</h5>
                <h5 className='memo-date'>{record[i].id}</h5>
                </div>
                
                <h5 className='memo-detail'>{record[i].email}</h5>
                
            </div>
        </div>
    </div>
    )};

  return (
    <>
        {item}
    </>
  )
}

export default Memo