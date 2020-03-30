require("dotenv").config();
const db = require("./../models");
const express = require("express");

const app = express();

const port = process.env.PORT || 3000;
app.get("", (req, res) => {
  res.send({ Hello: "There" });
});

app.listen(port, () => {
  console.log("server is listening on port " + port);
});
