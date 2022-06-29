import React from 'react'
import './friendList.css'
import { OverlayTrigger, Tooltip, Badge } from 'react-bootstrap'
import {MdCancel} from 'react-icons/md'

const FriendList = () => {
  return (
    <div id='friend'>
        <div className='container-white container'>
            <div id="friend-title-divider">
                <h3 id="white-title">친구 목록</h3>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                        <strong>친구 신청을 확인해 보세요!</strong>
                        </Tooltip>
                    }
                >
                    <div id="add-btn">+</div>
                </OverlayTrigger>
            </div>
            <div id="container-friend-divider">
                <div id="friend-list">
                    {/* 추후 컴포넌트 분리 필요 */}
                    <div className="friend">
                        <Badge pill className="friend-field">front</Badge>
                        <div className="friend-img">사진</div>
                        <h5 className="friend-name">이름</h5>
                        <h5 className='friend-progress'>진도율</h5>
                        <MdCancel/>
                    </div>
                </div>
                <div id="friend-util">
                    <div className='util' id="util-search">
                        테스트중
                    </div>
                    <div className='util' id="util-random">
                        테스트중
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FriendList