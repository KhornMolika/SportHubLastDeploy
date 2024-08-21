import React, { useEffect, useState, useRef } from "react";
import { Marker, InfoWindow } from "@vis.gl/react-google-maps";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import MapCardLoading from "./MapCardLoading";

const PointMarker = ({ pois, radius, formatDistance }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distances, setDistances] = useState({});
  const [filteredPois, setFilteredPois] = useState([]);
  const [hoveredPoi, setHoveredPoi] = useState(null);
  const [hoveredPoiImage, setHoveredPoiImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const poisPerPage = 3;
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const cardRefs = useRef({});
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const endPoint = import.meta.env.VITE_BASE_IMAGE_URL;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = { lat: latitude, lng: longitude };
          setCurrentLocation(userLocation);

          const newDistances = {};
          const newFilteredPois = [];
          pois.forEach((poi) => {
            if (
              window.google &&
              window.google.maps &&
              window.google.maps.geometry
            ) {
              const poiLocation = new window.google.maps.LatLng(
                poi.latitude,
                poi.longitude
              );
              const userLatLng = new window.google.maps.LatLng(
                userLocation.lat,
                userLocation.lng
              );
              const distance =
                window.google.maps.geometry.spherical.computeDistanceBetween(
                  userLatLng,
                  poiLocation
                );
              newDistances[poi.key] = distance;

              if (parseFloat(formatDistance(distance)) < radius) {
                newFilteredPois.push(poi);
              }
            } else {
              console.error("Google Maps API or geometry library not loaded.");
            }
          });
          setDistances(newDistances);
          setFilteredPois(newFilteredPois);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, [pois, radius, formatDistance]);

  const handleMarkerMouseOver = (poi) => {
    setHoveredPoi(poi);
    setHoveredPoiImage(poi.image);

    const poiIndex = filteredPois.findIndex((item) => item.key === poi.key);
    const poiPage = Math.floor(poiIndex / poisPerPage) + 1;

    if (poiPage !== currentPage) {
      setCurrentPage(poiPage);
    } else {
      if (cardRefs.current[poi.key]) {
        cardRefs.current[poi.key].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  const handleViewOnGoogleMap = () => {
    if (currentLocation) {
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.lat},${currentLocation.lng}&destination=${hoveredPoi.latitude},${hoveredPoi.longitude}`;
      window.open(directionsUrl, "_blank");
    } else {
      console.error("Current location is not available !");
    }
  };

  useEffect(() => {
    if (hoveredPoi && cardRefs.current[hoveredPoi.key]) {
      scrollTimeoutRef.current = setTimeout(() => {
        cardRefs.current[hoveredPoi.key].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
    }

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentPage, hoveredPoi]);

  const handleMarkerMouseOut = () => {
    setHoveredPoi(null);
    setHoveredPoiImage(null);
  };

  const handleCardMouseEnter = (poi) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoveredPoi(poi);
    setHoveredPoiImage(poi.image);
  };

  const handleCardMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredPoi(null);
      setHoveredPoiImage(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const indexOfLastPoi = currentPage * poisPerPage;
  const indexOfFirstPoi = indexOfLastPoi - poisPerPage;
  const currentPois = filteredPois.slice(indexOfFirstPoi, indexOfLastPoi);
  const totalPages = Math.ceil(filteredPois.length / poisPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {filteredPois.map((poi) => (
        <Marker
          key={poi.id}
          position={{ lat: poi.latitude, lng: poi.longitude }}
          onMouseOver={() => handleMarkerMouseOver(poi)}
          // onMouseOut={handleMarkerMouseOut}
          icon={{
            url: `http://maps.google.com/mapfiles/ms/icons/${
              hoveredPoi?.key === poi.key ? "orange" : "red"
            }-dot.png`,
            scaledSize: new window.google.maps.Size(
              hoveredPoi?.key === poi.key ? 40 : 32,
              hoveredPoi?.key === poi.key ? 40 : 32
            ),
          }}
          label={{
            text: poi.sport_name,
            color: "black",
            fontSize: "9px",
          }}
        />
      ))}
      {currentLocation && (
        <Marker
          key="current-location"
          position={currentLocation}
          icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        />
      )}

      {hoveredPoi && (
        <InfoWindow
          position={{ lat: hoveredPoi.latitude, lng: hoveredPoi.longitude }}
          onCloseClick={() => setHoveredPoi(null)}
        >
          <div
            onClick={() => {
              navigate("/sportclub-details", { state: hoveredPoi });
            }}
            style={{ cursor: "pointer" }}
          >
            <img
              src={`${endPoint}${hoveredPoiImage}`}
              alt={hoveredPoi.sport_name}
              style={{ width: "200px", height: "150px", borderRadius: "10px" }}
            />
            <h3>{hoveredPoi.sport_name}</h3>
            <h3>Distance: {formatDistance(distances[hoveredPoi.key])} km</h3>
            <h3
              onClick={handleViewOnGoogleMap}
              className="cursor-pointer text-blue-600 mt-2"
            >
              View on Google Map
            </h3>
          </div>
        </InfoWindow>
      )}

      <div data-aos="fade-up" className="p-4">
        {loading
          ? Array.from({ length: poisPerPage }).map((_, index) => (
              <MapCardLoading key={index} />
            ))
          : currentPois.map((poi) => (
              <div
                key={poi.key}
                ref={(el) => (cardRefs.current[poi.key] = el)}
                className={`p-4 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 cursor-pointer mb-5 transition-transform duration-300 ${
                  hoveredPoi?.key === poi.key ? "transform scale-105" : ""
                }`}
                onMouseEnter={() => handleCardMouseEnter(poi)}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => {
                  navigate("/sportclub-details", { state: poi });
                }}
              >
                <img
                  src={`${endPoint}${poi.image}`}
                  alt={poi.sport_name}
                  className="w-full md:w-48 h-48 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-blue-700 mb-2">
                      {poi.sport_name}
                    </h3>
                    <p
                      className="text-lg text-gray-600 mb-3 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: poi.description || "No description",
                      }}
                    ></p>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-4">
                      <p>Price: {poi.price}</p>
                      <p>Reviews: {poi.reviews}</p>
                      <p>Seat Number: {poi.seat_number}</p>
                      <p>Skill Level: {poi.skill_level}</p>
                      <p>Distance: {formatDistance(distances[poi.key])} km</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === index + 1
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default PointMarker;
