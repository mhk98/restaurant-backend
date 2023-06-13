const db = require("../../models");
const { ErrorLogger } = require("../../utils/logger");
const Feedback = db.feedbacks;

module.exports.createFeedback = async (req, res) => {
  try {
    const result = await Feedback.create(req.body);
    console.log(req.body);
    res.status(200).send({
      status: "Success",
      message: "Successfully create feedback",
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
module.exports.getAllFeedback = async (req, res) => {
  try {
    const result = await Feedback.findAll();
    res.status(200).send({
      status: "Success",
      message: "Successfully create feedback",
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
