import React, { useState, useEffect } from "react";
import axios from "axios";


function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h2>Product List</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Name</th>
                <th style={headerCellStyle}>Description</th>
                <th style={headerCellStyle}>Price</th>
                <th style={headerCellStyle}>Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td style={cellStyle}>{product.name}</td>
                  <td style={cellStyle}>{product.description}</td>
                  <td style={cellStyle}>{product.price}</td>
                  <td style={cellStyle}>{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Define table styles
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "30px",
};

// Define header cell styles
const headerCellStyle = {
  backgroundColor: "#A1E1DE",
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

// Define cell styles
const cellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

export default ProductList;


//cd product-crud-app