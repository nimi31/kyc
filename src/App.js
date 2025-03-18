import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "antd/dist/reset.css";
import "./styles.css";

const ProductDetails = ({ addToCompare, comparedProducts }) => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const columns = [
    { title: "Title", dataIndex: "title", key: "title", sorter: (a, b) => a.title.localeCompare(b.title) },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Price ($)", dataIndex: "price", key: "price", sorter: (a, b) => a.price - b.price },
    { title: "Discount (%)", dataIndex: "discountPercentage", key: "discountPercentage" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Image", dataIndex: "thumbnail", key: "thumbnail", render: (img) => <img src={img} alt="Product" width="50" /> },
    {
      title: "Compare",
      key: "compare",
      render: (record) => (
        <Button
          type="primary"
          disabled={comparedProducts.some((p) => p.id === record.id)}
          onClick={() => addToCompare(record)}
        >
          Compare
        </Button>
      ),
    },
  ];

  return (
    <div className="container">
      <h2>Product Details</h2>
      <Table columns={columns} dataSource={products} rowKey="id" pagination={{ pageSize: 5 }} />
    </div>
  );
};

const CompareProducts = ({ comparedProducts, removeFromCompare, addMoreProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container">
      <h2>Compare Products</h2>
      <div className="compare-container">
        {comparedProducts.length === 0 ? (
          <p>No products selected for comparison.</p>
        ) : (
          <div className="compare-grid">
            {comparedProducts.map((product) => (
              <div key={product.id} className="compare-card">
                <img src={product.thumbnail} alt={product.title} className="compare-image" />
                <h3>{product.title}</h3>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <Button danger onClick={() => removeFromCompare(product.id)}>Remove</Button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>Add More</Button>
      <Modal
        title="Add More Products"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <ProductDetails addToCompare={addMoreProducts} comparedProducts={comparedProducts} />
      </Modal>
    </div>
  );
};

const App = () => {
  const [comparedProducts, setComparedProducts] = useState([]);

  const addToCompare = (product) => {
    if (comparedProducts.length < 4 && !comparedProducts.some((p) => p.id === product.id)) {
      setComparedProducts([...comparedProducts, product]);
    }
  };

  const removeFromCompare = (id) => {
    setComparedProducts(comparedProducts.filter((p) => p.id !== id));
  };

  return (
    <Router>
      <div className="layout">
        <nav className="navbar">
          <h1>My Store</h1>
          <img src="D:\MyreactApps\kychub\public\profiel.png" alt="User" className="profile-pic" />
        </nav>
        <div className="main-content">
          <aside className="sidebar">
            <Link to="/">Product Details</Link>
            <Link to="/compare">Compare Products</Link>
          </aside>
          <div className="content">
            <Routes>
              <Route path="/" element={<ProductDetails addToCompare={addToCompare} comparedProducts={comparedProducts} />} />
              <Route path="/compare" element={<CompareProducts comparedProducts={comparedProducts} removeFromCompare={removeFromCompare} addMoreProducts={addToCompare} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
