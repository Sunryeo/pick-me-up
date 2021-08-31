require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "30s" });
  },
  sendAccessToken: (res, accessToken) => {
    res
      .cookie("jwt", accessToken, {
        domain: "localhost:8080",
        httpOnly: true,
        sameSite: "lax",
      })
      .status(200)
      .json({ message: "ok" });
  },
  isAuthorized: (req) => {
    const authorization = req.headers.cookie; /*authorization; /*cookie*/
    if (!authorization) {
      return null;
    }
    const token = authorization.split(";")[0].split("=")[1]; //토큰 들어오는 것 보고 수정*/

    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
};
