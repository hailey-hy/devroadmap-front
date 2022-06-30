import React from 'react'
import { Badge } from 'react-bootstrap'
import {MdCancel} from 'react-icons/md'
import './friendList.css'

const FriendItem = ({record, loading}) => {
  return (
    <>
    {record.map((record) => (
    <div className="friend">
        <Badge pill className="friend-field">front</Badge>
        <div className="friend-img"></div>
        <div className="friend-detail-divider">
            <h5 className="friend-name">{record.name}</h5>
            <h5 className='friend-progress'>{record.id}</h5>
        </div>
        <MdCancel className='friend-cancle'/>
    </div>
    ))}
    </>
  )
}

export default FriendItem