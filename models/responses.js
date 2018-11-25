const mongoose = require("mongoose");
const { Schema } = mongoose;
const newSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  delays: {
    type: Text,
    required: true
  }
});
module.exports = mongoose.model("responses", newSchema);
