import React, { useEffect, useState } from 'react';

const VehiclePage = ({ dealerId }) => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/vehicle/vehicles?id=${dealerId}`);
        if (response.ok) {
          const data = await response.json();
          setVehicles(data);
          console.log(data)
        } else {
          throw new Error('Error fetching vehicles');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, [dealerId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Vehicles Available</h2>
      {vehicles.length > 0 ? (
        <ul>
          {vehicles.map((vehicle, index) => (
            <li key={index}>{vehicle.brand}</li>
          ))}
        </ul>
      ) : (
        <p>No vehicles available for this dealer.</p>
      )}
    </div>
  );
};

export default VehiclePage;
