import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Signin from "../../components/signin/Signin";
import styles from "./Navbar.module.css";

const Navbar = ({
  handleResponseSuccess,
  onSignout,
  isLogin,
  info,
  setListRender,
  isAuthenticated,
  setInfo,
  accessToken,
}) => {
  //props로 isSignIn받고 true일경우 login/ false일경우 logout버튼
  const history = useHistory();
  const [isSigninClicked, setIsSigninClicked] = useState(false);

  const clickSigninBtn = () => {
    setIsSigninClicked(true);
  };
  const clickCloseBtn = () => {
    setIsSigninClicked(false);
  };

  const reset = () => {
    // 로고 홈버튼 클릭하면 해시태그 선택 안 되고 전체로 reset
    setListRender();
  };

  const clickmypage = () => {
    // axios
    //   .get(
    //     "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/user/:id",
    //     {
    //       params: {
    //         // id: info.userid,
    //       },
    //       headers: {
    //         authorization: accessToken,
    //       },
    //       "Content-Type": "application/json",
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //     // setInfo({
    //     //   //인포상태 변화 //받아온 데이터로 넣어주기
    //     //   userid: "abc1234",
    //     //   nickname: "춘식",
    //     //   mobile: "010-0000-0000",
    //     //   password: "",
    //     //   password2: "",
    //     // });
    //   });
    history.push("/mypage");
    //isAuthenticated(accessToken);
  };

  return (
    <header className={styles.header}>
      {/* 가입하기 모달창 */}
      {isSigninClicked ? (
        <Signin
          clickCloseBtn={clickCloseBtn}
          handleResponseSuccess={handleResponseSuccess}
          setInfo={setInfo}
          accessToken={accessToken}
        />
      ) : null}

      <div className={styles.contentbox}>
        <Link to="/" className={styles.underline}>
          <div className={styles.title} onClick={reset}>
            Pick me Up
          </div>
        </Link>
        <div className={styles.btns}>
          {isLogin ? (
            <button className={styles.signbtn} onClick={onSignout}>
              Logout
            </button>
          ) : (
            <button className={styles.signbtn} onClick={clickSigninBtn}>
              Sign in
            </button>
          )}

          {/* <Link to="/mypage"> */}
          <button className={styles.mypagebtn} onClick={clickmypage}>
            My page
          </button>
          {/* </Link> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
