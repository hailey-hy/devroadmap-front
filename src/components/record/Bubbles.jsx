import React from 'react'
import './record.css'

const Bubbles = ({record, loading}) => {
    if(record.length >= 1){
  return (
    <>
        {loading && <div> <h5>loading... </h5></div>}
        {record.map((record) => (
            <div className="container-content">
                <div></div>
                <div></div>
                <div className="record-bubble">
                    <div className='container-bubble'>
                        <h5 className='record-date'>{record.completedate}</h5>
                        <h5 className='record-subject'>{record.object}</h5>
                    </div>
                </div>
            </div>
        ))}
    </>
  )} else {
      return(
        <>
            <br></br>
            <br></br><br></br>
            <h5>아직 기록이 없어요.</h5>
        </>
      )
  }
}

export default Bubbles;