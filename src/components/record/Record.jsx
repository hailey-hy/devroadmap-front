import axios from 'axios';
import React, {useEffect, useState} from 'react'
import './record.css'
import Bubbles from './Bubbles';
import paginationBasic from './PaginationBasic';
import { Pagination } from 'react-bootstrap';


const Record = () => {
    
    const [record, setRecord] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordPerPage, setRecordPerPage] = useState(3);
    
    useEffect(() => {
        setLoading(true);
        axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/users'
        }).then((response)=> {
            setRecord(response.data);
            setLoading(false);
        })
    
    }, []);


    // 페이지네이션
    const indexOfLast = currentPage * recordPerPage;
    const indexOfFirst = indexOfLast - recordPerPage;
    const currentRecord = (record) => {
      let currentRecord = 0;
      currentRecord = record.slice(indexOfFirst, indexOfLast);
      return currentRecord;
    };
    const totalrecord = record.length;

    let active = 1;
    let items = [];
    for (let number = 1; number <= Math.ceil(record.length / recordPerPage); number++) {
    items.push(
        <Pagination.Item key={number} active={number === active} onClick={() => setCurrentPage(number)}>
        {number}
        </Pagination.Item>,
    );
    }   

  return (
    <div className='container-white container'>
        <h3 id="white-title">정원 기록</h3>
        <Bubbles record={currentRecord(record)} loading={loading}></Bubbles>
        <Pagination>{items}</Pagination>
    </div>
  )
}

export default Record