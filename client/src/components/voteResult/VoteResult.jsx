import React from 'react';
import RealVote from '../modals/RealVote';
import Vote from '../vote/Vote';
import styles from './VoteResult.module.css';
import Feed from '../../pages/feed/Feed';

const VoteResult = ({feed, isVoted,setIsVoted}) => {
console.log(isVoted)

  const voteDate = {
    per1 : {
      percent:30,
      option_1:"살구"
    },
    per2 : {
      percent:70,
      option_1:"네이비"
    }
  }

  const clickBack = () => {
    setIsVoted(true)
  }

  return  (
    <>
    {isVoted ?
      <Feed feed={feed}/>
      :
    (
      <section className={styles.container}>
      <div className={styles.goback} >
       
        <img src="../../../images/back.svg" className={styles.back} onClick={clickBack}></img>
        <span className={styles.bigtitle}>투표결과</span>
      </div>

      <div className={styles.images}>
        <img className={styles.image} src="../../../images/face.svg" alt="option1" />
      
        <img className={styles.image} src="../../../images/face.svg" alt="option1" />
      </div>

      <div className={styles.graph}>
        <span className={styles.imgbox}>
          <label className={styles.percent} >{voteDate.per1.percent}%</label>
          <label className={styles.img1} style={{width: `${voteDate.per1.percent}%`}}></label>
        </span>
        <span className={styles.title}>살구</span>
        <span className={styles.imgbox}>
          <label className={styles.percent}>{voteDate.per2.percent}%</label>
          <label className={styles.img2}   style={{width: `${voteDate.per2.percent}%`}}></label>
        </span>
        <span className={styles.title}>네이비</span>
      </div>
     
     
    </section>
    )
    }
    
    </>
  );
}
export default VoteResult;