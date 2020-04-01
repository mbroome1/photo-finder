require("dotenv").config();
const db = require("./../models");
const User = db.user;
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// application/x-www-form-urlencoded post data
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.get("", (req, res) => {
  res.send({ Hello: "Theres" });
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstName", "lastName", "email"]
    });
    res.json(users);
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

app.patch("/user/:id", async (req, res) => {
  const id = req.params.id;
  const first = req.body.firstName;
  if (!first || !id || isNaN(id)) {
    throw new Error("Invalid details");
  }
  try {
    const user = await User.findByPk(2);
    user.firstName = first;
    user.save();
    await res.json(user);
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

app.listen(port, () => {
  console.log("server is listening on port " + port);
});
