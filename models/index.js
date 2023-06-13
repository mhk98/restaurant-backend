// import connection of sequelizeconsole
// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require("../db/db");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require("sequelize");

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connection re-synced");
  })
  .catch((err) => {
    console.log("Error on re-synced", err);
  });

// eslint-disable-next-line @typescript-eslint/no-var-requires
db.user = require("../models/users/user")(db.sequelize, DataTypes);
db.item = require("../models/items/items")(db.sequelize, DataTypes);
db.orders = require("../models/orders/orders")(db.sequelize, DataTypes);
db.feedbacks = require("../models/feedbacks/feedbacks")(
  db.sequelize,
  DataTypes
);
db.cart = require("../models/cart/cart")(db.sequelize, DataTypes);

module.exports = db;
