const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const Family = require("./models/Family.js");

const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const secret = bcrypt.genSaltSync(10);
const jwtSecret = "fafafa";
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.get("/manage/:id", (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(await Family.findById(id));
  });
});

app.post("/create", async (req, res) => {
  const { token } = req.cookies;
  const { name, restrictions, description, members } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
    try {
      const famDoc = await Family.create({
        owner: user.id,
        name: name,
        restrictions: restrictions,
        description: description,
        members: members,
      });
      res.json(famDoc);
    } catch (errs) {
      console.log("asdds");
      console.log(errs);
    }
  });
});

app.get("/data", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      try {
        const fam = await Family.find({
          owner: user.id,
        });
        let dataArr = [];

        for (const index in fam) {
          dataArr.push(fam[index]);
        }
        console.log(dataArr);
        res.json(dataArr);
      } catch (errs) {
        res.json("no family found");
      }
    });
  } else {
    console.log("sasd");
    res.json(null);
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, secret),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { username: userDoc.username, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.status(422).json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(user.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.listen(4000);
