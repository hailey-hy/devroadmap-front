import React, {useEffect, useState} from 'react'
import './note.css'
import Memo from './Memo'
import axios from 'axios'
import { Pagination } from 'react-bootstrap';

const Note = () => {

    const [record, setRecord] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordPerPage, setRecordPerPage] = useState(2);
    
    useEffect(() => {
        setLoading(true);
        axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/users',
            params: {
              "Authorization": "Bearer " + localStorage.getItem("user")
            }
        }).then((response)=> {
            setRecord(response.data);
            setLoading(false);
            console.log(response.data);
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
    )}

  return (
    <div id="record">
    <div className='container-white container'>
        <div id="container-records">
          <h3 id="white-title">방명록</h3>
            <Memo record={currentRecord(record)} loading={loading}></Memo>
            <Pagination>{items}</Pagination>
        </div>
    </div>
    </div>
  )
}

export default Note