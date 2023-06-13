module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define("order", {
    itemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // order_Item: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },

    order_Item: {
      type: DataTypes.INTEGER,
      get: function () {
        return JSON.parse(this.getDataValue("order_Item"));
      },
      set: function (val) {
        return this.setDataValue("order_Item", JSON.stringify(val));
      },
    },
    // total_Order_Price: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },

    total_Order_Price: {
      type: DataTypes.INTEGER,
      get: function () {
        return JSON.parse(this.getDataValue("total_Order_Price"));
      },
      set: function (val) {
        return this.setDataValue("total_Order_Price", JSON.stringify(val));
      },
    },

    order_Location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_Status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return order;
};
