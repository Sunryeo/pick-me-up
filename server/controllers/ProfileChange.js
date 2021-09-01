const { users } = require("../models");
const { isAuthorized } = require("./tokenFunction");
const { generateAccessToken } = require("./tokenFunction");

module.exports = {
  // [POST] /user/profile/:id
  changeProfile: (req, res) => {
    const user_id = req.params.id;
    console.log("user_id", user_id);

    const { userName, mobile, password } = req.body;

    const accessTokendata = isAuthorized(req);
    console.log(accessTokendata);

    if (!accessTokendata) {
      res.status(401).json({ message: "invalid access token" });
    } else {
      // res.status(200).json({ message: "ok" });
      // password 변경 시
      if (password.length !== 0) {
        const newPasswordToken = generateAccessToken(password);
        users
          .update(
            {
              nickname: userName,
              phone_number: mobile,
              password: newPasswordToken,
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
              delete userInfo.dataValues.password;
              const newAccessToken = generateAccessToken(userInfo);
              res
                .status(200)
                .json({ data: newAccessToken, message: "profile changed" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // password 변경 없을 시
      else {
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
              delete userInfo.dataValues.password;
              const newAccessToken = generateAccessToken(userInfo);
              res
                .status(200)
                .json({ data: newAccessToken, message: "profile changed" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  },
};
