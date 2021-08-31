import React, {useState} from 'react';
import VoteResult from '../../components/voteResult/VoteResult';
import styles from './FeedResult.module.css';


const FeedResult = ({feed}) => {

  return (  
      <section className={styles.container}>
        <div className={styles.feed}>
          <div className={styles.categories}>
            {feed.tags.map(el => <span className={styles.hashtag}>{el}</span>)}
          </div>
          <div className={styles.title}>{feed.title}</div>
          <div className={styles.user}>
            <div>{feed.created_at}</div>
            <div>by 유저닉네임</div>
          </div>
          <p className={styles.content}>{feed.contents}</p>
          <div className={styles.voteText}>N명이 투표했어요</div>
          {
            <VoteResult feed={feed} 
            // isVoted={isVoted} 
            // setIsVoted={setIsVoted}
            />
          }
          </div> 
      </section>
)
}

export default FeedResult;