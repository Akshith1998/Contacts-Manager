const express = require("express");
const router = express.Router();
const ContactModal = require("../Modals/ContactsModal");
const UserModal = require("../Modals/UserModal");

router.post("/", (req, res) => {
  UserModal.find({ email: req.body.userdata.email })
    .then((user) => {
      if (user) {
        ContactModal.updateOne(
          { user: user[0]._id },
          { $addToSet: { contacts: { $each: req.body.contacts } } }
        )
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      } else {
        res.status(400).send("user not found");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.delete("/selected", (req, res) => {
  UserModal.find({ email: req.body.userdata.email })
    .then((user) => {
      if (user) {
        ContactModal.find({ user: user[0]._id }).then((data) => {
          ContactModal.updateMany(
            { user: user[0]._id },
            {
              $pull: {
                contacts: { Email: { $in: Array.from(req.body.Email) } },
              },
            }
          )
            .then((contact) => {
              res.status(200).send("Deleted contacts");
            })
            .catch((err) => {
              res.status(400).send(err);
            });
        });
      } else {
        res.status(400).send("user not found");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/", (req, res) => {
  UserModal.find({ email: req.body.userdata.email })
    .then((user) => {
      if (user) {
        ContactModal.aggregate([{ $match: { user: user[0]._id } }])
          .then((contacts) => {
            res.status(200).send(contacts[0].contacts);
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      } else {
        res.status(400).send("user not found");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/search", (req, res) => {
  const search = req.query.email;
  if (search) {
    UserModal.find({ email: req.body.userdata.email }).then((user) => {
      if (user) {
        ContactModal.aggregate([{ $match: { user: user[0]._id } }]).then(
          (contacts) => {
            const array = contacts[0].contacts;
            const filtersearch = array.filter((ele) => {
              if (ele.Email.split("@")[0].includes(search)) {
                return ele;
              }
            });
            res.status(200).send(filtersearch);
          }
        );
      }
    });
  } else {
    UserModal.find({}).then((user) => {
      if (user) {
        ContactModal.aggregate([{ $match: { user: user[0]._id } }])
          .then((contacts) => {
            res.status(200).send(contacts[0].contacts);
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      }
    });
  }
});

module.exports = router;
