import React from "react";
import instance from "../../api";
import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { profileCheck } from "../../hooks/profileCheck";
import { FRIEND } from "../UI/Constants";

const SearchResult = (props) => {
  console.log(props.result);

  const accept = (e) => {
    console.log(e.target.id);
    instance({
      method: "post",
      url: "/friend/proposal/send",
      params: {
        proposalTo: e.target.id,
      },
    }).then((response) => {
      if (response.data === "ok") {
        var targetID = e.target.id;
        var target = document.getElementById(targetID);
        console.log(target);
        target.classList.add("complete");
        target.innerHTML = FRIEND.ADD_OK;
      }
    });
  };

  const navigate = useNavigate();

  const goFriend = (friend) => {
    window.localStorage.setItem("friend-nickname", friend.search_user_nickname);
    window.localStorage.setItem("friend-email", friend.search_user_email);
    navigate("/friend/garden");
  };

  const items = [];
  if (props.result.search_user_friendornot === "already friend") {
    items.push(<div id="already-friend">친구</div>);
  } else {
    items.push(
      <div
        class="add-btn-random btn-friend-add"
        id={props.result.search_user_email}
        onClick={accept}
      >
        +
      </div>
    );
  }

  if (props.result.search_user_friendornot != "doesn't exist nickname") {
    return (
      <div className="friend-add go-friend">
        <div
          className="friend-badge"
          id={props.result.search_user_nickname}
          onClick={() => {
            goFriend(props.result);
          }}
        >
          <Badge
            pill
            bg={
              props.result.search_user_field === "front" ? "primary" : "success"
            }
            className="friend-field"
          >
            {props.result.search_user_field}
          </Badge>
        </div>
        <div
          id={props.result.search_user_nickname}
          onClick={() => {
            goFriend(props.result);
          }}
        >
          <div className="friend-img">
            <img
              src={profileCheck(props.result.search_user_profile)}
              alt=""
              className="friend-profile"
            />
          </div>
        </div>
        <div
          className="friend-detail-divider"
          id={props.result.search_user_nickname}
          onClick={() => {
            goFriend(props.result);
          }}
        >
          <h5 className="friend-name">{props.result.search_user_nickname}</h5>
          <h5 className="friend-progress">
            {props.result.search_user_progressrate}%
          </h5>
        </div>
        {items}
      </div>
    );
  }
  // 친구 신청 대기 중일 경우?
  else if (props.result.search_user_friendornot === "not friend") {
    return <div>{FRIEND.PROCESSING}</div>;
  } else {
    return <div>{FRIEND.NO_RESULT}</div>;
  }
};

export default SearchResult;
