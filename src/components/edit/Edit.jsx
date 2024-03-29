import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  ButtonGroup,
  ToggleButton,
  Modal,
  Tooltip,
  Overlay,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import instance from "../../api";
import "./edit.css";
import { profileCheck } from "../../hooks/profileCheck";
import { useSelector } from "react-redux";
import { upload } from "@testing-library/user-event/dist/upload";
import { EDIT, EDIT_ALERT, BUTTON, USER_INPUT } from "../UI/Constants";

//회원 정보 수정 페이지

const Edit = () => {
  const userNickname = useSelector((state) => state.nickname);
  const userProfile = useSelector((state) => state.profile);
  const userField = useSelector((state) => state.field);

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  };

  //프로필 사진

  const [files, setFiles] = useState("");

  const onLoadFile = (e) => {
    const file = e.target.files;
    setFiles(file);
    preview();
  };

  //프로필 사진 미리보기
  useEffect(() => {
    preview();

    return () => preview();
  }, [files]);

  const preview = () => {
    if (!files) return false;

    const hide = document.querySelector("#original-img");
    const imgEL = document.querySelector(".img-box");
    if (hide != null) {
      hide.style.display = "none";
      const reader = new FileReader();

      reader.onload = () => {
        imgEL.style.backgroundImage = `url(${reader.result})`;
      };
      if (files[0] != null) {
        reader.readAsDataURL(files[0]);
      }
    }
  };

  //공부 유형
  const [radioSecValue, setRadioSecValue] = useState(userField);

  const radiosSec = [
    { name: "front", value: "front" },
    { name: "back", value: "back" },
  ];

  //중복 확인 관련
  const [nickCheck, setNickCheck] = useState(false);
  const [pwCheck, setPwCheck] = useState(false);
  const [pwDoubleCheck, setPwDoubleCheck] = useState(false);

  // 닉네임 확인 툴팁

  const [showNickCheck, setShowNickCheck] = useState(false);
  const [showNickCheck2, setShowNickCheck2] = useState(false);
  const target = useRef(null);

  //닉네임 확인
  const onClickNickCheck = () => {
    instance({
      method: "post",
      url: "/edit/nickname/check",
      params: {
        nickname: nickname,
      },
    })
      .then((response) => {
        if (response.data == "ok") {
          setNickCheck(true);
          setShowNickCheck(true);
          setShowNickCheck2(false);
        } else {
          setShowNickCheck2(true);
          setShowNickCheck(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //비밀번호 확인 툴팁
  const [showPwCheck, setShowPwCheck] = useState(false);
  const [showPwCheck2, setShowPwCheck2] = useState(false);
  const [showPwCheck3, setShowPwCheck3] = useState(false);
  const targetPw = useRef(null);

  //비밀번호 자리 수 확인
  const onClickPwDoubleCheck = () => {
    if (password.length < 4 || password.length > 10) {
      setPwCheck(false);
      setPwDoubleCheck(false);
      setShowPwCheck(false);
      setShowPwCheck2(false);
      setShowPwCheck3(true);
    } else if (password == passwordCheck) {
      setPwCheck(true);
      setPwDoubleCheck(true);
      setShowPwCheck(true);
      setShowPwCheck2(false);
      setShowPwCheck3(false);
    } else {
      setPwCheck(false);
      setPwDoubleCheck(false);
      setShowPwCheck2(true);
      setShowPwCheck(false);
      setShowPwCheck3(false);
    }
  };

  // 모달창 관련
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  //수정하기 버튼

  var ok = false;
  const onClickEdit = () => {
    //닉네임 중복, 비밀번호 자리수, 비밀번호 확인 여부 확인
    if (nickname.length > 0) {
      ok = false;
      if (nickCheck) {
        ok = true;
      }
    }

    if (password.length > 0) {
      ok = false;
      if (pwCheck) {
        ok = true;
      }
    }

    if (nickname.length == 0 && nickname.length == 0) {
      ok = true;
    }

    doEdit();
  };

  const doEdit = () => {
    console.log(nickname);
    console.log(nickCheck);
    console.log(password.length);
    console.log(pwCheck);
    console.log(ok);
    if (ok) {
      console.log(radioSecValue);
      const formdata = new FormData();
      formdata.append("uploadImage", files[0]);
      console.log(formdata);
      for (let value of formdata.values()) {
        console.log(value);
      }

      instance({
        method: "post",
        url: "/edit/userdetails",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          nickname: nickname,
          email: email,
          password: password,
          profile: { formdata },
          field: radioSecValue,
        },
      })
        .then((response) => {
          handleShow();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      handleShow2();
    }
  };

  return (
    <section id="edit">
      <div className="container-white container">
        <h3 id="white-title">{EDIT.TITLE}</h3>
        <div className="chunck-container-edit">
          <div className="chunck-for-divide">
            <div className="detail-container-edit">
              <h5 className="detail-title">{USER_INPUT.PROFILE}</h5>
              <form className="img-container img-container-edit">
                <div id="img-edit" className="img-box">
                  <img
                    src={profileCheck(userProfile)}
                    alt=""
                    id="original-img"
                  />
                </div>
                <Form.Group
                  controlId="formFileSm"
                  className="mb-3"
                  id="img-upload"
                  accept="image/*"
                  onChange={onLoadFile}
                >
                  <Form.Control type="file" size="sm" />
                </Form.Group>
              </form>
            </div>
            <div className="detail-container-edit">
              <h5 className="detail-title">{USER_INPUT.TYPE}</h5>
              <ButtonGroup id="type" className="mb-2">
                {radiosSec.map((radioSec, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radioSec-${idx}`}
                    type="radio"
                    variant="primary"
                    name="radioSec"
                    value={radioSec.value}
                    checked={radioSecValue === radioSec.value}
                    onChange={(e) => setRadioSecValue(e.currentTarget.value)}
                  >
                    {radioSec.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div>
          </div>
          <div className="chunck-for-divide">
            <div className="detail-container-edit">
              <h5 className="detail-title">{USER_INPUT.NICKNAME}</h5>
              <Overlay
                target={target.current}
                show={showNickCheck}
                placement="top-end"
                id="tooltip-nickCheck"
              >
                {(props) => (
                  <Tooltip id="nick-alert" {...props}>
                    {USER_INPUT.NICK_OK}
                  </Tooltip>
                )}
              </Overlay>
              <Overlay
                target={target.current}
                show={showNickCheck2}
                placement="top-end"
              >
                {(props) => (
                  <Tooltip id="nick-alert" {...props}>
                    {USER_INPUT.NICK_FAIL}
                  </Tooltip>
                )}
              </Overlay>
              <div ref={target}>
                <div className="divider">
                  <Form.Control
                    className="join-input"
                    type="text"
                    placeholder={userNickname}
                    value={nickname}
                    onChange={handleNickname}
                  />
                  <Button
                    className="id-check"
                    variant="primary"
                    onClick={onClickNickCheck}
                  >
                    확인
                  </Button>
                </div>
              </div>
            </div>
            <div className="detail-container-edit">
              <div id="detail-pw">
                <h5 className="detail-title pw">{USER_INPUT.PW}</h5>
              </div>
              <div ref={targetPw}>
                <Form.Control
                  className="join-input"
                  id="input-pw"
                  type="password"
                  placeholder={USER_INPUT.PW}
                  value={password}
                  onChange={handlePassword}
                />
              </div>

              <div className="divider">
                <Form.Control
                  className="join-input"
                  id="input-pw"
                  type="password"
                  placeholder={USER_INPUT.PW_CHECK}
                  value={passwordCheck}
                  onChange={handlePasswordCheck}
                />
                <Overlay
                  target={targetPw.current}
                  show={showPwCheck}
                  placement="top-end"
                >
                  {(props) => (
                    <Tooltip id="nick-alert" {...props}>
                      {USER_INPUT.PW_CHECK_OK}
                    </Tooltip>
                  )}
                </Overlay>
                <Overlay
                  target={targetPw.current}
                  show={showPwCheck2}
                  placement="top-end"
                >
                  {(props) => (
                    <Tooltip id="nick-alert" {...props}>
                      {USER_INPUT.PW_CHECK_FAIL}
                    </Tooltip>
                  )}
                </Overlay>
                <Overlay
                  target={targetPw.current}
                  show={showPwCheck3}
                  placement="top-end"
                >
                  {(props) => (
                    <Tooltip id="nick-alert" {...props}>
                      {USER_INPUT.PW_RULE}
                    </Tooltip>
                  )}
                </Overlay>

                <Button
                  className="id-check"
                  variant="primary"
                  onClick={onClickPwDoubleCheck}
                >
                  확인
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Button id="btn-edit" onClick={onClickEdit}>
          수정하기
        </Button>

        {/* 경고창 */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{EDIT_ALERT.DONE_TITLE}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{EDIT_ALERT.DONE_BODY}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {BUTTON.CLOSE}
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>{EDIT_ALERT.FAIL_TITLE}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{EDIT_ALERT.FAIL_BODY}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              {BUTTON.CLOSE}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </section>
  );
};

export default Edit;
