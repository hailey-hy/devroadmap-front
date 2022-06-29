import React, {useState} from 'react'
import './friendList.css'
import { OverlayTrigger, Tooltip, Badge, Button } from 'react-bootstrap'
import {MdCancel} from 'react-icons/md'

const FriendList = () => {

    const [search, setSearch] = useState('')
    const handleSearch = (e) => {
        setSearch(e.target.value)
  }
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
                    {/* 추후 컴포넌트 분리, 페이지네이션 필요 */}
                    <div className="friend">
                        <Badge pill className="friend-field">front</Badge>
                        <div className="friend-img"></div>
                        <h5 className="friend-name">이름</h5>
                        <h5 className='friend-progress'>진도율</h5>
                        <MdCancel className='friend-cancle'/>
                    </div>
                </div>
                <div id="friend-util">
                    <div className='util' id="util-search">
                    <h4 id='search-title'>정원사 검색</h4>
                    <div id="search-divider">
                        <input className='search-input' type='text' value={search} onChange={handleSearch} placeholder='닉네임으로 친구를 찾아보세요!'/>
                        <Button id='btn-search'>검색</Button>
                    </div>
                    </div>
                    <div className='util' id="util-random">
                        <div id="random-divider">
                        <h4 id='search-title'>다른 정원 둘러보기</h4>
                        <div id="search-on-off"></div>
                        </div>
                    <div className="friend">
                        <Badge pill className="friend-field">front</Badge>
                        <div className="friend-img"></div>
                        <h5 className="friend-name">이름</h5>
                        <h5 className='friend-progress'>진도율</h5>
                        <MdCancel className='friend-cancle'/>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FriendList