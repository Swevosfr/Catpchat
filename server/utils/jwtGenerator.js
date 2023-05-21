const jwt = require("jsonwebtoken");
require("dotenv").config(); // get acces to all variables env

function jwtUser(id_user) {
  const payload = {
    user: id_user,
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "24hr" });
}
module.exports = {
  jwtUser,
};
