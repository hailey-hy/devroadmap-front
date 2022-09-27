import instance from '../../api';
import React, {useEffect, useState} from 'react'
import './record.css'
import Bubbles from './Bubbles';
import { Pagination } from 'react-bootstrap';


const Record = () => {
    
    const [record, setRecord] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordPerPage, setRecordPerPage] = useState(3);
    const [recordFirst, setRecordFirst] = useState(''); //가장 첫번째 항목을 저장
    
    useEffect(() => {
        setLoading(true);
        instance({
            method: 'get',
            url: '/history',
        }).then((response)=> {
            setRecord(response.data.complete_subjects);
            setLoading(false);
            setRecordFirst(response.data.complete_subjects[0]);
        })
    
    }, []);


    // 페이지네이션
    const indexOfLast = currentPage * recordPerPage;
    const indexOfFirst = indexOfLast - recordPerPage;
    const recordArray = Array.from(record);
    const currentRecord = (record) => {
      console.log(record)
      let currentRecord = 0;
      currentRecord = recordArray.slice(indexOfFirst, indexOfLast);
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
    <div id="record">
    <div className='container-white container'>
      <div id="container-records">
        <h3 id="white-title">정원 기록</h3>
        <Bubbles record={currentRecord(record)} loading={loading} first={recordFirst}></Bubbles>
        <Pagination>{items}</Pagination>
        </div>
    </div>
    </div>
  )
}

export default Record