import React, { useState } from "react";
import {
  Tooltip,
  OverlayTrigger,
  Modal,
  Button,
  Pagination,
  Badge,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import Memo from "../note/Memo";
import { useStudyList } from "../../hooks/useStudyList";
import "./garden.css";
import grass from "../../assets/img-garden/땅.png";
import sun from "../../assets/img-garden/해.png";
import cloud1 from "../../assets/img-garden/구름1.png";
import cloud2 from "../../assets/img-garden/구름2.png";
import cloud3 from "../../assets/img-garden/구름3.png";
import cloud4 from "../../assets/img-garden/구름4.png";
import cloud5 from "../../assets/img-garden/구름5.png";
import bird from "../../assets/img-garden/새.png";
import img20 from "../../assets/img-garden/정원사 사다리 올라가는 버전.png";
import { VscTriangleDown } from "react-icons/vsc";
import { useEffect } from "react";
import instance from "../../api";
import { modals } from "../UI/modals/Modals";
import { useModal } from "../../hooks/useModal";
import axios from "axios";

const Garden = (props) => {
  const field = useSelector((state) => state.field);
  const frontList = useStudyList("front");
  const backList = useStudyList("back");

  //친구 정원에서 접근할 경우 구분하여 새 표시
  if (props.friend === true) {
    var birdControl = "hide garden-img bird";
  }
  // else if (! window.localStorage.getItem("user")){
  //   var birdControl = 'hide garden-img bird';
  // }
  else {
    var birdControl = "show garden-img bird";
  }

  //전체 이미지 표시
  const item = [];

  const imgList = [
    "소나무",
    "꽃나무",
    "울타리",
    "새집",
    "토끼",
    "연못",
    "개구리",
    "분수대",
    "두더지",
    "벤치의자",
    "튤립",
    "민들레",
    "토끼풀",
    "돌",
    "덤불",
    "사다리",
    "다람쥐 그네",
    "정원사 앉아있는 버전",
    "개미",
    "지렁이",
    "연꽃",
  ];

  //이미지에 툴팁 추가
  for (let i = 1; i <= imgList.length; i++) {
    var imgId = "img" + i;
    var imgSrc = imgList[i - 1];
    if (
      (props.friend === true && props.friend - field === "front") ||
      field == "front"
    ) {
      if (i <= 11) {
        var msg = frontList[i - 1];
      } else if (i == 21) {
        var msg = frontList[5];
      } else if (i >= 14) {
        var msg = frontList[i - 3];
      }
    } else {
      if (i == 1) {
        var msg = backList[i - 1];
      } else if (i <= 11) {
        var msg = backList[i - 1];
      } else if (i >= 14) {
        var msg = backList[i - 3];
      }
    }

    //로그인에서 접근할 경우 툴팁 해제
    if (props.login === true || props.join === true) {
      item.push(
        <img
          id={imgId}
          class="garden-img"
          src={require(`../../assets/img-garden/${imgSrc}.png`)}
          alt={i}
        />
      );
    } else {
      item.push(
        <OverlayTrigger
          overlay={
            <Tooltip id={`tooltip-top`} className="tooltips">
              <strong>{msg}</strong>
            </Tooltip>
          }
        >
          <img
            id={imgId}
            class="garden-img hide"
            src={require(`../../assets/img-garden/${imgSrc}.png`)}
            alt={i}
          />
        </OverlayTrigger>
      );
    }
  }

  //사다리 + 정원사 툴팁 표시
  const items2 = [];

  if (
    (props.friend == true && props.friend - field === "front") ||
    field == "front"
  ) {
    items2.push(
      <OverlayTrigger
        overlay={
          <Tooltip id={`tooltip-top`} className="tooltips">
            <strong>
              CSS 프레임워크, <br></br>서버 사이드 렌더링
            </strong>
          </Tooltip>
        }
      >
        <img id="img22" class="garden-img hide" src={img20} alt="22" />
      </OverlayTrigger>
    );
  } else {
    items2.push(
      <OverlayTrigger
        overlay={
          <Tooltip id={`tooltip-top`} className="tooltips">
            <strong>
              검색엔진, <br></br>컨테이너화 vs 가상화
            </strong>
          </Tooltip>
        }
      >
        <img id="img22" class="garden-img hide" src={img20} alt="22" />
      </OverlayTrigger>
    );
  }

  //본인 정원일 경우 정원 채우기 안내 메시지 출력
  const item3 = [];

  if (
    props.friend == undefined &&
    props.login == undefined &&
    props.join == undefined
  ) {
    item3.push(
      <OverlayTrigger
        overlay={
          <Tooltip id={`tooltip-top`} className="tooltips">
            <strong>
              로드맵을 완료하고 <br /> 정원을 더 채워 보세요!
            </strong>
          </Tooltip>
        }
      >
        <div id="msg-to-down">
          <VscTriangleDown id="arrow-to-down"></VscTriangleDown>
          {/* <h3 >정원 채우기</h3> */}
        </div>
      </OverlayTrigger>
    );
  }

  //안읽은 메시지 데이터 불러오는 api
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(2);

  useEffect(() => {
    axios
      .get({
        url: "https://jsonplaceholder.typicode.com/posts",
      })
      .then((response) => {
        setRecord(response.data.guestbook_list);
        setLoading(false);
      });
    // instance({
    //   url: '/guestbook/bird/list',
    // }).then(response => {
    //     setRecord(response.data.guestbook_list);
    //     setLoading(false);
    //   })
  }, []);

  // 모달 창 관련
  const { openModal, closeModal } = useModal();

  //안 읽은 메시지 모달 창

  const handleOpenMsg = () => {
    // setRecord([]); //리액트 내에서 읽음을 확인 처리하기 위함
    openModal(modals.page, {
      title: "안읽은 메시지",
      body: "테스트",
      // {
      //   pageComponent : <Memo record={currentRecord(record)} loading={loading}></Memo>,
      //   page : <Pagination>{items}</Pagination>,
      // },

      onClose: () => {
        closeModal(modals.page);
      },
    });
  };

  //안읽은 메시지가 없을 경우 모달 창
  const handleOpenNoMsg = () => {
    openModal(modals.simple, {
      title: "안읽은 메시지",
      body: "읽지 않은 메시지가 없습니다.",
      onClose: () => closeModal(modals.simple),
    });
  };

  //안 읽은 메시지 페이지네이션
  const makeUnReadMsgPagination = () => {
    const indexOfLast = currentPage * recordPerPage;
    const indexOfFirst = indexOfLast - recordPerPage;
    const recordArray = Array.from(record);
    const currentRecord = (record) => {
      let currentRecord = 0;
      currentRecord = recordArray.slice(indexOfFirst, indexOfLast);
      return currentRecord;
    };
    const totalrecord = record.length;

    let [active, setActive] = useState(1);
    let items = [];
    for (
      let number = 1;
      number <= Math.ceil(record.length / recordPerPage);
      number++
    ) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => {
            setCurrentPage(number);
            setActive(number);
          }}
        >
          {number}
        </Pagination.Item>
      );
    }
  };

  //새 클릭시 작동 함수
  const onBird = () => {
    handleOpenMsg();
    if (record.length > 0) {
      handleOpenMsg();
    } else {
      handleOpenNoMsg();
    }
  };

  return (
    <>
      <div id="container-img">
        <img id="grass" class="garden-img" src={grass} alt="" />
        <img id="sun" class="garden-img" src={sun} alt="" />
        <img id="cloud1" class="garden-img" src={cloud1} alt="" />
        <img id="cloud2" class="garden-img" src={cloud2} alt="" />
        <img id="cloud3" class="garden-img" src={cloud3} alt="" />
        <img id="cloud4" class="garden-img" src={cloud4} alt="" />
        <img id="cloud5" class="garden-img" src={cloud5} alt="" />
        <div id="bird-container" className={birdControl}>
          <img
            id="bird"
            class={birdControl}
            src={bird}
            alt=""
            onClick={onBird}
          />
          {/* <Badge bg="danger" className="bird-alert">
            {record.length}
          </Badge> */}
          <span className="visually-hidden">unread messages</span>
        </div>
      </div>
      <div id="container-garden">
        {item}
        {items2}
        {item3}
      </div>
      <div id="msg-garden"></div>

      {/* <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>안읽은 메시지</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Memo record={currentRecord(record)} loading={loading}></Memo>
              <Pagination>{items}</Pagination>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                닫기
            </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={show2} onHide={handleClose2}>
            <Modal.Header closeButton>
            <Modal.Title>안읽은 메시지</Modal.Title>
            </Modal.Header>
            <Modal.Body>
             읽지 않은 메시지가 없습니다.
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
                닫기
            </Button>
            </Modal.Footer>
        </Modal> */}
    </>
  );
};

export default Garden;
