const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const Family = require("./models/Family.js");
const Member = require("./models/Member.js");
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

app.post("/manage/:id", async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  const { members, removed } = req.body;
  // console.log(members);
  const famDoc = await Family.findById(id);
  let restrRemove = "";
  for (let i = 0; i < members.length; i++) {
    if (members[i].member === removed) {
      restrRemove += members[i].restrictions;
      members.splice(i, 1);
    }
  }
  let newRestr = famDoc.restrictions;
  for (let i = 0; i < newRestr.length; i++) {
    if (newRestr[i] === restrRemove) {
      newRestr.splice(i, 1);
    }
  }
  // console.log(newRestr);
  let a = famDoc.owner;
  let b = famDoc.name;
  let c = famDoc.description;
  let membersObj = {};
  for (let i = 0; i < members.length; i++) {
    membersObj[members[i].member] = members[i].restrictions;
  }

  famDoc.set({
    owner: a,
    name: b,
    description: c,
    members: membersObj,
    restrictions: newRestr,
  });
  await famDoc.save();
  res.json();
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

app.delete("/manage/:id", (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(await Family.deleteOne({ _id: id }));
  });
});

app.get("/recent", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      try {
        const membersFound = await Member.find({});
        res.json(membersFound);
      } catch (errs) {
        console.log(errs);
      }
    });
  } else {
    res.status(401).json("no token provided");
  }
});

app.put("/manage/:id", async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  const { member, restrictionsPut } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) {
      res.json(err);
      return;
    }
    console.log("sd");
    await Member.create({
      username: member,
      restrictions: restrictionsPut,
    });
    const famDoc = await Family.findById(id);
    let restrictions = famDoc.restrictions;

    for (let i = 0; i < restrictionsPut.length; i++) {
      restrictions.push(restrictionsPut[i]);
    }
    // famDoc.members[member] = restrictionsPut;
    famDoc.members.set(member, restrictionsPut);
    let a = famDoc.owner;
    let b = famDoc.name;
    let c = famDoc.description;
    let e = famDoc.members;
    famDoc.set({
      owner: a,
      name: b,
      description: c,
      restrictions,
      members: e,
    });
    await famDoc.save();
    res.json(famDoc.members);
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
        res.json(dataArr);
      } catch (errs) {
        res.json("no family found");
      }
    });
  } else {
    res.json("no token provided");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const { username, _id } = await User.findById(user.id);

      res.status(200).json({ username, _id });
    });
  } else {
    res.json("no token provided");
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

app.post("/addgroup", (req, res) => {
  const { token } = req.cookies;
  const { name, description } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
    try {
      const famDoc = await Family.create({
        owner: user.id,
        name: name,
        restrictions: [],
        description: description,
        members: {},
      });
      res.json(famDoc);
    } catch (errs) {
      console.log(errs);
    }
  });
});

app.listen(4000);
