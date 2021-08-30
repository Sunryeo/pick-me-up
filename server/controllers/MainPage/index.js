const { vote, post: postModel } = require("../../models");

module.exports = {
  getAllPost: async (req, res) => {
    const postResult = await postModel.findAll({
      include: vote,
    });

    const postData = postResult.map((obj) => {
      return obj.dataValues;
    });

    console.log(postData);
  },
};
