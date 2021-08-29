import styles from './Mycontent.module.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';





const Mycontent = ({handleContent}) => {
    const dummyData = [
      {userName: "구름이",
      title: "회사에 입고 다닐 데일리 니트 색깔 골라주세요🙏",
      option_1: "살구",
      option_2: "네이비",
      image_1: "https://image.thehyundai.com/static/4/8/3/37/A1/hnm40A1373847_01_0989040_003_003_1600.jpg",
      image_2: "https://image.thehyundai.com/static/4/8/3/37/A1/hnm40A1373849_01_0989040_012_001_1600.jpg",
      content: "봄이 다가오고 있어서 화사한 살구색으로 사고 싶은데... 제가 요즘에 급격히 살이 쩌서(ㅠㅠ😭)ㅋㅋㅋㅋ 뚱뚱해 보일까바 선뜻 지르기가 고민되네요... 안전하게 네이비 고를까요??? 참고로 저는 옷이 몇 개 없어서🥲 자주 입을만한 니트로 고르고 있습니다!",
      tags: [ "#의류", "#뷰티", "#리빙"],
      votes: "N",
      createdAt: "2021-08-27"},
      {userName: "구름이",
      title: "춘식이 무드등 어떤 게 더 귀엽나요!?👀",
      option_1: "냥냥펀치",
      option_2: "뚱춘식",
      image_1: "https://t1.kakaocdn.net/friends/prod/product/20210818173346267_8809814920335_BW_08.jpg",
      image_2: "https://imgc.1300k.com/aaaaaib/goods/215026/27/215026279751.jpg?10",
      content: "발바닥도 귀엽고 뚱춘식도 귀엽다 ㅠㅠ! ❤️",
      tags: [ "#잡화", "#리빙"],
      votes: "N",
      createdAt: "2021-08-27"}
    ];

    const [myFeeds, setMyFeeds] = useState(dummyData);  
    const [isPicked, setIsPicked] = useState(null);
    const [moreOpt, isMoreOpt] = useState(false);

    const handleOptions = (el) =>{  
      setIsPicked(el);
      isMoreOpt(!moreOpt);
    }

    const deleteHandle = () => {
      // 피드테이블에서 레코드 삭제하는 axios DELETE 요청(지영)
      // 삭제 후 feeds 상태가 자동으로 변화되어 myfeeds 상태값도 바로 변화되는지 확인해봐야 함.
      // 삭제 후 myContent 컴포넌트로 redirect 필요.
    }

    useEffect(() => {
      //myFeeds 불러오기 axios GET 요청(지영)
    }, []) // 빈배열을 빼고 myFeeds 상태값을 넣어야 할 수도 있음.

    return(
    <ul className={styles.feedList}>
      {myFeeds.map(el => {
        if(JSON.stringify(el) === JSON.stringify(isPicked) && moreOpt){ //상태 두 개로 관리 안 해도 될 것 같음. 피드 id로 찾아내면 됌. 추후 디벨롭 예정(지영)
          return <li className={styles.container}>
                  <div className={styles.feed}>
                    <div className={styles.img}>
                      <img className={styles.image} src={el.image_1} alt="option1"/>
                      <img className={styles.image} src={el.image_2} alt="option2"/>
                    </div>
                    <div className={styles.titleAndBtn}>
                      <span className={styles.title}>{el.title}</span>
                      <i className="fas fa-ellipsis-h" onClick={()=>handleOptions(el)}>
                        <ul className={styles.more}>
                          <Link to="/writing">
                            <li className={styles.moreOpt} onClick={()=>handleContent(el)}>수정</li>
                          </Link>
                            <li className={styles.moreOpt} onClick={deleteHandle}>삭제</li>
                        </ul>
                      </i>
                    </div>
                    <div className={styles.categories}>
                      {el.tags.map(el => <span className={styles.hashtag}>{el}</span>)}
                    </div>
                    <span className={styles.voteText}>{el.votes}명이 투표했어요</span>
                  </div> 
                </li>
        } else {
      return <li className={styles.container}>
              <div className={styles.feed}>
                <div className={styles.img}>
                  <img className={styles.image} src={el.image_1} alt="option1"/>
                  <img className={styles.image} src={el.image_2} alt="option2"/>
                </div>
                <div className={styles.titleAndBtn}>
                  <span className={styles.title}>{el.title}</span>
                  <i className="fas fa-ellipsis-h" onClick={()=>handleOptions(el)}></i>
                </div>
                <div className={styles.categories}>
                  {el.tags.map(el => <span className={styles.hashtag}>{el}</span>)}
                </div>
                <span className={styles.voteText}>{el.votes}명이 투표했어요</span>
              </div> 
            </li>
      }})}
    </ul>
    );
}

export default Mycontent;


//새로고침 했을때 myinfo로 자동이동하는부분 막기 