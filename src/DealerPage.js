import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DealerPage = () => {
  const { id } = useParams();
  const [dealer, setDealer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDealer();
  }, [id]);

  const fetchDealer = async () => {
    try {
      const response = await fetch(`http://localhost:8080/dealer/${id}`);
      const data = await response.json();
      setDealer(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dealer:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>{dealer.name}</h1>
          <p>{dealer.city}</p>
          <p>{dealer.mobileno}</p>
          <p>{dealer.pincode}</p>
          {/* add more dealer details here */}
        </div>
      )}
    </div>
  );
};

export default DealerPage;
