const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  fileName: String,
  size: String,
  uploadDate: String,
});

module.exports = mongoose.model("File", fileSchema);
