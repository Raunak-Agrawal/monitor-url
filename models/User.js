const mongoose = require("mongoose");
const { Schema } = mongoose;
const newSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  _id: {
    type: Schema.Types.ObjectId
  }
});
var User = mongoose.model("users", newSchema);
module.exports = { User };
