import React, { useState } from 'react';
import Navbar from '../../pages/navbar/Navbar';
import Signup from '../signup/Signup';
import styles from './Signin.module.css';

const Signin = ({clickCloseSignIn}) => {

  const [isSignUpClicked, setIsSignUpClicked] = useState(false);

  const clickSignUpBtn = () => {
    setIsSignUpClicked(!isSignUpClicked); 
  };

    return(

<section className={styles.backdrop}>
      {isSignUpClicked ?
        <Signup isSignUpClicked={isSignUpClicked} 
          setIsSignUpClicked={setIsSignUpClicked}
          clickCloseSignIn={clickCloseSignIn}/>
      : null
      }
      <div className={styles.signin}>
        <div className={styles.titlebox}>
          <span className={styles.title}>sign in</span>
          <span className={styles.close} onClick={clickCloseSignIn}>
            <img src="../../../images/close.svg" className={styles.img}></img>
          </span>
        </div>
 {/* <form className={styles.form}> */}   
        <ul className={styles.list}>
           <li className={styles.item}>
                <input type="text" className={styles.text} placeholder="아이디를 입력하세요"/>
          </li>
          <li className={styles.item}>
                <input type="text" className={styles.text} placeholder="비밀번호를 입력하세요"/>
          </li>
          <li className={styles.item}>
            <button className={styles.button} >
              Sign in 
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} >
                Google
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.signup}  onClick={clickSignUpBtn} >
                Sign up
            </button>
          </li>
        </ul>
 {/* </form> */}     
      </div>
</section>




  
    );
}

export default Signin;