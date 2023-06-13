const { Op } = require("sequelize");
const db = require("../../models");
const { ErrorLogger } = require("../../utils/logger");
const Item = db.item;

module.exports.createItem = async (req, res, file) => {
  const { item_Name, item_Price, ingredients } = req.body;
  try {
    const result = await Item.create({
      item_Name: item_Name,
      ingredients: ingredients,
      item_Price: item_Price,
      item_Image: req.file.path,
    });
    res.status(200).send({
      status: "Success",
      message: "Successfully create item",
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
module.exports.getAllItems = async (req, res) => {
  try {
    
    const result = await Item.findAll();
    res.status(200).send({
      status: "Success",
      message: "Successfully got items",
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

module.exports.searchValue = async (req, res) => {
  try {
    const value = req.params.key;

    const result = await Item.findAll({
      where: {
        [Op.or]: [{ item_Name: value }, { item_Price: value }],
      },
    });

    const products = result.sort(function (a, b) {
      return a - b;
    });

    console.log(products);

    res.status(200).send({
      status: "Success",
      message: "Successfully got items",
      data: products,
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

module.exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Item.destroy({ where: { itemId: id } });
    res.status(200).send({
      status: "Success",
      message: "Successfully delete item",
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
