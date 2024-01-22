import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DetailSection.css";
import { useDispatch } from "react-redux";
import { removeDetail } from "../slice/DetailSlice";

function DetailSection() {
  const dispatch = useDispatch();
  const [detailList, setDetailList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://5.189.180.8:8010/detail")
      .then((response) => {
        setDetailList(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleRemoveDetail = async (index) => {
    try {
      await axios.delete(`http://5.189.180.8:8010/detail/${index}`);
      dispatch(removeDetail(index));
    } catch (error) {
      console.error("Error removing detail row:", error);
    }
  };

  if (error) {
    return `Error: ${error.message}`;
  }

  const columns = Object.keys(detailList[0] || {});

  return (
    <div className="detail-section">
      <h3>Detail Table</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>Sr.no</th>
              {columns.map((columnName) => (
                <th key={columnName}>{columnName}</th>
              ))}
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {detailList.map((item, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                {columns.map((columnName) => (
                  <td key={columnName}>{item[columnName]}</td>
                ))}
                <td>{item.qty * item.rate}</td>
                <td>
                  <button onClick={() => handleRemoveDetail(index)}>
                    Remove
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailSection;
