import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap'

const CustomPagination = ({ record, recordPerPage, setCurrentPage }) => {
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
    <Pagination>{items}</Pagination>
  )
}

export default CustomPagination