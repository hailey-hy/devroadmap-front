import React from 'react'
import './record.css'

const Bubbles = ({record, loading}) => {
  return (
    <>
        {loading && <div> loading... </div>}
        {record.map((record) => (
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
    </>
  );
}

export default Bubbles;