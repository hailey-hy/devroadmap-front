import React, {useState, useEffect} from 'react'
import { Badge } from 'react-bootstrap'
import axios from 'axios'

const RandomFriendFront = () => {
  const [random2, setRandom2] = useState([]);

  useEffect(() => {
    // setLoading(true);
    axios({
        method: 'get',
        url: 'https://localhost:8080/friend/match',
        params: {
          "Authorization": "Bearer " + localStorage.getItem("user")
        }
    }).then((response)=> {
        setRandom2(response.data.matching[1]);
        console.log(response.data);
        // setLoading(false);
    })

  }, []);

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
              target.classList.add('complete');
              target.innerHTML = '신청 완료!';
              }
          })
    }
  if(random2.result === "ok"){
  return (
    <>
      <div className="friend" >
        <Badge pill className="friend-field">front</Badge>
        <div className="friend-img">
            <img src={random2.match_user_front_profile} alt="" />
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