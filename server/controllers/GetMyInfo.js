const { users } = require("../models");
const { isAuthorized } = require("../controllers/tokenFunction");

module.exports = {
  getMyInfo: (req, res) => {
    const accessTokendata = isAuthorized(req);
    const user_id = req.params.id;

    if (!accessTokendata) {
      res.status(401).send({ data: null, message: "invalid access token" });
    } else {
      users
        .findOne({
          where: {
            id: user_id,
          },
        })
        .then((data) => {
          if (!data) {
            return res
              .status(404)
              .send({ data: null, message: "user not exist" });
          } else {
            console.log("data:", data);
            return res
              .status(200)
              .send({ data: data.dataValues, message: "ok" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
