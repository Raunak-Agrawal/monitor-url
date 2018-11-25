const express = require("express");
const router = express.Router();
const { mongoose } = require("../db/mongoose");
const { ObjectID } = require("mongodb");
const { User } = require("../models/User");
var start = new Date();

router.post("/insert", (req, res) => {
  var newUser = new User({
    url: req.body.url,
    _id: req.body._id
  });
  var results = [];
  newUser.save().then(
    setInterval(result => {
      res.send(result);
      console.log(res.statusCode);
      console.log(req.body._id);
      results.push((new Date() - start) / 1000);
      console.log(`Time taken is ${(new Date() - start) / 1000} seconds`);
    }, 1000),
    err => {
      res.status(404).send(err);
    }
  );
  console.log(results);
});
router.get("/getallUser/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  User.findById(id).then(
    result => {
      if (!result) {
        res.status(400).send();
      }
      res.send(result);
    },
    err => {
      res.status(404).send();
    }
  );
});
router.delete("/data/delete/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  User.findByIdAndRemove(id)
    .then(result => {
      if (!result) {
        return res.status(400).send();
      }
      res.status(200).send(result);
    })
    .catch(e => {
      res.status(400).send();
    });
});

router.patch("/Update/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(400).send();
  }
  User.findOneAndUpdate(id, {
    $set: {
      url: "https://www.facebook.com"
    }
  }).then(
    resp => {
      console.log("In UPdate User");
      res.send(resp);
    },
    e => {
      res.status(404).send();
    }
  );
});
module.exports = router;
