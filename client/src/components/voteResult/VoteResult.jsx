import React from 'react';
import styles from './VoteResult.module.css';
import Feed from '../../pages/feed/Feed';


const VoteResult = ({feed, isVoted,setIsVoted}) => {

  const voteDate = {
    per1 : {
      percent: Math.round((feed.option1_count/(feed.option1_count+feed.option2_count))*100)
    },
    per2 : {
      percent: Math.round((feed.option2_count/(feed.option1_count+feed.option2_count))*100)
    }
  }

  const clickBack = () => {
    setIsVoted(true)
  }

  return  (
    <>
    {isVoted ? //다시 피드로 돌아감. 
      <Feed feed={feed}/>
      :
    (
      <section className={styles.container}>
      <div className={styles.goback} >
       
        <img src="../../../images/back.svg" className={styles.back} onClick={clickBack}></img>
        <span className={styles.bigtitle}>투표결과</span>
      </div>

      <div className={styles.images}>
        <img className={styles.image} src={feed.imgInfo1} alt="option1" />
      
        <img className={styles.image} src={feed.imgInfo2} alt="option2" />
      </div>

      <div className={styles.graph}>
        <span className={styles.imgbox}>
          <label className={styles.percent} >{voteDate.per1.percent}%</label>
          <label className={styles.img1} style={{width: `${voteDate.per1.percent}%`}}></label>
        </span>
        <span className={styles.title}>{feed.option1}</span>
        <span className={styles.imgbox}>
          <label className={styles.percent}>{voteDate.per2.percent}%</label>
          <label className={styles.img2}   style={{width: `${voteDate.per2.percent}%`}}></label>
        </span>
        <span className={styles.title}>{feed.option2}</span>
      </div>
     
     
    </section>
    )}
    </>
  );
}
export default VoteResult;