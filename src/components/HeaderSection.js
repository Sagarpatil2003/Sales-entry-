// HeaderSection.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HeaderSection.css";

function HeaderSection() {
  const [headerList, setHeaderList] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    vr_no: 0,
    vr_date: "",
    ac_name: "",
    ac_amt: 0,
    status: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://5.189.180.8:8010/header");
      setHeaderList(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const handleRemoveHeader = async (index) => {
    try {
      await axios.delete(`http://5.189.180.8:8010/header/${index}`);
      const updatedHeaders = headerList.filter((_, i) => i !== index);
      setHeaderList(updatedHeaders);
    } catch (error) {
      console.error("Error removing header:", error);
    }
  };

  const handleAddHeader = async () => {
    try {
      const response = await axios.post("http://5.189.180.8:8010/header", formData);
      setHeaderList((prevHeaders) => [...prevHeaders, response.data]);
      setFormData({
        vr_no: 0,
        vr_date: "",
        ac_name: "",
        ac_amt: 0,
        status: "",
      });
    } catch (error) {
      console.error("Error adding header:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  if (error) {
    return `Error: ${error.message}`;
  }

  const columns = Object.keys(headerList[0] || {});

  return (
    <div className="container">
      <h3>Header</h3>

      {/* Add Form */}
      <div className="add-form">
        <label htmlFor="vr_no">VR Number:</label>
        <input
          type="number"
          id="vr_no"
          value={formData.vr_no}
          onChange={(e) => handleInputChange("vr_no", e.target.value)}
        />

        <label htmlFor="vr_date">VR Date:</label>
        <input
          type="date"
          id="vr_date"
          value={formData.vr_date}
          onChange={(e) => handleInputChange("vr_date", e.target.value)}
        />

        <label htmlFor="ac_name">Account Name:</label>
        <input
          type="text"
          id="ac_name"
          value={formData.ac_name}
          onChange={(e) => handleInputChange("ac_name", e.target.value)}
        />

        <label htmlFor="ac_amt">Account Amount:</label>
        <input
          type="number"
          id="ac_amt"
          value={formData.ac_amt}
          onChange={(e) => handleInputChange("ac_amt", e.target.value)}
        />

        <label htmlFor="status">Status:</label>
        <input
          type="text"
          id="status"
          value={formData.status}
          onChange={(e) => handleInputChange("status", e.target.value)}
        />

        <button onClick={handleAddHeader}>Add Header</button>
      </div>

      {/* Header Table */}
      <div className="header-table-container">
        {error && <h3 className="error-message">{`Error: ${error.message}`}</h3>}
        <table>
          <tbody>
            <tr>
              <th>Sr.no</th>
              {columns.map((columnName) => (
                <th key={columnName}>{columnName}</th>
              ))}
              <th>Action</th>
            </tr>
            {headerList.map((row, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                {columns.map((columnName) => (
                  <td key={columnName}>{row[columnName]}</td>
                ))}
                <td>
                  <button onClick={() => handleRemoveHeader(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HeaderSection;
