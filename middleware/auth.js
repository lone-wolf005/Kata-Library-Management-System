
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");

config();

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token Missing",
      });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
    //   add date in request in order to find userdata
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
};