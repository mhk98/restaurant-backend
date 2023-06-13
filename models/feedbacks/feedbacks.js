module.exports = (sequelize, DataTypes) => {
  const feedback = sequelize.define("feedback", {
    feedbackId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feedback: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ratings: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return feedback;
};
