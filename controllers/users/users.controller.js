// const { createResponse } = require("../../utils/responseGenerator");
const db = require("../../models");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../utils/jwt_token");
const { ErrorLogger } = require("../../utils/logger");
const User = db.user;

// console.log(User)

exports.signup = async (req, res) => {
  try {
    // const users = req.body;
    // console.log(req.body);

    const userCheck = await User.findOne({
      where: { email: req.body.email },
    });

    if (userCheck) {
      return res.send("User exists");
    }

    const user = await User.create(req.body);

    res.status(200).send({
      status: "Success",
      message: "Successfully signed up",
      data: user,
    });
  } catch (error) {
    ErrorLogger.error(req.originalUrl + " " + error.message);

    res.status(500).json({
      status: "fail",
      message: "email or password is not curret",
      error: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // const users = req.body;
    console.log(req.body);
    const user = await User.findAll();
    // console.log('data save on database', user)
    res.status(200).send({
      status: "Success",
      message: "This is your all data",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "No data found",
      error: error.message,
    });
  }
};
exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    // const users = req.body;
    console.log(req.body);
    const user = await User.findOne({
      where: { User_ID: id },
    });

    if (!user) {
      return res.status(401).send({
        status: "fail",
        message: "No user found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "This is your information",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "User not found",
      error: error.message,
    });
  }
};

/**
 * 1. Check if Email and password are given
 * 2. Load user with email
 * 3. if not user send res
 * 4. compare password
 * 5. if password not correct send res
 * 6. check if user is active
 * 7. if not active send res
 * 8. generate token
 * 9. send user and token
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({
        status: "fail",
        message: "Please provide your credentials",
      });
    }

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "No user found. Please create an account first",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    // const isPasswordValid = user.compareSync(pass_word, user.pass_word);
    // console.log(user.pass_word, pass_word)
    console.log("isPasswordValid", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "Password or email is not correct",
      });
    }

    // if (user.status != "active") {
    //   return res.status(401).json({
    //     status: "fail",
    //     error: "Your account is not active yet",
    //   });
    // }

    const token = generateToken(user);
    // const { pass_word: pwd, ...others } = user.toObject();
    res.status(200).json({
      status: "Success",
      message: "Successfully logged in",
      data: {
        // user: others,
        user,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "email or password is not curret",
      error: error.message,
    });
  }
};
