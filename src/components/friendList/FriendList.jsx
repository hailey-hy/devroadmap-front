import React, {useEffect, useState} from 'react'
import axios from 'axios';
import './friendList.css'
import { OverlayTrigger, Tooltip, Badge, Button, Form } from 'react-bootstrap'
import {MdCancel} from 'react-icons/md'
import {BsBellFill} from 'react-icons/bs'
import { Pagination } from 'react-bootstrap';
import FriendItem from './FriendItem';

const FriendList = () => {

    // 검색창 입력값 관련 변수
    const [search, setSearch] = useState('')
    const handleSearch = (e) => {
        setSearch(e.target.value)
     }
    
    // 스위치 관련 변수
    const { isChecked, handleToggle } = useState('false')

    // 페이지네이션

    const [record, setRecord] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordPerPage, setRecordPerPage] = useState(3);

    useEffect(() => {
        setLoading(true);
        axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/users',
            // headers: {
            //   'jwt': window.localStorage.getItem("user")
            // },
            params: {
              "Authorization": "Bearer " + localStorage.getItem("user")
            }
        }).then((response)=> {
            // setRecord(response.data.complete_subjects);
            setRecord(response.data);
            setLoading(false);
        })
    
    }, []);

    const indexOfLast = currentPage * recordPerPage;
    const indexOfFirst = indexOfLast - recordPerPage;
    const currentRecord = (record) => {
        let currentRecord = 0;
        currentRecord = record.slice(indexOfFirst, indexOfLast);
        return currentRecord;
    };
    const totalrecord = record.length;

    

    let [active, setActive] = useState(1);
    let items = [];
    for (let number = 1; number <= Math.ceil(record.length / recordPerPage); number++) {
    items.push(
        <Pagination.Item key={number} active={number === active} onClick={() => {
        setCurrentPage(number)
        setActive(number)
        }}>
        {number}
        </Pagination.Item>,
    );
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
                    <div class="add-btn">
                        <BsBellFill/>
                    </div>
                </OverlayTrigger>
            </div>
            <div id="container-friend-divider">
                <div id="friend-list">
                    {/* 추후 컴포넌트 분리, 페이지네이션 필요 */}
                    <FriendItem record={currentRecord(record)} loading={loading}></FriendItem>
                    <Pagination id='friend-pagination'>{items}</Pagination>
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
                        {/* <div id="search-on-off"> */}
                        <div className="switch">
                            <Form.Check 
                                type="switch"
                                id="custom-switch"
                                label=""
                            />
                        </div>
                    </div>
                        {/* </div> */}
                    <div className="friend">
                        <Badge pill className="friend-field">front</Badge>
                        <div className="friend-img"></div>
                        <div className="friend-detail-divider">
                            <h5 className="friend-name">이름</h5>
                            <h5 className='friend-progress'>진도율</h5>
                        </div>
                        <div class="add-btn-random">+</div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FriendList