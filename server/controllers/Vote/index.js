const { voter: voterModel, vote: voteModel } = require("../../models");
module.exports = {
  isVote: async (req, res) => {
    const { postId, userId } = req.query;

    const voteModelResult = await voteModel.findOne({
      where: {
        post_id: postId,
      },
    });
    if (!voteModelResult) {
      return res.status(403).json({ message: "post does not exist." });
    }
    const votingId = voteModelResult.dataValues.id;
    const result = await voterModel.findOne({
      where: {
        voting_id: votingId,
        user_id: userId,
      },
    });

    if (!result) {
      return res
        .status(200)
        .json({ message: "user did not vote", isVote: true });
    } else {
      return res.status(202).json({ message: "voted user", isVote: false });
    }
  },
};
