//친구 신청 목록 컴포넌트

import React from "react";
import { Badge, Button } from "react-bootstrap";
import { MdCancel } from "react-icons/md";
import "./friendList.css";
import instance from "../../api";
import { useNavigate } from "react-router-dom";
import { profileCheck } from "../../hooks/profileCheck";
import { FRIEND } from "../UI/Constants";

const FriendAddList = ({ record, loading }) => {
  console.log(record);
  const accept = (e) => {
    const targetChild = e.target;
    const targetNick = targetChild.parentNode.parentNode.parentNode;
    console.log(targetChild);
    console.log(targetNick);
    instance({
      method: "post",
      url: "/friend/proposal/acceptornot",
      params: {
        friendnickname: targetNick.id,
        acceptornot: true,
      },
    }).then((response) => {
      if (response.data === "ok") {
        // 수락 -> 등록 완료
        const targetUpdate = e.target.parentNode;
        targetUpdate.classList.add("complete");
        targetUpdate.innerHTML = FRIEND.ACCEPT_OK;

        const targetDelete = targetUpdate.nextSibling;
        // const targetDeleteBtn = targetDelete.nextElementSibling;
        console.log(targetDelete);
        targetDelete.style.pointerEvents = "none";
      }
    });
  };

  const refuse = (e) => {
    const targetChild = e.target;
    const targetNick = targetChild.parentNode.parentNode.parentNode;
    console.log(targetChild);
    console.log(targetNick);
    instance({
      method: "post",
      url: "/friend/proposal/acceptornot",
      params: {
        friendnickname: targetNick.id,
        acceptornot: false,
      },
    }).then((response) => {
      if (response.data === "ok") {
        // 거절 -> 거절 완료
        const targetUpdate = e.target.parentNode;
        targetUpdate.classList.add("complete");
        targetUpdate.innerHTML = FRIEND.DECLINE_OK;

        const targetDelete = targetUpdate.previousSibling;
        // const targetDeleteBtn = targetDelete.nextElementSibling;
        console.log(targetDelete);
        targetDelete.style.pointerEvents = "none";
      }
    });
  };

  const navigate = useNavigate();

  const goFriend = (friend) => {
    window.localStorage.setItem("friend-nickname", friend.friend_nickname);
    window.localStorage.setItem("friend-email", friend.friend_email);
    navigate("/friend/garden");
  };

  if (record.length > 0) {
    return (
      <>
        {record.map((record) => (
          <div className="friend-add go-friend" id={record.friend_nickname}>
            <div
              onClick={() => {
                goFriend(record);
              }}
            >
              <Badge
                pill
                className="friend-field"
                bg={record.friend_field === "front" ? "primary" : "success"}
              >
                {record.friend_field}
              </Badge>
            </div>
            <div
              onClick={() => {
                goFriend(record);
              }}
            >
              <div className="friend-img">
                <img
                  src={profileCheck(record.friend_profile)}
                  alt=""
                  className="friend-profile"
                />
              </div>
            </div>
            <div
              className="friend-detail-divider"
              onClick={() => {
                goFriend(record);
              }}
            >
              <h5 className="friend-name">{record.friend_nickname}</h5>
              <h5 className="friend-progress">{record.friend_progressRate}%</h5>
            </div>
            {/* <MdCancel className='friend-cancle'/> */}
            <div className="btn-friend-grid">
              <div className="add-btn-random btn-friend-add" onClick={accept}>
                <h5 className="friend-accept">{FRIEND.ACCEPT}</h5>
              </div>
              <div class="add-btn-random btn-friend-add" onClick={refuse}>
                <h5 className="friend-accept">{FRIEND.DECLINE}</h5>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  } else {
    return <h5 id="alret-no-add-friend">{FRIEND.NO_ADD}</h5>;
  }
};

export default FriendAddList;
