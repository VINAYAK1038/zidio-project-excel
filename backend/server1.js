const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

dotenv.config();

const app = express();

// ✅ Secure CORS setup to allow only your frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Comes from .env file
  methods: "GET,POST,PUT,DELETE",
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// ✅ MongoDB Connection from .env
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Routes
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const fileRoutes = require("./routes/files");
app.use("/api/files", fileRoutes);

// ✅ Analyze Excel File Route
app.get("/api/files/analyze/:fileName", (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, "uploads", fileName);

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


const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "GET,POST,PUT,DELETE",
  credentials: true
};
app.use(cors(corsOptions));


// ✅ Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
