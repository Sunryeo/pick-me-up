const { post: postModel } = require("../../models");

module.exports = {
  getAllPost: async (req, res) => {
    const result = postModel.findAll();
    const data = result.dataValues;
    req.status(200).json({ data, message: "ok" });
  },

};
