import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Signin from "../../components/signin/Signin";
import styles from "./Navbar.module.css";

const Navbar = ({
  handleResponseSuccess,
  onSignout,
  isLogin,
  info,
  filterHandle,
  isAuthenticated,
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
    filterHandle();
  };

  const clickmypage = () => {
    isAuthenticated();
    history.push("/mypage");
  };

  return (
    <header className={styles.header}>
      {/* 가입하기 모달창 */}
      {isSigninClicked ? (
        <Signin
          clickCloseBtn={clickCloseBtn}
          handleResponseSuccess={handleResponseSuccess}
        />
      ) : null}

      <div className={styles.contentbox}>
        <Link to="/" className={styles.underline}>
          <div className={styles.title} onClick={reset}>
            Pick me up
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
