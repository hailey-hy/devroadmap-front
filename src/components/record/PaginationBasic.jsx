import React from 'react'
import { Pagination } from 'react-bootstrap';

const paginationBasic = ({ postsPerPage, totalPosts, paginate }) => {
    let active = 1;
    let items = [];
    for (let number = 1; number <= Math.ceil(totalPosts / postsPerPage); number++) {
    items.push(
        <Pagination.Item key={number} active={number === active} onClick={() => paginate(number)}>
        {number}
        </Pagination.Item>,
    );
    }   
  return (
    <Pagination>
    {items}
    </Pagination>
  )
}

export default paginationBasic