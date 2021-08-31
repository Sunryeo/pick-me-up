import styles from "./MyinfoModify.module.css";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import RealVote from "../../components/modals/RealVote";
import NullPage from "../../components/NullPage/Nullpage";

axios.defaults.withCredentials = true;
const MyinfoModify = ({
  info,
  setInfo,
  accessToken,
  isLogin = { isLogin },
}) => {
  const history = useHistory();
  const idRef = useRef();
  const nicknameRef = useRef();
  const mobileRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();

  const [modifyYes, setModifyYes] = useState(false);

  const onChange = (event) => {
    setInfo({
      ...info,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const doneModify = () => {
    //수정하기=> 모달띄우기
    setModifyYes(true);
  };

  const realModify = () => {
    //모달에서 네!
    //axios.post 프로필수정.=> ok시
    axios
      .post(
        "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/user/profile/:id",
        { userName: info.nickname, mobile: info.mobile },
        {
          params: {
            id: info.userid,
          },
          headers: {
            authorization: accessToken,
          },
          "Content-Type": "application/json",
        }
      )
      .then((result) => {
        console.log(result);
        // if (result.data.message === "ok") {
        //   setModifyYes(false);
        //   history.push("/");
        // }
      });

    setInfo({
      ...info,
      password: "",
      password2: "",
    });
    history.push("/");
  };
  const realno = () => {
    setModifyYes(false);
    history.push("/mypage");
  };
  const noModify = () => {
    //취소하기버튼
    history.push("/mypage");
  };
  return (
    <>
      {isLogin ? (
        <form onSubmit={(e) => e.preventDefault()}>
          {modifyYes ? (
            <section className={styles.backdrop}>
              <div className={styles.realVote}>
                <span className={styles.title}>진짜 진짜 수정할꼬얌?</span>
                <span className={styles.btns1}>
                  <button className={styles.btn2} onClick={realno}>
                    아니오
                  </button>
                  <button className={styles.btn2} onClick={realModify}>
                    네
                  </button>
                </span>
              </div>
            </section>
          ) : // <div className={styles.modalcontainer}>
          //   진짜 진짜 수정할꼬얌 ?<button onClick={realModify}>네</button>
          //   <button onClick={realno}>아니오</button>
          // </div>
          null}
          <div className={styles.contain}>
            <div className={styles.infobox}>
              <div className={styles.imgbox}>
                <span className={styles.imgborder}>
                  <img
                    src="../../../images/face.svg"
                    className={styles.faceimg}
                  ></img>
                </span>
                <label for="profileEdit" className={styles.editbox}>
                  프로필사진 수정
                </label>
                {/* <input
                type="file"
                id="profileEdit"
                className={styles.editbtn}
              ></input> */}
              </div>
              <div className={styles.textbox}>
                <div className={styles.ulbox}>
                  <span className={styles.list}>
                    아이디:
                    <input
                      type="text"
                      ref={idRef}
                      className={styles.input}
                      value="{info.userid}"
                      name="userid"
                      onChange={onChange}
                      autoComplete="off"
                    ></input>
                  </span>
                  <span className={styles.list}>
                    닉네임:
                    <input
                      type="text"
                      ref={nicknameRef}
                      className={styles.input}
                      value="{info.nickname}"
                      name="nickname"
                      onChange={onChange}
                      autoComplete="off"
                    ></input>
                  </span>
                  <span className={styles.list}>
                    모바일:
                    <input
                      type="text"
                      ref={mobileRef}
                      className={styles.input}
                      value="{info.mobile}"
                      name="mobile"
                      onChange={onChange}
                      autoComplete="off"
                    ></input>
                  </span>
                  <span className={styles.list}>
                    비밀번호:
                    <input
                      type="text"
                      ref={passwordRef}
                      className={styles.input}
                      value="{info.password}"
                      name="password"
                      onChange={onChange}
                      autoComplete="off"
                    ></input>
                  </span>
                  <span className={styles.list}>
                    비밀번호확인:
                    <input
                      type="text"
                      ref={password2Ref}
                      className={styles.input}
                      value="{info.password2}"
                      name="password2"
                      onChange={onChange}
                      autoComplete="off"
                    ></input>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.btns}>
              <button className={styles.btn} onClick={noModify}>
                취소?
              </button>
              <button className={styles.btn} onClick={doneModify}>
                수정완료
              </button>
            </div>
          </div>
        </form>
      ) : (
        <NullPage />
      )}
    </>
  );
};

export default MyinfoModify;

//뒤로가기  버튼 막기
