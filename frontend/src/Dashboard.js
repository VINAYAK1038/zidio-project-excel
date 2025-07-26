import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/files/recent");
      setFiles(res.data);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8080/api/files/upload", formData);
      alert("File uploaded");
      fetchFiles(); // Refresh list
    } catch (err) {
      alert("Upload failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/files/delete/${id}`);
      alert("File deleted");
      fetchFiles(); // Refresh list
    } catch (err) {
      alert("Delete failed");
    }
  };

  // ----------------- Inline Styles -----------------
  const containerStyle = {
    padding: "40px",
    backgroundColor: "#f9fafb",
    minHeight: "100vh"
  };

  const cardsContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "40px"
  };

  const cardStyle = (borderColor) => ({
    flex: 1,
    margin: "0 10px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    borderBottom: `4px solid ${borderColor}`,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  });

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  };

  const thTdStyle = {
    padding: "12px 16px",
    borderBottom: "1px solid #e5e7eb",
    textAlign: "left",
    fontSize: "14px"
  };

  const actionStyle = {
    color: "#3b82f6",
    marginRight: "10px",
    cursor: "pointer"
  };

  const deleteStyle = {
    color: "#ef4444",
    cursor: "pointer"
  };

  return (
    <div style={containerStyle}>
      <h2>Welcome back, Vinayak</h2>
      <p>Here's an overview of your Excel analytics</p>

      <div style={cardsContainerStyle}>
        <label style={cardStyle("#3b82f6")}>
          <input
            type="file"
            accept=".xlsx,.xls"
            style={{ display: "none" }}
            onChange={handleUpload}
          />
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>
            📤 Upload Excel File
          </div>
          <div style={{ fontSize: "14px", color: "#6b7281" }}>
            Import new data for analysis
          </div>
        </label>

        <div style={cardStyle("#10b981")}>
          <div style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "4px" }}>
            10
          </div>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>Charts created</div>
        </div>

        <div style={cardStyle("#a855f7")}>
          <div style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "4px" }}>
            {files.length}
          </div>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>Files uploaded</div>
        </div>
      </div>

      <h3>Recent Files</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>File Name</th>
            <th style={thTdStyle}>Date Uploaded</th>
            <th style={thTdStyle}>Size</th>
            <th style={thTdStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td style={thTdStyle}>{file.fileName}</td>
              <td style={thTdStyle}>{file.uploadDate || "N/A"}</td>
              <td style={thTdStyle}>{file.size || "0 KB"}</td>
              <td style={thTdStyle}>
                <span
                  style={actionStyle}
                  onClick={() => navigate(`/analyze/${file.fileName}`)}
                >
                  Analyze
                </span>
                <span
                  style={deleteStyle}
                  onClick={() => handleDelete(file._id)}
                >
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     

    </div>
  );
}

export default Dashboard;
