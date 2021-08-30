const express = require("express");
const { users } = require("../models");
const jwt = require("jsonwebtoken");
const { isAuthorized } = require("./tokenFunction");
require("dotenv").config();

module.exports = {
  // [POST] /user/profile/:id
  changeProfile: (req, res) => {
    const user_id = req.params.id;
    console.log("user_id", user_id);
    // const authorization = req.headers.cookie;
    // console.log(authorization);
    const { userName, mobile } = req.body;

    const accessTokendata = isAuthorized(req);
    console.log(accessTokendata);

    if (!accessTokendata) {
      res.status(401).json({ message: "invalid access token" });
    } else {
      // res.status(200).json({ message: "ok" });
      users
        .update(
          {
            nickname: userName,
            phone_number: mobile,
          },
          {
            where: {
              id: accessTokendata.id,
            },
          }
        )
        .then((userInfo) => {
          console.log("userInfo:", userInfo);
          if (!userInfo) {
            res.status(404).json({ message: "user not exists" });
          } else {
            // console.log("userInfo:", userInfo);
            res.status(200).json({ message: "profile changed" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};

