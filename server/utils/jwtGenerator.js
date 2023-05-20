const jwt = require("jsonwebtoken");
require("dotenv").config(); // get acces to all variables env

function jwtGenerator(id) {
  const payload = {
    user: id,
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "24hr" });
}
module.exports = {
  jwtGenerator,
};
