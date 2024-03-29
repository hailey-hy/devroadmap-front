import React, { useState, useEffect } from "react";
import instance from "../../api";
import "./friendGarden.css";
import { Button, Modal, Form } from "react-bootstrap";
import Garden from "../garden/Garden";
import Status from "../main/Status";
import { profileCheck } from "../../hooks/profileCheck";
import "./friendGarden.css";
import { FR_GARDEN, FR_GARDEN_ALERT } from "../UI/Constants";
import grass from "../../assets/img-garden/땅.png";
import sun from "../../assets/img-garden/해.png";
import cloud1 from "../../assets/img-garden/구름1.png";
import cloud2 from "../../assets/img-garden/구름2.png";
import cloud3 from "../../assets/img-garden/구름3.png";
import cloud4 from "../../assets/img-garden/구름4.png";
import cloud5 from "../../assets/img-garden/구름5.png";
import bird from "../../assets/img-garden/새.png";

const FriendGarden = () => {
  //친구 정원 api
  const [friendOrNot, setFriendOrNot] = useState(true);
  const friendName = localStorage.getItem("friend-nickname");
  const friendEmail = localStorage.getItem("friend-email");
  const [friendField, setFriendField] = useState("front");
  const [friendProfile, setFriendProfile] = useState("");

  useEffect(() => {
    instance({
      url: "/friend/details",
      params: {
        friendNickname: friendName,
      },
    }).then((response) => {
      //친구 정보 불러오기
      setFriendField(response.data.user_field);
      console.log(friendField);

      setFriendProfile(profileCheck(response.data.friendProfile));
      //친구 완료 항목
      let savedItem = [];

      console.log(response.data.complete_subjects);
      savedItem = response.data.complete_subjects;

      for (let i = 1; i < savedItem.length; i++) {
        var targetID = savedItem[i].object;
        console.log(targetID);
        var target = document.getElementById("img" + targetID);
        target.classList.remove("hide");
        target.classList.add("show");

        if (targetID === 11) {
          var target = document.getElementById("img" + 12);
          target.classList.remove("hide");

          var target = document.getElementById("img" + 13);
          target.classList.remove("hide");
        }
      }
    });
    instance({
      url: "/friendornot",
      params: {
        friendNickname: friendName,
      },
    }).then((response) => {
      if (response.data === "no") {
        var target = document.getElementById("btn-note");
        target.innerHTML = "친구 신청";
        setFriendOrNot(false);
      }
    });
    //친구 여부에 따라 버튼 바꾸기
  }, []);

  // 친구 여부에 따라 다른 버튼 내용
  const noteOrAdd = () => {
    if (friendOrNot === false) {
      friendAdd();
    } else {
      handleShowMsg();
    }
  };

  //친구 신청 관련 모음
  const friendAdd = () => {
    instance({
      method: "post",
      url: "/friend/proposal/acceptornot",
      params: {
        friendnickname: friendName,
        acceptornot: true,
      },
    }).then((response) => {
      var target = document.getElementById("btn-note");
      target.innerHTML = "친구 신청 완료!";
      target.style.pointerEvents = "none";
    });
  };

  //방명록 모달창 관련 모음
  const [showMsg, setShowMsg] = useState(false);

  const handleCloseMsg = () => setShowMsg(false);
  const handleShowMsg = () => setShowMsg(true);

  const [text, setText] = useState("");

  const sendNote = () => {
    instance({
      url: "/guestbook/write",
      params: {
        userReceive: friendEmail,
        message: text,
      },
    }).then((response) => {
      handleCloseMsg();
      handleShow();
    });
  };

  //방명록 텍스트 관련

  const textCounter = (e) => {
    setText(e.target.value);

    //글자 수 세기
    var textCount = e.target.value.length;
    console.log(e.target.value);
    console.log(e.target.value.length);

    const target = document.getElementById("text-count");

    if (textCount <= 200) {
      target.innerHTML = textCount + "/200";
    } else {
      target.innerHTML = "200/200";
    }
  };

  //방명록 남기는 중 모달창

  //방명록 작성 완료 모달창
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section>
      <Garden friend={true} friend-field={friendField}></Garden>
      <Status friend={true} friendField={friendField}></Status>
      {/* 친구 정원 알림창 */}
      <div id="container-friend-notion">
        <img src={friendProfile} alt="" className="friend-profile" />
        <h5 id="friend-notion-title">
          {friendName}
          {FR_GARDEN.TITEL}
        </h5>
        <Button id="btn-note" variant="primary" onClick={noteOrAdd}>
          {FR_GARDEN.ADD_NOTE}
        </Button>
      </div>

      {/* 방명록 남기기 모달 창 */}
      <Modal show={showMsg} onHide={handleCloseMsg}>
        <Modal.Header closeButton>
          <Modal.Title>
            {friendName}
            {FR_GARDEN_ALERT.ADD_NOTE_TITLE}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={textCounter}
                maxlength="200"
                placeholder={FR_GARDEN_ALERT.ADD_NOTE_PLACEHOLDER}
              />
            </Form.Group>
          </Form>
          <div id="text-count">{FR_GARDEN_ALERT.ADD_NOTE_TEXT_COUNT}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMsg}>
            취소
          </Button>
          <Button variant="primary" onClick={sendNote}>
            남기기
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{FR_GARDEN_ALERT.DONE_NOTE_TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{FR_GARDEN_ALERT.DONE_NOTE_BODY}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
            }}
          >
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default FriendGarden;
