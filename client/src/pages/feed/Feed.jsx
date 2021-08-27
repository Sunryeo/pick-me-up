import React, {useState} from 'react';
import Vote from '../../components/vote/Vote';
import VoteResult from '../../components/voteResult/VoteResult';
import styles from './Feed.module.css';
import LoadingIndecator from '../../components/LoadingIndicator';


const Feed = ({feed}) => {

  const [isVoted, setIsVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const vote = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsVoted(true);
    }, 1000);
    setIsLoading(false);
  }

  return (  
    <section className={styles.container}>
      <div className={styles.feed}>
        <div className={styles.categories}>
          {feed.tags.map(el => <span className={styles.hashtag}>{el}</span>)}
        </div>
        <div className={styles.title}>{feed.title}</div>
        <div className={styles.user}>
          <div>{feed.createdAt}</div>
          <div>by {feed.userName}</div>
        </div>
        <p className={styles.content}>{feed.content}</p>
        <div className={styles.voteText}>{feed.votes}명이 투표했어요</div>
        {isLoading ? <LoadingIndecator />
        : null} 
        {isVoted ? <VoteResult/> 
        : <Vote feed={feed} handleVote={vote}/>}
        </div> 
    </section>
)
};

export default Feed;