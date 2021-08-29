import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Signin from '../../components/signin/Signin';
import styles from './Navbar.module.css';



const Navbar = ({handleResponseSuccess, onSignout, isLogin , info, resetRevised, filterHandle}) => {

  //props로 isSignIn받고 true일경우 login/ false일경우 logout버튼


  const [isSigninClicked, setIsSigninClicked] = useState(false); 

  const clickSigninBtn = () => {
    setIsSigninClicked(true); 
  };
  const clickCloseBtn = () => {
    setIsSigninClicked(false); 
  }

  const reset = () =>{
    resetRevised();
    filterHandle();
  }


  return (
      <header className={styles.header}>
        {/* 가입하기 모달창 */}
        {isSigninClicked  ?<Signin clickCloseBtn={clickCloseBtn} handleResponseSuccess={handleResponseSuccess}/> : null}

        <div className={styles.contentbox}>
        <Link to="/" className={styles.underline} >
          <div className={styles.title} onClick={reset}>Pick me up</div>
        </Link>
        <div className={styles.btns}>
       

        {isLogin ? 
          (<button className={styles.signbtn} onClick={onSignout}>
            Logout
          </button>)
      :
        (<button className={styles.signbtn} onClick={clickSigninBtn}>
              Sign in
          </button>)
          
        }

        <Link to="/mypage">
        <button className={styles.mypagebtn}  >
            My page
          </button>
        </Link>
        </div>
      </div>

    </header>
  );
};

export default Navbar;
