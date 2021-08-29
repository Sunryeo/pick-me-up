import React, {useState} from 'react';
import Vote from '../../components/vote/Vote';
import VoteResult from '../../components/voteResult/VoteResult';
import styles from './Feed.module.css';
import RealVote from '../../components/realVote/RealVote';


const Feed = ({feed}) => {

  const [isVoted, setIsVoted] = useState(false);


  const [isVoteReal, setIsVoteReal] = useState(false);




  const [isLoading, setIsLoading] = useState(false);

  const vote = () => {
    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsVoted(true);
    // }, 1000);
    // setIsLoading(false);
    setIsVoted(true);
  }


  const goResult = ()=> {  //네 클릭시
    setIsVoted(false);  //isVoted를 false로 바꾸기 -> 모달창 없는 vote컴포넌트 나오기
  }

 

  return (  
    <>
    {
      isVoteReal
      ? 
       <VoteResult feed={feed} isVoted={isVoted} setIsVoted={setIsVoted}/>
      :
      (<section className={styles.container}>
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
          {
            isVoted ?
            (<>
            <RealVote  handleVote={goResult}  setIsVoteReal={setIsVoteReal}/>
            <Vote feed={feed} handleVote={vote} isVoted={isVoted}/>
            </>)
            :
            <Vote feed={feed} handleVote={vote} isVoted={isVoted}/>
          }
          </div> 
      </section>)
    }
</>
)
};

export default Feed;