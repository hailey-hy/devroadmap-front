import React from "react";
import { profileCheck } from "../../hooks/profileCheck";
import { MEMO } from "../UI/Constants";
import "./note.css";

const Memo = ({ record, loading }) => {
  console.log(record);

  const item = [];

  for (let i = 0; i < record.length; i++) {
    item.push(
      <div className="container-memo">
        <div className="img-memo-container">
          <img
            src={profileCheck(record[i].profile)}
            alt=""
            className="img-memo"
          />
        </div>
        <div className="record-bubble memo-bubble">
          <div className="container-memo-detail">
            <div className="memo-grid">
              <h5 className="memo-name">{record[i].sender}</h5>
              <h5 className="memo-date">{record[i].writedate}</h5>
            </div>

            <h5 className="memo-detail">{record[i].message}</h5>
          </div>
        </div>
      </div>
    );
  }

  if (item.length > 0) {
    return <>{item}</>;
  } else {
    return <h5 id="no-memo">{MEMO.NO_MEMO}</h5>;
  }
};

export default Memo;
