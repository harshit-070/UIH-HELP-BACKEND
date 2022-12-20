const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Completion = new Schema({
  user_id: {
    type: String,
    required: true,
  },

  course_id: {
    type: String,
    required: true,
  },

  certificate_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Completions", Completion);
