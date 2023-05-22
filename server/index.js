require("dotenv").config();
const express = require("express");
const app = express();
const port = 8089;
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/auth", require("./routes/jwtAuth"));
app.use("/user", require("./routes/user"));

//server running

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
