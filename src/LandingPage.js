import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import { SearchBar } from './SearchBar';

const LandingPage = () => {
  const [dealersList, setDealersList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filteredDealersList, setFilteredDealersList] = useState([]);

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = () => {
    fetch('http://localhost:8080/dealer/dealers')
      .then((response) => response.json())
      .then((data) => {
        setDealersList(data);
        setFilteredDealersList(data);
      })
      .catch((error) => {
        console.error('Error fetching dealers:', error);
      });
  };

  const handleSearch = (value) => {
    setIsSearching(true);
    if (value.trim() === '') {
      setFilteredDealersList(dealersList);
      setIsSearching(false);
      return;
    }
    
    fetch(`http://localhost:8080/dealer/dealers?pincode=${value}`)
      .then((response) => response.json())
      .then((data) => {
        setFilteredDealersList(data);
        setIsSearching(false);
      })
      .catch((error) => {
        console.error('Error fetching dealers by pincode:', error);
      });
  };

  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <h1 className="title">VehicleTrade</h1>
        <p className="subtitle">
          Your Vehicle, Your Way: Connect with Dealers on our App
        </p>
        <Link to="/signin" className="cta-button">
          Get Started
        </Link>
      </header>
      <section id="features" className="features-section">
        <h2>Our Dealerships</h2>
        <SearchBar onSearch={handleSearch} />
        {isSearching ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {filteredDealersList.map((dealer) => (
              <li key={dealer.id}>
                <Link to={`/dealer/${dealer.id}`}>{dealer.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <footer className="footer">
        <p>&copy; 2023 VehicleTrade. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
