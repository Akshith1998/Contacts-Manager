const express = require("express");
const router = express.Router();
const UserModal = require("../Modals/UserModal");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ExistingUser, generatepasswordhash } = require("../Utility");
const ContactsModal = require("../Modals/ContactsModal");

router.post("/login", (req, res) => {
  UserModal.find({ email: req.body.email }).then((userdata) => {
    if (userdata.length) {
      bcrypt.compare(req.body.password, userdata[0].password).then((val) => {
        if (val) {
          const authToken = jwt.sign(
            { email: userdata[0].email },
            process.env.SECRET_KEY
          );
          res.status(200).send({
            token: authToken,
          });
        } else {
          res.status(400).send("Invalid Password");
        }
      });
    } else {
      res.status(400).send("Unauthorized user");
    }
  });
});

router.post("/signup", async (req, res) => {
  if (await ExistingUser(req.body.email)) {
    res.status(400).send("Email already exists.");
  } else {
    if (req.body.password === req.body.confirmPassword) {
      generatepasswordhash(req.body.password)
        .then((passwordHash) => {
          UserModal.create({
            email: req.body.email,
            password: passwordHash,
          })
            .then((data) => {
              ContactsModal.create({ user: data._id }).then(() => {
                res.status(200).send("user is created");
              });
            })
            .catch((err) => {
              res.status(400).send(err);
            });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    } else {
      res.status(400).send("confirmpassword and password doesn't match");
    }
  }
});

module.exports = router;
