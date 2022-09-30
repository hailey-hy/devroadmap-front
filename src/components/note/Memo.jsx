import React from 'react'
import { profileCheck } from '../../util/profileCheck'
import './note.css'

const Memo = ({record, loading}) => {
    console.log(record)

    const item = [];

    for(let i = 0; i < record.length; i++){
    
    item.push(
        <div className="container-memo">
        <div className='img-memo-container'>
            <img src={profileCheck(record[i].profile)} alt="" className='img-memo'/>
        </div>
        <div className="record-bubble memo-bubble">
            <div className='container-memo-detail'>
                <div className="memo-grid">
                <h5 className='memo-name'>{record[i].sender}</h5>
                <h5 className='memo-date'>{record[i].writedate}</h5>
                </div>
                
                <h5 className='memo-detail'>{record[i].message}</h5>
                
            </div>
        </div>
    </div>
    )};

if(item.length > 0){
    return (
        <>
            {item}
        </>
      )
}
else{
    return (
        <h5 id='no-memo'>아직 작성된 방명록이 없어요.</h5>
      )
}
  
}

export default Memo