require("dotenv").config();
const express = require("express");
const app = express();
const port = 8089;
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(express.json());
app.use(cors());
app.use(express.static("../uploads"));
app.use(express.static("./uploads"));

//routes
app.use("/auth", require("./routes/jwtAuth"));
app.use("/captcha", require("./routes/captcha"));
//server running

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
