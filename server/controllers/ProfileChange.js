const e = require("express");
const { users } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  // [PATCH] /user/profile/:id
  changeProfile: async (req, res) => {
    const { userName, mobile } = req.body;
    const Authentication = req.headers.Authentication;

    if (!Authentication) {
      res.status(401).send({ data: null, message: "invalid access token" });
    } else {
      const token = Authentication.split(" ")[1];
      const data = jwt.verify(token, process.env.ACCESS_SECRET);
      if (!data) {
        res.status(401).send({ data: null, message: "invalid access token" });
      } else {
        // optional한 parameter update 방법 알아보기
        const updatedData = users.update(
          {
            nickname: userName,
            phone_number: mobile,
          },
          {
            where: { id: req.params.id },
          }
        );
        if (!updatedData) {
          return res
            .status(404)
            .send({ data: null, message: "user not exists" });
        } else {
          const data = updatedData.dataValues;
          return res
            .status(200)
            .send({ data: data, message: "profile changed" });
        }
      }
    }
    // users.update({
    //     nickname: userName,
    //     phone_number: mobile
    // },
    // {
    //     where: { id: req.params.id }
    // })
    // .then(result => {
    //     if(!result) {
    //         return res.status(404).send({ "data": null, "message": "user not exists" });
    //     } else {
    //         const data = result.dataValues;
    //         return res.status(200).send({ "data": data, "message": "profile changed" });
    //     }
    // })
    // .catch(err => {
    //     console.log(err);
    // })
  },
};

const a = "1";
