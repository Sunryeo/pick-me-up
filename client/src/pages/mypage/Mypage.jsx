
import React, { useState } from 'react';
import Mycontent from '../../components/mycontent/Mycontent';
import Myinfo from '../../components/myinfo/Myinfo';
import styles from './Mypage.module.css';

const Mypage = ({info, setInfo, handleContent}) => {
// console.log(info)


  /* 카테고리이동 핸들러*/
  const [infoClicked, setInfoClicked] = useState(true) ;
  const handleClickMyinfo = () => {
      setInfoClicked(true); 
  }
  const handleClickMycontent = () => {
    setInfoClicked(false); 
  }
 
  const infounderline = (infoClicked ? styles.myinfosub : styles.myinfo );
  const contentunderline = (infoClicked ? styles.mycontent : styles.mycontentsub );

  return (
    <section className={styles.container}>

        <nav className={styles.category}>
          <div className={`${infounderline}`} onClick={handleClickMyinfo}>MY INFO</div>
          <div className={`${contentunderline}`} onClick={handleClickMycontent}>MY CONTENT</div>
        </nav>
        
        <div className={styles.body}>
          {infoClicked=== true ?
            <Myinfo info={info} setInfo={setInfo}/>
            : <Mycontent handleContent={handleContent}/>
          }
        </div>
        
    </section>

  );
};

export default Mypage;


