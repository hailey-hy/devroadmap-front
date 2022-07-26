//친구 목록 페이지

import React, {useEffect, useState, useRef} from 'react'
import instance from '../../api'
import './friendList.css'
import { Overlay, OverlayTrigger, Tooltip, Badge, Button, Form } from 'react-bootstrap'
import {MdCancel} from 'react-icons/md'
import {BsBellFill} from 'react-icons/bs'
import { Pagination, Modal } from 'react-bootstrap';
import FriendItem from './FriendItem';
import FriendAddList from './FriendAddList';
import SearchResult from './SearchResult';
import RandomFriendBack from './RandomFriendBack';
import RandomFriendFront from './RandomFriendFront';
import { useSelector } from 'react-redux';

const FriendList = () => {
    //친구 신청 모달 관련 변수
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //친구 신청 페이지네이션

    const [recordAdd, setRecordAdd] = useState([]);
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [currentPageAdd, setCurrentPageAdd] = useState(1);
    const [recordAddPerPage, setRecordAddPerPage] = useState(3);

    useEffect(() => {
        setLoadingAdd(true);
        instance({
            url: '/friend/proposal/receive',
        }).then((response)=> {
            console.log(response.data.friend_list)
            setRecordAdd(response.data);
            setLoadingAdd(false);
        })
    
    }, []);

    const indexOfLastAdd = currentPageAdd * recordAddPerPage;
    const indexOfFirstAdd = indexOfLastAdd - recordAddPerPage;
    const currentRecordAdd = (recordAdd) => {
        let currentRecordAdd = 0;
        currentRecordAdd = recordAdd.slice(indexOfFirstAdd, indexOfLastAdd);
        return currentRecordAdd;
    };
    const totalrecordAdd = recordAdd.length;

    

    let [activeAdd, setActiveAdd] = useState(1);
    let itemsAdd = [];
    for (let number = 1; number <= Math.ceil(recordAdd.length / recordAddPerPage); number++) {
    itemsAdd.push(
        <Pagination.Item key={number} active={number === activeAdd} onClick={() => {
        setCurrentPageAdd(number)
        setActiveAdd(number)
        }}>
        {number}
        </Pagination.Item>,
    );
    }  

    // 검색창 입력값 관련
    const [search, setSearch] = useState('')
    const handleSearch = (e) => {
        setSearch(e.target.value)
     }

    //검색 함수 관련
    //아무것도 입력하지 않았을 경우, 자기 자신의 닉네임을 검색했을 경우 툴팁 처리

    const [searchResult, setSearchResult] = useState('');
    const myNickname = useSelector(state => state.nickname);

    const onSearch = () => {
        if(search.length > 0 && search != myNickname){
            setShowTooltip(false);
            handleShowSearch();
            instance({
                url: '/friend/search',
                params: {
                "searchnickname" : search
                }
            }).then(response => {
                console.log(response.data);
                setSearchResult(response.data);
            }).catch(err => {
                setSearchResult([]);
            })
        }else{
            setShowTooltip(true);
        }
    }

    //검색창 결과 모달 창
    const [showSearch, setShowSearch] = useState(false);
    const handleShowSearch = () => setShowSearch(true);
    const handleCloseSearch = () => setShowSearch(false);

    //검색창 결과 실패시 툴팁
    const target = useRef(null);
    const [showTooltip, setShowTooltip] = useState(false);
    
    // 스위치 관련 변수
    const { isChecked, handleToggle } = useState("false");
    const [switchCheck, setSwitchCheck] = useState(false)

    //스위치 관련 함수
    const onCheckedElement = (checked, item) => {
        if (checked) {
            console.log('체크');
            onChecked();
            setSwitchCheck(true)
            
        } else {
            console.log('해제');
            onChecked();
            setSwitchCheck(false)
        }
    }

    //스위치 ON
    const onChecked = () => {
        instance({
            url: '/friend/matchornot',
        }).then(response => {
            console.log(response.data);
        })
    }

    // 친구 목록 페이지네이션

    const [record, setRecord] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordPerPage, setRecordPerPage] = useState(3);

    const delTarget = document.getElementsByClassName('friend');
    console.log(delTarget);

    useEffect(() => {
        setLoading(true);
        instance({
            url: '/friend',
        }).then((response)=> {
            console.log(response.data.friend_list)
            setRecord(response.data.friend_list);
            // setRecord(response.data);
            setLoading(false);
        })
    
    }, []);

    const indexOfLast = currentPage * recordPerPage;
    const indexOfFirst = indexOfLast - recordPerPage;
    const recordArray = Array.from(record);
    const currentRecord = (record) => {

        let currentRecord = 0;
            currentRecord = recordArray.slice(indexOfFirst, indexOfLast);
            console.log(currentRecord)
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

    //랜덤 친구 추천
    let randomItems = [];
    if(switchCheck === true){
        randomItems.push(
            <RandomFriendFront/>,
            <RandomFriendBack/>
        )
    }

  return (
    <section id='friend'>
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
                        <BsBellFill onClick={handleShow}/>
                    </div>
                </OverlayTrigger>
            </div>
            <div id="container-friend-divider">
                <div id="friend-list">
                    <div id="friend-list-detail">
                        <FriendItem record={currentRecord(record)} loading={loading}></FriendItem>
                    </div>
                    <Pagination id='friend-pagination'>{items}</Pagination>
                </div>
                <div id="friend-util">
                    <div className='util' id="util-search">
                    <h4 id='search-title'>정원사 검색</h4>
                    <div id="search-divider">
                        <input className='search-input' type='text' value={search} onChange={handleSearch} placeholder='닉네임으로 친구를 찾아보세요!'/>
                        <Button ref={target} id='btn-search' onClick={() => 
                            onSearch()}>검색</Button>
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
                                onChange={e => {
                                        onCheckedElement(e.target.checked);
                                      }
                                }
                            />
                        </div>
                    </div>
                        {/* </div> */}
                        {randomItems}
                    </div>
                </div>
            </div>
        </div>
        {/* 친구 신청 모달 창 */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>친구 신청 목록</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FriendAddList record={currentRecord(recordAdd)} loading={loadingAdd}></FriendAddList>
                    <Pagination id='friend-add-pagination'>{itemsAdd}</Pagination>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                취소
            </Button>
            {/* <Button variant="primary">
                Save Changes
            </Button> */}
            </Modal.Footer>
        </Modal>
        
        {/* 친구 검색 모달 창 */}
        <Modal show={showSearch} onHide={handleCloseSearch}>
            <Modal.Header closeButton>
            <Modal.Title>친구 검색 결과</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SearchResult result={searchResult}/>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseSearch}>
                닫기
            </Button>
            </Modal.Footer>
        </Modal>

        {/* 검색창 결과 실패시 툴팁 */}
        <Overlay target={target.current} show={showTooltip} placement="top">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            친구 이름을 입력해 주세요.
          </Tooltip>
        )}
      </Overlay>

    </section>
  )
}

export default FriendList