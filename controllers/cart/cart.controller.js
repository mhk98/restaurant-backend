const db = require("../../models");
const { ErrorLogger } = require("../../utils/logger");
const Cart = db.cart;

module.exports.createCart = async (req, res) => {
  try {
    console.log(req.body);
    const result = await Cart.bulkCreate(req.body);
    res.status(200).send({
      status: "Success",
      message: "Successfully create cart",
      data: result,
    });
  } catch (error) {
    ErrorLogger.error(req.originalUrl + " " + error.message);

    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.getAllCarts = async (req, res) => {
  try {
    const result = await Cart.findAll();
    res.status(200).send({
      status: "Success",
      message: "Successfully got carts",
      data: result,
    });
  } catch (error) {
    ErrorLogger.error(req.originalUrl + " " + error.message);

    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
module.exports.deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Cart.destroy({ where: { cartId: id } });
    res.status(200).send({
      status: "Success",
      message: "Successfully delete product",
      data: result,
    });
  } catch (error) {
    ErrorLogger.error(req.originalUrl + " " + error.message);

    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
