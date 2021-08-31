import styles from "./Myinfo.module.css";
import React, { useState } from "react";
import MyinfoModify from "../../pages/myinfoModify/MyinfoModify";
import NullPage from "../NullPage/Nullpage";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Myinfo = ({ info, accessToken, isLogin }) => {
  const history = useHistory();

  const handleClickModify = () => {
    //setIsModifyClicked(true);
    history.push("/modifyinfo");
  };
  //console.log(info, "마이인포");

  return (
    <>
      {isLogin ? (
        <>
          <div className={styles.infobox}>
            <div className={styles.imgbox}>
              <span className={styles.imgborder}>
                <img
                  src="../../../images/face.svg"
                  className={styles.faceimg}
                ></img>
              </span>
            </div>
            <div className={styles.textbox}>
              <div className={styles.ulbox}>
                <span className={styles.list}>
                  아이디:
                  <input
                    className={styles.input}
                    value={info.userid}
                    readOnly
                  ></input>
                </span>
                <span className={styles.list}>
                  닉네임:
                  <input
                    className={styles.input}
                    value={info.nickname}
                    readOnly
                  ></input>
                </span>
                <span className={styles.list}>
                  모바일:
                  <input
                    className={styles.input}
                    value={info.mobile}
                    readOnly
                  ></input>
                </span>
              </div>
            </div>
          </div>

          <div className={styles.btns}>
            <button className={styles.btn}>회원탈퇴(optional)</button>

            <button className={styles.btn} onClick={handleClickModify}>
              수정하기
            </button>
          </div>
        </>
      ) : (
        <NullPage />
      )}
    </>
  );
};

export default Myinfo;
