const express = require("express");
const router = express.Router();
const { mongoose } = require("../db/mongoose");
const { ObjectID } = require("mongodb");
const { User } = require("../models/User");
const fetch = require("node-fetch");

// import axios from "axios";

var respTime;
router.post("/insert", (req, res) => {
  var newUser = new User({
    url: req.body.url
  });
  newUser.save(function(err, objectid) {
    var returnedId = objectid._id;
    var test = objectid.url;
    var respTime = setInterval(cal_resp_time, 1000);
    function cal_resp_time() {
      var start = new Date();
      fetch(test, {
        method: "POST",
        body: JSON.stringify({ data: "ABC" }),
        headers: { "Content-Type": "application/json" }
      }).then(function(data) {
        var endTime = (new Date() - start) / 1000;
        User.findByIdAndUpdate(
          returnedId,
          {
            $push: {
              time: [endTime]
            }
          },
          function(err, doc) {
            if (err) {
              throw err;
            } else {
              console.log("Updated");
            }
          }
        );
      });
    }
  });
});

router.get("/getAllInfo/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  User.findById(id).then(
    result => {
      if (!result) {
        res.status(400).send();
      }
      console.log(result.url);
      res.send(result.time.slice(-50));
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
      clearInterval(respTime);
      res.status(200).send(result);
    })
    .catch(e => {
      res.status(400).send();
    });
});

router.put("/Update/:id", (req, res) => {
  var url = req.body.url;
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(400).send();
  }
  User.findOneAndUpdate(id, {
    $set: {
      url: url
    }
  }).then(
    resp => {
      console.log("Updated User");
      res.send(resp);
    },
    e => {
      res.status(404).send();
    }
  );
});
module.exports = router;
