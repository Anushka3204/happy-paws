import React, { useState } from "react";
import axios from "axios";
import './PetAdoptionForm.css'

const PetAdoptionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    location: "",
    contactInfo: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/pets/",
        formData
      );
      setLoading(false);
      setSuccess("Pet adoption form submitted successfully!");
      setFormData({
        name: "",
        type: "",
        breed: "",
        age: "",
        location: "",
        contactInfo: "",
        description: "",
        image: "",
      });
    } catch (err) {
      setLoading(false);
      setError("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <div className="adoption-form">
      <form onSubmit={handleSubmit}>
        <h2>Submit Your Pet for Adoption</h2>
        
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Pet's Name"
          required
        />
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Your pet is a?"
          required
        />
        <input
          type="text"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          placeholder="Breed"
          required
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age (in years)"
          min="0"
          step="any"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <input
          type="text"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
          placeholder="Contact Info (Phone or Email)"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your pet..."
          rows="4"
          required
        />
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
        />
        
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit for Adoption"}
        </button>
      </form>
    </div>
  );
};

export default PetAdoptionForm;
