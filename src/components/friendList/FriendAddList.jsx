import React from 'react'
import { Badge, Button } from 'react-bootstrap'
import {MdCancel} from 'react-icons/md'
import './friendList.css'

const FriendAddList = ({record, loading}) => {
    return (
      <>
      {record.map((record) => (
      <div className="friend-add">
          <Badge pill className="friend-field">front</Badge>
          <div className="friend-img"></div>
          <div className="friend-detail-divider">
              <h5 className="friend-name">{record.name}</h5>
              <h5 className='friend-progress'>{record.bs}%</h5>
          </div>
          {/* <MdCancel className='friend-cancle'/> */}
          <div class="add-btn-random btn-friend-add">+</div>
      </div>
      ))}
      </>
    )
  }

export default FriendAddList