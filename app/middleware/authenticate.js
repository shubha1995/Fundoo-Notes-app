const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { logger } = require("../../logger/logger");
require("dotenv").config();

class Helper {
  hashing = (password, callback) => {
    bcrypt.hash(password, 10, (err, hashpassword) => {
      if (err) {
        logger.error("error is hashing");
        return callback(err, null);
      } else {
        return callback(null, hashpassword);
      }
    });
  };

  jwtTokenGenerate = (data) => {
    const dataForToken = {
      email: data.email,
      id: data.id
    };
    return jwt.sign(dataForToken, process.env.TOKEN_KEY, { expiresIn: "2H" });
  };

  decodeToken = (token, callback) => {
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    if (decode) {
      return callback(null, decode);
    } else {
      // eslint-disable-next-line node/no-callback-literal
      return callback("Cannot Decode token", null);
    }
  };

  verifyToken = (req, res, next) => {
    try {
      const header = req.headers.authorization;
      const myArr = header.split(" ");
      const token = myArr[1];
      this.decodeToken(token, (error, decode) => {
        if (decode) {
          logger.info("token verified");
          next();
        } else {
          logger.info("token verify error" + error);
        }
      });
    } catch (error) {
      res.status(401).send({
        error: "Your token has expiered"
      });
    }
  };
}
module.exports = new Helper();
