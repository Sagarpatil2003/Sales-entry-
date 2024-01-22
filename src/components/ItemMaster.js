import axios from "axios";
import { useEffect, useState } from "react";

function ItemMaster() {
    const [itemList, setItemList] = useState([]);
  
    useEffect(() => {
      axios
        .get("http://5.189.180.8:8010/item")
        .then((response) => setItemList(response.data))
        .catch((error) => console.log(error));
    }, []);
  
    const handleRemoveItem = (index) => {
      const updatedItemList = [...itemList];
      updatedItemList.splice(index, 1);
      setItemList(updatedItemList);
    };
  
    if (itemList.length === 0) {
      return <p>Loading...</p>;
    }
  
    const columns = Object.keys(itemList[0]);
  
    return (
      <div className="container">
        <h3>Item Master</h3>
        <table>
          <thead>
            <tr>
              {columns.map((columnName) => (
                <th key={columnName}>{columnName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {itemList.map((item, index) => (
              <tr key={index + 1}>
                {columns.map((columnName) => (
                  <td key={columnName}>{item[columnName]}</td>
                ))}
                <td>
                  <button onClick={() => handleRemoveItem(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default ItemMaster;
