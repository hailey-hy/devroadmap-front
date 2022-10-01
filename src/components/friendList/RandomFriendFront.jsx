import React, {useState, useEffect} from 'react'
import { Badge } from 'react-bootstrap'
import instance from '../../api';
import { useNavigate } from 'react-router-dom'
import { profileCheck } from '../../util/profileCheck';

const RandomFriendFront = () => {
  const [random2, setRandom2] = useState([]);

  useEffect(() => {
    // setLoading(true);
    instance({
        url: '/friend/match',
    }).then((response)=> {
        setRandom2(response.data.matching[1]);
        console.log(response.data);
        // setLoading(false);
    })

  }, []);

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
        window.localStorage.setItem("friend-nickname", friend.match_user_front_nickname);
        window.localStorage.setItem("friend-email", friend.match_user_front_email);
        navigate('/friend/garden')
      }
  
  if(random2.result === "ok"){
  return (
    <>
      <div className="friend go-friend" onClick={() => {
        goFriend(random2);
      }}>
        <Badge pill className="friend-field">front</Badge>
        <div className="friend-img">
            <img src={profileCheck(random2.match_user_front_profile)} alt="" className='friend-profile'/>
            </div>
        <div className="friend-detail-divider">
            <h5 className="friend-name">{random2.match_user_front_nickname}</h5>
            <h5 className='friend-progress'>{random2.match_user_front_progressrate}%</h5>
        </div>
        <div class="add-btn-random btn-friend-add" id={random2.match_user_front_nickname} onClick={(match_user_front_nickname) => {
              accept(match_user_front_nickname)}}>+</div>
      </div>
    </>
  )
}
}

export default RandomFriendFront