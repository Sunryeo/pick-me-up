import styles from "./App.module.css";
import React, { useState, useEffect } from "react";
import Navbar from "./pages/navbar/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Footer from "./pages/footer/Footer";
import MainFeeds from "./pages/mainFeeds/MainFeeds";
import Mypage from "./pages/mypage/Mypage";
import Writing from "./pages/writing/Writing";
import Login from "./components/signin/Signin";
import Signup from "./components/signup/Signup";
import Feed from "./pages/feed/Feed";
import Signin from "./components/signin/Signin";
import VoteResult from "./components/voteResult/VoteResult";
import ScrollButton from "./components/scrollButton/ScrollButton";
import axios from "axios";

import Update from "./pages/update/Update";
import MyinfoModify from "./pages/myinfoModify/MyinfoModify";

import LoadingIndicator from "./components/LoadingIndicator";

function App() {
  const dummyData = [
    {
      userName: "구름이",
      title: "회사에 입고 다닐 데일리 니트 색깔 골라주세요🙏",
      option1: "살구",
      option2: "네이비",
      imgInfo1:
        "https://image.thehyundai.com/static/4/8/3/37/A1/hnm40A1373847_01_0989040_003_003_1600.jpg",
      imgInfo2:
        "https://image.thehyundai.com/static/4/8/3/37/A1/hnm40A1373849_01_0989040_012_001_1600.jpg",
      contents:
        "봄이 다가오고 있어서 화사한 살구색으로 사고 싶은데... 제가 요즘에 급격히 살이 쪄서(ㅠㅠ😭)ㅋㅋㅋㅋ 뚱뚱해 보일까바 선뜻 지르기가 고민되네요... 안전하게 네이비 고를까요??? 참고로 저는 옷이 몇 개 없어용🥲 자주 입을만한 니트로 고르고 있습니다!",
      tags: ["#의류", "#뷰티", "#리빙"],
      votes: "N",
      created_at: "2021-08-27",
    },
    {
      userName: "구름이",
      title: "춘식이 무드등 어떤 게 더 귀엽나요!?👀",
      option1: "냥냥펀치",
      option2: "뚱춘식",
      imgInfo1:
        "https://t1.kakaocdn.net/friends/prod/product/20210818173346267_8809814920335_BW_08.jpg",
      imgInfo2:
        "https://imgc.1300k.com/aaaaaib/goods/215026/27/215026279751.jpg?10",
      contents: "발바닥도 귀엽고 뚱춘식도 귀엽다 ㅠㅠ! ❤️",
      tags: ["#잡화", "#리빙"],
      votes: "N",
      created_at: "2021-08-27",
    },
  ];

  const history = useHistory();
  //로그인상태
  const [isLogin, setIsLogin] = useState(false);
  const [info, setInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  //로그인인증 & 유저데이터 Get으로 불러오기(mypage) 정보 잘 받아왔으면 인포에 정보를 넣어준다.
  const isAuthenticated = () => {
    // axios
    //   .get(
    //     "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/user/:id",
    //     {
    //       headers: {
    //         authorization: `Bearer ${accessToken}`,
    //       },
    //       "Content-Type": "application/json",
    //     }
    //   )
    //   .then((result) => {
    //     //console.log(result.data.userinfo)
    //     setInfo({
    //       //인포상태 변화 //받아온 데이터로 넣어주기
    //       userid: "abc1234",
    //       nickname: "춘식",
    //       mobile: "010-0000-0000",
    //       password: "",
    //       password2: "",
    //     });
    //   });
    setInfo({
      //인포상태 변화 //받아온 데이터로 넣어주기
      userid: "abc1234",
      nickname: "춘식",
      mobile: "010-0000-0000",
      password: "",
      password2: "",
    });
  };
  console.log(isLogin);
  //로그인 성공시 리스폰스

  const handleResponseSuccess = (data) => {
    const { accessToken, message } = data;
    setAccessToken(accessToken); //액세스토큰 넣기
    loginHandler(); //로그인 true
    window.localStorage.setItem("accessToken", accessToken);
  };

  /**********************페이지 컨트롤 부분***************************/

  const [feeds, setFeeds] = useState(dummyData); //전체 피드리스트
  const [selectedFeed, setSelectedFeed] = useState(null); //선택된 피드페이지로 이동할 때
  const [revised, setRevised] = useState(null); //writing 할 피드 선택된 것.

  const select = (el) => {
    //해당 피드로 이동...
    setSelectedFeed(el);
  };
  const listFilter = (tag) => {
    // 필터기능 구현 수정 필요... 서버에 요청 보내야 할 듯
    // feeds에서 전체 리스트 GET받고(필터링을 서버에서 하는 게 아님), 
    // 아래 조건문에 따라 필터링 시키기.
    // if(tag === '전체'){
    //   //setFeeds(feeds);
    // }else{
    //   setFeeds(feeds.filter(el => el.tags.includes(tag)));
    // }
  };

  const revise = (el) => { //update할 포스트 정보 상태에 끼워넣고 /update페이지로 보내주기.
    setRevised(el);
  };

  const createFeeds = (el) => {
    setFeeds([el, ...feeds]); //최신 피드니까 상단에 뜨게끔 0번째 인덱스로 추가됨.
  };

  useEffect(() => {
    //feeds 불러오기 axios GET 요청(지영)

    //최신순으로 불러와야 하니까 받은 data에서 createdAt이 최신인 순으로 정렬해서 feeds
    // axios.get('http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/get-all-post',
    // { withCredentials: true })
    // .then(res => {
    //   console.log(res)
    // })
  }, []);

    //최신순으로 불러와야 하니까 받은 data에서 createdAt이 최신인 순으로 정렬해서 feeds 
    
    // axios.get('http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/get-all-post')
    // .then(res => {
    //   const result = res.data.data;
    //   result.sort((a,b)=>{
    //     return new Date(b.created_at) - new Date(a.created_at);
    //   });
    //   setFeeds(result);
    // })
    console.log('hi')
  }, [])




  /**********************sign in 컨트롤 부분***************************/

  //로그인상태 변경 메소드
  const loginHandler = () => {
    setIsLogin(true);
  };
  //사인아웃클릭시
  const onSignout = () => {
    axios
      .post(
        "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/sign-out"
      )
      .then((result) => {
        //비워진 엑세스 토큰을 받아서
        setIsLogin(false);
        setInfo(null);
        setAccessToken(result.data.accessToken);
        browserHistory.push("/");
        // history.push("/");
        //첫화면으로 랜더시키기 !
      });
    setIsLogin(false);
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  useEffect(() => {
    if (window.localStorage.getItem("accessToken")) {
      loginHandler();
      setAccessToken(window.localStorage.getItem("accessToken"));
    }
    
  }, [accessToken]);

  return (
    <>
      {/* {
      isLoading ? <LoadingIndicator /> 
      : */}
      <body className={styles.body}>
        <Router>
          <Navbar
            filterHandle={listFilter}
            handleResponseSuccess={handleResponseSuccess}
            onSignout={onSignout}
            isLogin={isLogin}
            info={info}
            isAuthenticated={isAuthenticated}
          />

          <div id="page">
            <Switch>
              <Route exact={true} path="/">
                <MainFeeds
                  feeds={feeds}
                  filterHandle={listFilter}
                  handleClick={select}
                />
              </Route>
              <Route path="/mypage">
                <Mypage
                  handleContent={revise}
                  info={info}
                  setInfo={setInfo}
                  accessToken={accessToken}
                  isLogin={isLogin}
                />
              </Route>
              <Route path="/modifyinfo">
                <MyinfoModify
                  info={info}
                  setInfo={setInfo}
                  accessToken={accessToken}
                  isLogin={isLogin}
                />
                {/* <Mypage handleContent={revise} info={info} setInfo={setInfo} /> */}
              </Route>
              <Route path="/writing">
                <Writing
                  accessToken={accessToken}
                  isLogin={isLogin}
                />
              </Route>
              <Route path="/update">
                <Update feed={revised} />
              </Route>
              {selectedFeed ? ( //피드 클릭했으면 여기서 feed페이지로 감!
                <Route path="/feed">
                  <Feed feed={selectedFeed} />
                </Route>
              ) : null}
              {/* 이부분 투표창에서 새로고침시 페이지 사라지는거 막아야함 */}
            </Switch>
          </div>
          <Footer></Footer>
          <ScrollButton />
        </Router>
      </body>
      {/* } */}
    </>
  );
}

export default App;
export const browserHistory = createBrowserHistory();
