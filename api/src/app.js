require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./../models");
const User = db.user;

const passport = require("passport");
const passportStrategy = require("./../config/passport");

const app = express();

app.use(express.json());
passport.use(passportStrategy);
app.use(passport.initialize());

const port = process.env.PORT || 3000;

app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ["id", "firstName", "lastName", "email"]
      });
      res.json(users);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }
);
app.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user) {
      console.log(req.user);
      res.status(200).send({ user: req.user });
    } else {
      res.status(404).send({ error: "No req.user found" });
    }
  }
);

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({
      where: {
        email: email
      }
    });
    if (!user) {
      const error = new Error("Invalid email");
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        sub: user.id
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: token, sub: user.id });
  } catch (e) {
    res.status(400).json({ error: e.message });
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
    res.status(500).send({ error: e.message });
  }
});

app.get("", (req, res) => {
  res.send({ Default: "This is the default route" });
});
app.listen(port, () => {
  console.log("server is listening on port " + port);
});
