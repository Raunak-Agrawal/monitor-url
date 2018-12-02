const mongoose = require("mongoose");
const { Schema } = mongoose;
const newSchema = new Schema({
  url: {
    type: String,
    required: true
  },

  time: {
    type: Array
  }
});
var User = mongoose.model("users", newSchema);
module.exports = { User };
