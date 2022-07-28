import React, {useState, useEffect} from 'react'
import { Badge } from 'react-bootstrap'
import {MdCancel} from 'react-icons/md'
import instance from '../../api'
import { useNavigate } from 'react-router-dom'

const RandomFriendBack = () => {
  const [random1, setRandom1] = useState([]);

  useEffect(() => {
    // setLoading(true);
    instance({
        url: '/friend/match',
    }).then((response)=> {
        setRandom1(response.data.matching[0]);
        console.log(response.data);
        // setLoading(false);
    })

  }, []);

  console.log(random1)

  //친구 신청
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
              target.classList.add('complete');
              target.innerHTML = '신청 완료!';
              }
          })
    }

    //친구 정원 이동
    const navigate = useNavigate();

    const goFriend = (friend) => {
      window.localStorage.setItem("friend-nickname", friend.match_user_back_nickname);
      window.localStorage.setItem("friend-email", friend.match_user_back_email);
      navigate('/friend/garden')
    }

    if(random1.result === "ok"){
  return (
    <>
      <div className="friend go-friend" onClick={() => {
        goFriend(random1);
      }}>
        <Badge pill className="friend-field" bg='success'>back</Badge>
        <div className="friend-img">
            <img src={random1.match_user_back_profile} alt="" />
            </div>
        <div className="friend-detail-divider">
            <h5 className="friend-name">{random1.match_user_back_nickname}</h5>
            <h5 className='friend-progress'>{random1.match_user_back_progressrate}%</h5>
        </div>
        <div class="add-btn-random btn-friend-add" id={random1.match_user_back_nickname} onClick={(match_user_back_nickname) => {
              accept(match_user_back_nickname)}}>+</div>
      </div>
    </>
  )
  }
}

export default RandomFriendBack