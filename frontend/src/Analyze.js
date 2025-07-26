











// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend
// } from "recharts";

// function Analyze() {
//   const { fileName } = useParams();
//   const [data, setData] = useState([]);
//   const [chartType, setChartType] = useState("Line Chart");

//   useEffect(() => {
//     const fetchFileData = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8080/api/files/analyze/${encodeURIComponent(fileName)}`);
//         setData(res.data);
//       } catch (err) {
//         console.error("Failed to fetch data", err);
//         alert("Data fetch failed");
//       }
//     };

//     fetchFileData();
//   }, [fileName]);

//   const xKey = data.length > 0 ? Object.keys(data[0])[0] : "";
//   const yKey = data.length > 0 ? Object.keys(data[0])[1] : "";

//   const renderChart = () => {
//     if (!xKey || !yKey) return <p>Invalid data format</p>;

//     if (chartType === "Line Chart") {
//       return (
//         <LineChart width={700} height={350} data={data}>
//           <CartesianGrid stroke="#ccc" />
//           <XAxis dataKey={xKey} />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey={yKey} stroke="#8884d8" />
//         </LineChart>
//       );
//     }

//     if (chartType === "Bar Chart") {
//       return (
//         <BarChart width={700} height={350} data={data}>
//           <CartesianGrid stroke="#ccc" />
//           <XAxis dataKey={xKey} />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey={yKey} fill="#82ca9d" />
//         </BarChart>
//       );
//     }

//     return <p>Chart type not supported</p>;
//   };

//   return (
//     <div style={{ padding: "1px" }}>
//       <h2>Analyzing: {fileName}</h2>
//       <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
//         <option>Line Chart</option>
//         <option>Bar Chart</option>
//       </select>
//       {data.length === 0 ? <p>No data found</p> : renderChart()}
//     </div>
//   );
// }

// export default Analyze;




















import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  LineChart, Line,
  BarChart, Bar,
  AreaChart, Area,
  PieChart, Pie, Cell,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

function Analyze() {
  const { fileName } = useParams();
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("Line");
  const [xKey, setXKey] = useState("");
  const [yKey, setYKey] = useState("");

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/files/analyze/${encodeURIComponent(fileName)}`);
        if (res.data.length > 0) {
          setData(res.data);
          const keys = Object.keys(res.data[0]);
          setXKey(keys[0]);
          setYKey(keys[1]);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
        alert("Data fetch failed");
      }
    };

    fetchFileData();
  }, [fileName]);

  const renderChart = () => {
    if (!xKey || !yKey) return <p style={{ color: "red" }}>Invalid Excel data format</p>;

    switch (chartType) {
      case "Line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={yKey} stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        );

      case "Bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={yKey} fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        );

      case "Area":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey={xKey} />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey={yKey} stroke="#8884d8" fillOpacity={1} fill="url(#colorY)" />
            </AreaChart>
          </ResponsiveContainer>
        );

      case "Pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                dataKey={yKey}
                nameKey={xKey}
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return <p>Unsupported chart type</p>;
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Segoe UI" }}>
      <h2 style={{ marginBottom: "20px" }}>📊 Analysis of <span style={{ color: "#3b82f6" }}>{fileName}</span></h2>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px", fontWeight: "bold" }}>Select Chart Type:</label>
        <select value={chartType} onChange={(e) => setChartType(e.target.value)} style={{ padding: "6px 12px" }}>
          <option value="Line">Line Chart</option>
          <option value="Bar">Bar Chart</option>
          <option value="Area">Area Chart</option>
          <option value="Pie">Pie Chart</option>
        </select>
      </div>

      {data.length === 0 ? (
        <p style={{ color: "#ef4444" }}>No data found in this file.</p>
      ) : (
        renderChart()
      )}
    </div>
  );
}

export default Analyze;
