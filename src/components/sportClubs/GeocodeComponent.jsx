import React, { useState, useEffect } from "react";
import axios from "axios";

const GeocodeComponent = ({ latitude, longitude }) => {
  const [address, setAddress] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);

  const handleViewOnGoogleMap = () => {
    if (currentLocation) {
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.lat},${currentLocation.lng}&destination=${latitude},${longitude}`;
      window.open(directionsUrl, "_blank");
    } else {
      console.error("Current location is not available !");
    }
  };

  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json`,
          {
            params: {
              latlng: `${latitude},${longitude}`,
              key: `${key}`,
            },
          }
        );

        if (response.data.results.length > 0) {
          const formattedAddress = response.data.results[0].formatted_address;
          // Assuming the first address component is the street address
          const streetAddress = formattedAddress.split(",")[0];
          const addressComponents = response.data.results[0].address_components;
          let khan = "";

          // Find the 'sublocality_level_1' component which typically represents 'Khan'
          for (let component of addressComponents) {
            if (component.types.includes("sublocality_level_1")) {
              khan = component.long_name;
              break;
            }
          }

          setAddress(`${streetAddress}, ${khan}, Phnom Penh`);
        } else {
          setAddress("Address not found");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddress("Error fetching address");
      }
    };

    const fetchCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error getting current location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchAddress();
    fetchCurrentLocation();
  }, [latitude, longitude]);

  return (
    <>
      <p
        onClick={handleViewOnGoogleMap}
        className="my-2 text-sm lg:text-lg font-semibold text-black cursor-pointer"
      >
        Location : <span className="text-blue-900">{address}</span>
      </p>
    </>
  );
};

export default GeocodeComponent;
