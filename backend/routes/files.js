




const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const_URL ="https://zidio-project-excel-frontend-i275.onrender.com";

const File = require("../models/File");

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Setup multer to store uploaded files on disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // use original file name
  }
});

const upload = multer({ storage });

// Route: Upload Excel file
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileData = new File({
      fileName: file.originalname,
      size: (file.size / 1024).toFixed(1) + " KB",
      uploadDate: new Date().toLocaleDateString(),
    });

    await fileData.save();

    res.status(200).json({ message: "File uploaded successfully", fileName: file.originalname });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

// Route: Get recent uploaded files
router.get("/recent", async (req, res) => {
  try {
    const files = await File.find().sort({ _id: -1 }).limit(10);
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch files", error: err.message });
  }
});

// Route: Delete uploaded file metadata
router.delete("/delete/:id", async (req, res) => {
  try {
    await File.findByIdAndDelete(req.params.id);
    res.json({ message: "File deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete file", error: err.message });
  }
});

// Route: Analyze Excel file data for visualization
router.get("/analyze/:fileName", async (req, res) => {
  try {
    const fileName = decodeURIComponent(req.params.fileName);
    const filePath = path.join(uploadsDir, fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    res.json(jsonData);
  } catch (err) {
    console.error("Analyze error:", err);
    res.status(500).json({ message: "Failed to analyze file", error: err.message });
  }
});

module.exports = router;
