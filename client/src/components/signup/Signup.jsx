import styles from './Signup.module.css';

import React from 'react';

const Signup = ({setIsSignUpClicked, clickCloseSignIn}) => {

      const clickCloseAll = () => {
            setIsSignUpClicked(false);
            clickCloseSignIn();
      }

    return(
            <section className={styles.backdrop}>
                  <div className={styles.signup}>
                  <div className={styles.titlebox}>
                  <span className={styles.title}>sign up</span>
                  <span className={styles.close} onClick={clickCloseAll}>
                        <img src="../../../images/close.svg" className={styles.img}></img>
                  </span>
                  </div>
                  {/* <form className={styles.form}> */}
                  <ul className={styles.list}>
                        <li className={styles.item}>
                              <input type="text"  className={styles.text} placeholder="아이디를 입력하세요"/>
                              <label className={styles.label}>이미 존재하는 아이디입니다.</label>
                        </li>
                        <li className={styles.item}>
                              <input type="text"  className={styles.text} placeholder="닉네임을 입력하세요"/>
                        </li>
                        <li className={styles.item}>
                              <input type="text"  className={styles.text} placeholder="휴대폰번호를 입력하세요"/>
                        </li>
                        <li className={styles.item}>
                              <input type="text"  className={styles.text} placeholder="비밀번호를 입력하세요"/>
                        </li>
                        <li className={styles.item}>
                              <input type="text"  className={styles.text} placeholder="비밀번호를 확인해주세요"/>
                              <label className={styles.label}>비밀번호를 틀렸습니다.</label>
                        </li>

                        <li className={styles.item}>
                              <button className={styles.signupBtn} >
                              Sign up
                              </button>
                        </li>
                  </ul>
                  {/* </form> */}
                  </div>
            </section>
    );
}

export default Signup;