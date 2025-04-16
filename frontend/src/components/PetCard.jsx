import React, { useState } from 'react';
import './PetCard.css';
import axios from 'axios';

const PetCard = ({ pet }) => {
  const [showForm, setShowForm] = useState(false);

  const handleRequestClick = () => {
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
  
    if (!userEmail || !userName) {
      alert("Please login first to request adoption.");
      return;
    }
  
    setShowForm(true);
  };
  
  const handleCloseForm = () => setShowForm(false);

  const handleSubmitRequest = (e) => {
    e.preventDefault();

    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
  
    if (!userEmail || !userName) {
      alert("Please login first to request adoption.");
      return;
    }
  
    const form = e.target;
    const requestData = {
      petName: pet.name,
      petType: pet.type,
      petBreed: pet.breed,
      yourName: userName,       
      email: userEmail,   
      phone: form.phone.value,
      ownedBefore: form.ownedBefore.checked,
      reason: form.reason.value,
    };
  
    axios.post("http://localhost:5000/api/request/", requestData)
      .then((res) => {
        alert("Adoption request submitted successfully!");
        handleCloseForm();
      })
      .catch((err) => {
        console.error(err);
        alert("Something went wrong. Try again?");
      });
  };
  
  return (
    <div className="pet-card">
      <img src={pet.image} alt={pet.name} className="pet-image" />
      <h2>{pet.name}</h2>
      <p><strong>Type:</strong> {pet.type}</p>
      <p><strong>Breed:</strong> {pet.breed}</p>
      <p><strong>Age:</strong> {pet.age} years</p>
      <p>{pet.description}</p>
      <button onClick={handleRequestClick} className="request-button">Request Adoption</button>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Adoption Request for {pet.name}</h3>
            <form onSubmit={handleSubmitRequest}>
              <input name="name" type="text" placeholder="Your Name" required className="form-input" />
              <input name="email" type="email" placeholder="Your Email" required className="form-input" />
              <input name="phone" type="tel" placeholder="Phone Number" required className="form-input" />

              <textarea
                placeholder="Why do you want to adopt?"
                required
                className="form-textarea"
                name="reason"
              ></textarea>

              <div>
                <label className="checkbox-label">
                  <input type="checkbox" name="ownedBefore"  />
                  I have owned a pet before
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="submit" className="form-submit">Submit</button>
                <button type="button" onClick={handleCloseForm} className="form-cancel">Cancel</button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetCard;
