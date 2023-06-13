module.exports = (sequelize, DataTypes) => {
  const item = sequelize.define("item", {
    itemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    item_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    item_Price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item_Image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return item;
};
