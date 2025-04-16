import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PetCard from '../components/PetCard';
import Navbar from '../components/NavBar';

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [typeText, setTypeText] = useState('');
  const [breedText, setBreedText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/pets/')
      .then(response => {
        setPets(response.data);
        setFilteredPets(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = pets.filter(pet => {
      const type = pet.type?.toLowerCase() || '';
      const breed = pet.breed?.toLowerCase() || '';
      const matchesType = typeText === '' || type.includes(typeText.toLowerCase());
      const matchesBreed = breedText === '' || breed.includes(breedText.toLowerCase());
      return matchesType && matchesBreed;
    });
    setFilteredPets(filtered);
  }, [typeText, breedText, pets]);

  if (loading) return <h2>Loading pets...</h2>;
  if (error) return <h2>Error fetching pets: {error.message}</h2>;

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1>Our Lovely Pets</h1>

        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Type (e.g., dog, cat)"
            value={typeText}
            onChange={(e) => setTypeText(e.target.value)}
            style={styles.input}
          />
          <div style={styles.divider}></div>
          <input
            type="text"
            placeholder="Breed (e.g., labrador)"
            value={breedText}
            onChange={(e) => setBreedText(e.target.value)}
            style={styles.input}
          />
        </div>


        <div style={styles.cardsContainer}>
          {filteredPets.length > 0 ? (
            filteredPets.map((pet, index) => (
              <PetCard key={index} pet={pet} />
            ))
          ) : (
            <p>No matching pets found 🐾</p>
          )}
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    paddingTop: '120px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Segoe UI, sans-serif',
  },
  searchBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    width: '90%',
    maxWidth: '900px',
    margin: '20px auto',
    border: '1px solid #ddd',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    fontSize: '16px',
    border: 'none',
    outline: 'none',
  },
  divider: {
    width: '1px',
    height: '25px',
    backgroundColor: '#ccc',
    margin: '0 4px',
  },
  
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px',
  },
};


export default AllPets;