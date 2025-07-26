const mongoose = require("mongoose");

const ExcelDataSchema = new mongoose.Schema({
  fileName: String,
  data: Array, // parsed Excel rows
});

module.exports = mongoose.model("files", ExcelDataSchema);
