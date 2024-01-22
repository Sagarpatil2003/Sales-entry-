import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHeader } from "../slice/HeaderSlice";
import { addDetail } from "../slice/DetailSlice";
import axios from "axios";

const YourFormComponent = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    vr_no: 0,
    vr_date: "",
    ac_name: "",
    ac_amt: 0,
    status: "",
    detail_table: [
      {
        sr_no: 0,
        item_code: "",
        item_name: "",
        description: "",
        qty: 0,
        rate: 0,
      },
    ],
  });

  const handleHeaderChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleDetailChange = (index, field, value) => {
    setFormData((prevData) => {
      const newDetailTable = [...prevData.detail_table];
      newDetailTable[index][field] = value;
      return { ...prevData, detail_table: newDetailTable };
    });
  };

  const handleAddDetail = () => {
    setFormData((prevData) => ({
      ...prevData,
      detail_table: [
        ...prevData.detail_table,
        {
          sr_no: prevData.detail_table.length + 1,
          item_code: "",
          item_name: "",
          description: "",
          qty: 0,
          rate: 0,
        },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Add data to the multiple endpoint
      const responseMultiple = await axios.post(
        "http://5.189.180.8:8010/header/multiple",
        {
          header_table: {
            vr_no: formData.vr_no,
            vr_date: formData.vr_date,
            ac_name: formData.ac_name,
            ac_amt: formData.ac_amt,
            status: formData.status,
          },
          detail_table: formData.detail_table,
        }
      );

      // Dispatch actions to update Redux state
      dispatch(addHeader(responseMultiple.data.header_table));
      dispatch(addDetail(responseMultiple.data.detail_table));

      // Step 2: Add header data to the header endpoint
      const responseHeader = await axios.post("http://5.189.180.8:8010/header", {
        vr_no: formData.vr_no,
        vr_date: formData.vr_date,
        ac_name: formData.ac_name,
        ac_amt: formData.ac_amt,
        status: formData.status,
      });

      // Dispatch action to update Redux state with the header data
      dispatch(addHeader(responseHeader.data));

      // Step 3: Add detail data to the detail endpoint
      const responseDetail = await axios.post("http://5.189.180.8:8010/detail", {
        detail_table: formData.detail_table,
      });

      // Dispatch action to update Redux state with the detail data
      dispatch(addDetail(responseDetail.data));

      // Reset the form data
      setFormData({
        vr_no: 0,
        vr_date: "",
        ac_name: "",
        ac_amt: 0,
        status: "",
        detail_table: [
          {
            sr_no: 0,
            item_code: "",
            item_name: "",
            description: "",
            qty: 0,
            rate: 0,
          },
        ],
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Header Section */}
      <label htmlFor="vr_no">VR Number:</label>
      <input
        type="number"
        id="vr_no"
        value={formData.vr_no}
        onChange={(e) => handleHeaderChange("vr_no", e.target.value)}
      />

      <label htmlFor="vr_date">VR Date:</label>
      <input
        type="date"
        id="vr_date"
        value={formData.vr_date}
        onChange={(e) => handleHeaderChange("vr_date", e.target.value)}
      />

      <label htmlFor="ac_name">Account Name:</label>
      <input
        type="text"
        id="ac_name"
        value={formData.ac_name}
        onChange={(e) => handleHeaderChange("ac_name", e.target.value)}
      />

      <label htmlFor="ac_amt">Account Amount:</label>
      <input
        type="number"
        id="ac_amt"
        value={formData.ac_amt}
        onChange={(e) => handleHeaderChange("ac_amt", e.target.value)}
      />

      <label htmlFor="status">Status:</label>
      <input
        type="text"
        id="status"
        value={formData.status}
        onChange={(e) => handleHeaderChange("status", e.target.value)}
      />

      {/* Detail Section */}
      <h4>Detail Table</h4>
      {formData.detail_table.map((detail, index) => (
        <div key={index}>
          <label htmlFor={`item_code_${index}`}>Item Code:</label>
          <input
            type="text"
            id={`item_code_${index}`}
            value={detail.item_code}
            onChange={(e) =>
              handleDetailChange(index, "item_code", e.target.value)
            }
          />

          <label htmlFor={`item_name_${index}`}>Item Name:</label>
          <input
            type="text"
            id={`item_name_${index}`}
            value={detail.item_name}
            onChange={(e) =>
              handleDetailChange(index, "item_name", e.target.value)
            }
          />

          <label htmlFor={`description_${index}`}>Description:</label>
          <textarea
            id={`description_${index}`}
            value={detail.description}
            onChange={(e) =>
              handleDetailChange(index, "description", e.target.value)
            }
          />

          <label htmlFor={`qty_${index}`}>Quantity:</label>
          <input
            type="number"
            id={`qty_${index}`}
            value={detail.qty}
            onChange={(e) => handleDetailChange(index, "qty", e.target.value)}
          />

          <label htmlFor={`rate_${index}`}>Rate:</label>
          <input
            type="number"
            id={`rate_${index}`}
            value={detail.rate}
            onChange={(e) => handleDetailChange(index, "rate", e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={handleAddDetail}>
        Add Detail
      </button>

      <button type="submit">Submit</button>
    </form>
  );
};

export default YourFormComponent;
