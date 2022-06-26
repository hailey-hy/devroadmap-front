import React, {} from 'react'
import { useState } from 'react';
import './roadmap.css'

const Objects = (props) => {

    // const showitem = useSelector((state) => state.number);
    const [active, setActive] = useState(false);
  return (
    <div className={props.number <= 8 ?  'container-bubble-object left' : 'container-bubble-object right'}>
        {/* <div className="bubble-number"> 
        </div> */}
        <div className='bubble-object' tabindex='1' onClick={() => {
            
        }}>
            <h5>{props.number + 1}</h5>
            <h5 className='bubble-subject'>{props.name}</h5>
        </div>
    </div>
  )
}

export default Objects