const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const post = sequelize.define(
    "post",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      contents: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      imgInfo1: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      imgInfo2: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      option1: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      option2: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      option1_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      option2_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "post",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "userid",
          using: "BTREE",
          fields: [{ name: "userid" }],
        },
      ],
    }
  );

  post.associate = function (models) {
    post.hasMany(models.comments, { as: "comments", foreignKey: "feedId" });
    post.hasMany(models.voter, { as: "voters", foreignKey: "voting_id" });
    post.belongsTo(models.users, { as: "user", foreignKey: "userid" });
  };

  return post;
};
