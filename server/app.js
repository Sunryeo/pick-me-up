const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
class App {
  constructor() {
    this.app = express();

    // 미들웨어 셋팅
    this.setMiddleWare();

    // 라우팅
    this.getRouting();

    // 404 페이지를 찾을수가 없음
    this.status404();

    // 에러처리
    this.errorHandler();
  }

  setMiddleWare() {
    // 미들웨어 셋팅
    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(
      cors({
        credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
        optionsSuccessStatus: 200,
      })
    ); // 응답 상태 200으로 설정}));
    this.app.use(cookieParser());
  }

  getRouting() {
    this.app.use(require("./controllers"));
  }

  status404() {
    this.app.use((req, res, _) => {
      res.status(404);
    });
  }

  errorHandler() {
    this.app.use((err, req, res, _) => {
      res.status(500);
    });
  }
}

module.exports = new App().app;
