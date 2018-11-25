const express = require("express");
const bodyParser = require("body-parser");
const { User } = require("./models/User");
var router = require("./routes/index");
const app = express();

app.use(bodyParser.json());
app.use("/", router);

app.listen(3000, () => {
  console.log("Server is up and running ");
});
