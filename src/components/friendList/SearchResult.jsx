import React from 'react'
import instance from '../../api'
import { Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchResult = (props) => {
  // result: "ok"
// search_user_email: "lillyine.hy@gmail.com"
// search_user_field: "front"
// search_user_joindate: "2022-06-23 01:57:48.0"
// search_user_nickname: "해연"

const accept = (e) => {
  console.log(e.target.id)
  instance({
      method: 'post',
      url: '/friend/proposal/acceptornot',
      params: {
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

const navigate = useNavigate();

const goFriend = (friend) => {
  window.localStorage.setItem("friend-nickname", friend.search_user_nickname);
  window.localStorage.setItem("friend-email", friend.search_user_email);
  navigate('/friend/garden')
}

const items = [];
if (props.result.search_user_friendornot === 'already friend'){
  items.push(
    <div id="already-friend">
      친구
    </div>
  )
} else {
  items.push(
    <div class="add-btn-random btn-friend-add" id={props.result.search_user_nickname} onClick={
      accept}>+</div>
  )
}

if(props.result.result === 'ok'){
  return (
    <div className="friend-add go-friend" onClick={() => {
      goFriend(props.result);
    }}>
          <Badge pill bg={props.result.search_user_field === 'front' ? 'primary' : 'success'} className="friend-field">{props.result.search_user_field}</Badge>
          <div className="friend-img"></div>
          <div className="friend-detail-divider">
              <h5 className="friend-name">{props.result.search_user_nickname}</h5>
              <h5 className='friend-progress'>{props.result.search_user_progressrate}%</h5>
          </div>
          {items}
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