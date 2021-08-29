const { users, post } = require("../../models");

module.exports = {
  getAllPost: async (req, res) => {
    const result = await post.findAll();
    const data = result.map((obj) => {
      return obj.dataValues;
    });
    console.log(data);
  },
};
