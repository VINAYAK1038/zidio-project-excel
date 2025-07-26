const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const frontend_URL ="https://zidio-project-excel-frontend-i275.onrender.com"
dotenv.config();



const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017//zidioprojectnew", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// Routes
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const fileRoutes = require("./routes/files");
app.use("/api/files", fileRoutes);



// ✅ Fix: Use `app.get`, not `router.get`
app.get("/api/files/analyze/:fileName", (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, "uploads", fileName); // Corrected folder path

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    res.json(jsonData);
  } catch (error) {
    console.error("Excel parse error:", error);
    res.status(500).json({ error: "Failed to parse Excel file" });
  }
});





app.get("/api/files/analyze/:fileName", (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, "uploads", fileName); // ✅ uploads folder

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    res.json(jsonData);
  } catch (error) {
    console.error("Excel parse error:", error);
    res.status(500).json({ error: "Failed to parse Excel file" });
  }
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
