import React, { useState } from "react";
import axios from "axios";

function ProductForm() {
  const [product, setProduct] = useState({ name: "", description: "", price: "", category: "" });
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null); // Reset success state before submitting
    try {
      const response = await axios.post("http://localhost:5000/api/products", product);
      console.log("Product created:", response.data);
      setSuccess("Product added successfully!");
      setProduct({ name: "", description: "", price: "", category: "" }); // Reset the form fields
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div id="form" style={formStyle}>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input type="text" name="name" placeholder="Name" value={product.name} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} />
        </div>

        <div>
          <button style={buttonStyle} type="submit">Add Product</button>
        </div>
      </form>
      {success && <p style={successMessageStyle}>{success}</p>}
    </div>
  );
}

// Define form styles
const formStyle = {
  backgroundColor: '#f0f0f0',
  padding: '20px',
  borderRadius: '5px',
};

// Define button styles
const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#49B847',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '20px', // Add border radius for rounded corners
  
};


// Define success message styles
const successMessageStyle = {
  color: 'green',
  marginTop: '10px',

};



export default ProductForm;
