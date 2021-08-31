import React, {useState} from 'react';
import Vote from '../../components/vote/Vote';
import VoteResult from '../../components/voteResult/VoteResult';
import styles from './Feed.module.css';
import RealVote from '../../components/modals/RealVote';
import axios from 'axios';


const Feed = ({feed, accessToken, isLogin}) => {

  const [isVoted, setIsVoted] = useState(false); //vote하시겠습니까 모달창 띄울지 말지 
  const [isVoteReal, setIsVoteReal] = useState(false);
  const [clickedOpt, setClickedOpt] = useState(null); //feed.option1(or feed.option2)


  const vote =(el) => {

    if(!isLogin){
      alert('로그인 해주세요:)')
    }
    //진짜로 투표하시겠습니까?에 '네'로 답했기 때문에 

    //투표한 사람인지 아닌지 확인하는 axios 요청.
    // axios.post(`http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/vote/isVote?postId=${feed.id}?`, { 
    //   headers: {
    //     authorization: accessToken,
    //   },
    //   "Content-Type": "application/json",
    // })
    // .then(result => {
    //   if(result){
    //     //투표 이미 한 사람
    //     //그냥 결과페이지 보여주기
    //   } else{
    //     //투표 안 한 사람
    //     //투표하기 요청 보내기
    //     if(clickedOpt === el.option1){
    //       //axios요청. postId, userId, option 
    //       //postId = FeedVoted.id
    //       axios.post('http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/vote', {
    //         postId: feed.id,
    //         option: 1 
    //       }, { 
    //         headers: {
    //           authorization: accessToken,
    //         },
    //         "Content-Type": "application/json",
    //       })
    //       .then(res => {
    //         setIsVoteReal(true); // 투표한 상태로 바꿔서 result 페이지 보여주기
    //       })

    //     } else if(clickedOpt === el.option2){
    //       axios.post('http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/vote', {
    //         postId: feed.id,
    //         option: 2
    //       }, { 
    //         headers: {
    //           authorization: accessToken,
    //         },
    //         "Content-Type": "application/json",
    //       })
    //       .then(res => {
    //         setIsVoteReal(true); // 투표한 상태로 바꿔서 result 페이지 보여주기
    //       })

    //     }
    //   }
    // })
    setIsVoteReal(true);
  }
  const clickOpt = (el) => {
  
    setIsVoted(true); //모달창 나오게 함.
    setClickedOpt(el); //feed.option1(or feed.option2) or null이 저장됨.
  }

  const goResult = ()=> { //모달창 닫기
    setIsVoted(false);  //isVoted를 false로 바꾸기 -> 모달창 없는 vote컴포넌트 나오기
  }

  const clickOptReset = () => {
    setClickedOpt(null);
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
            <div>{feed.created_at}</div>
            <div>by 유저닉네임</div>
          </div>
          <p className={styles.content}>{feed.contents}</p>
          <div className={styles.voteText}>N명이 투표했어요</div>
          {
            isVoted ?
            (<>
            <RealVote feed={feed} handleFeedVote={vote} handleVote={goResult} clickOptReset={clickOptReset}/>
            <Vote feed={feed} handleOpt={clickOpt} isVoted={isVoted}/>
            </>)
            : //아래 vote 항목 나열된 페이지
            <Vote feed={feed} handleOpt={clickOpt}/>
          }
          </div> 
      </section>)
    }
</>
  )
};

export default Feed;