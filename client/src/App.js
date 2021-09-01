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
import Feed from "./pages/feed/Feed";
import ScrollButton from "./components/scrollButton/ScrollButton";
import axios from "axios";
import Update from "./pages/update/Update";
import MyinfoModify from "./pages/myinfoModify/MyinfoModify";
import NullPage from "./components/NullPage/Nullpage";
import LoadingIndicator from "./components/LoadingIndicator";

function App() {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
  const [info, setInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const isAuthenticated = (accessToken) => {
    setAccessToken(accessToken);
    axios
      .get(
        "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/user/auth",
        {
          headers: {
            authorization: accessToken,
          },
          "Content-Type": "application/json",
        }
      )
      .then((result) => {
        const { id, user_id, nickname, password, phone_number } =
          result.data.data.userInfo;
        setInfo({
          id: id,
          userid: user_id,
          nickname: nickname,
          mobile: phone_number,
          password: password,
          password2: "",
        });
      });
  };
  const storageToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (storageToken) {
      loginHandler();
      isAuthenticated(JSON.parse(storageToken));
    }
  }, [accessToken, info]);

  const handleResponseSuccess = (data) => {
    const { accessToken, message } = data;
    setAccessToken(accessToken);
    loginHandler();
    isAuthenticated(accessToken);
  };

  useEffect(() => {
    setListRender();
  });

  const [feeds, setFeeds] = useState([]); //전체 피드리스트
  const [selectedFeed, setSelectedFeed] = useState(null); //선택된 피드페이지(투표)로 이동할 때
  const [revised, setRevised] = useState(null); //writing 할 피드 선택된 것.
  const [listRender, setListRender] = useState(true);

  useEffect(() => {
    axios
      .get(
        "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/get-all-post"
      )
      .then((res) => {
        const result = res.data.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });

        setFeeds(
          result.map((el) => {
            return {
              ...el,
              tags: JSON.parse(el.tags),
            };
          })
        );
      });
  }, [listRender]); //글쓰기 버튼이 눌려질 때 마다 axiosGET요청 보내기.

  const select = (el) => {
    //썸네일 클릭 시
    setSelectedFeed(el);
  };

  const listFilter = (tag) => {
    if (tag === "전체") {
      axios
        .get(
          "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/get-all-post"
        )
        .then((res) => {
          let result = res.data.data.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });

          setFeeds(
            result.map((el) => {
              return {
                ...el,
                tags: JSON.parse(el.tags),
              };
            })
          );
        });
    } else {
      axios
        .get(
          "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/get-all-post"
        )
        .then((res) => {
          let result = res.data.data.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          }); //최신순으로 정렬
          result = result.map((el) => {
            return {
              ...el,
              tags: JSON.parse(el.tags),
            };
          }); //배열 파싱하고...
          result = result.filter((el) => el.tags.includes(tag));
          setFeeds(result);
        });
    }
  };

  const revise = (el) => {
    //update할 포스트 정보 상태에 끼워넣고 /update페이지로 보내주기.
    setRevised(el);
  };

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
      });
    setIsLogin(false);
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  return (
    <>
      {/* {
      isLoading ? <LoadingIndicator /> 
      : */}
      <body className={styles.body}>
        <Router>
          <Navbar
            setListRender={() => setListRender(!listRender)}
            handleResponseSuccess={handleResponseSuccess}
            onSignout={onSignout}
            isLogin={isLogin}
            info={info}
            isAuthenticated={isAuthenticated}
            setInfo={setInfo}
            accessToken={accessToken}
            setListRender={setListRender}
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
                  handleFeeds={select}
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
                  setListRender={() => setListRender(!listRender)}
                />
              </Route>
              <Route path="/update">
                <Update feed={revised} accessToken={accessToken} />
              </Route>
              {selectedFeed ? ( //피드 클릭했으면 여기서 feed페이지로 감!
                <Route path="/feed">
                  <Feed
                    feed={selectedFeed}
                    accessToken={accessToken}
                    isLogin={isLogin}
                  />
                </Route>
              ) : null}
              {/* <Route path="/feedresult">
                <FeedResult feed={selectedResult}/>
              </Route> */}
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

// const dummyData = [
//   {
//     id: 1,
//     userName: "구름이",
//     title: "회사에 입고 다닐 데일리 니트 색깔 골라주세요🙏",
//     option1: "살구",
//     option2: "네이비",
//     imgInfo1:
//       "https://image.thehyundai.com/static/4/8/3/37/A1/hnm40A1373847_01_0989040_003_003_1600.jpg",
//     imgInfo2:
//       "https://image.thehyundai.com/static/4/8/3/37/A1/hnm40A1373849_01_0989040_012_001_1600.jpg",
//     contents:
//       "봄이 다가오고 있어서 화사한 살구색으로 사고 싶은데... 제가 요즘에 급격히 살이 쪄서(ㅠㅠ😭)ㅋㅋㅋㅋ 뚱뚱해 보일까바 선뜻 지르기가 고민되네요... 안전하게 네이비 고를까요??? 참고로 저는 옷이 몇 개 없어용🥲 자주 입을만한 니트로 고르고 있습니다!",
//     tags: ["#의류", "#뷰티", "#리빙"],
//     votes: "N",
//     option1_count: 0,
//     option2_count: 0,
//     created_at: "2021-08-27",
//   },
//   {
//     id: 2,
//     userName: "구름이",
//     title: "춘식이 무드등 어떤 게 더 귀엽나요!?👀",
//     option1: "냥냥펀치",
//     option2: "뚱춘식",
//     imgInfo1:
//       "https://t1.kakaocdn.net/friends/prod/product/20210818173346267_8809814920335_BW_08.jpg",
//     imgInfo2:
//       "https://imgc.1300k.com/aaaaaib/goods/215026/27/215026279751.jpg?10",
//     contents: "발바닥도 귀엽고 뚱춘식도 귀엽다 ㅠㅠ! ❤️",
//     tags: ["#잡화", "#리빙"],
//     votes: "N",
//     option1_count: 0,
//     option2_count: 0,
//     created_at: "2021-08-27",
//   },
// ];
