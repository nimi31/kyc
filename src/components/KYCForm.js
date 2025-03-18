import React, { useState } from "react";

const KYCForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    document: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, document: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("KYC Submitted Successfully!");
  };

  return (
    <form className="kyc-form" onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />

      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>Phone:</label>
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

      <label>Upload Document:</label>
      <input type="file" onChange={handleFileChange} required />

      <button type="submit">Submit</button>
    </form>
  );
};

export default KYCForm;
