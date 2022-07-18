import React from 'react'
import axios from 'axios'
import { Badge } from 'react-bootstrap'

const SearchResult = (props) => {
  // result: "ok"
// search_user_email: "lillyine.hy@gmail.com"
// search_user_field: "front"
// search_user_joindate: "2022-06-23 01:57:48.0"
// search_user_nickname: "해연"

const accept = (e) => {
  console.log(e.target.id)
  axios({
      method: 'post',
      url: 'https://localhost:8080/friend/proposal/acceptornot',
      params: {
        "Authorization": "Bearer " + localStorage.getItem("user"),
        "friendnickname": e.target.id,
        "acceptornot": true
      }
    }).then(response => {
      if(response.data === 'ok'){
          var targetID = e.target.id;
          var target = document.getElementById(targetID);
          console.log(target);
          target.classList.add('complete');
          target.innerHTML = '신청 완료!';
        }
    })
}

if(props.result.result === 'ok'){
  return (
    <div className="friend-add">
          <Badge pill bg={props.result.search_user_field === 'front' ? 'primary' : 'success'} className="friend-field">{props.result.search_user_field}</Badge>
          <div className="friend-img"></div>
          <div className="friend-detail-divider">
              <h5 className="friend-name">{props.result.search_user_nickname}</h5>
              <h5 className='friend-progress'>{props.result.search_user_progressrate}%</h5>
          </div>
          <div class="add-btn-random btn-friend-add" id={props.result.search_user_nickname} onClick={
              accept}>+</div>
      </div>
  )
}
else {
  return (
    <div>검색 결과가 없어요.</div>
  )
}  
}

export default SearchResult