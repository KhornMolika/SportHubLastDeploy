import React from "react";
import { FaTelegram, FaFacebook, FaGlobe } from "react-icons/fa";
import GeocodeComponent from "./GeocodeComponent"; // Adjust the path as necessary
import { useLocation } from "react-router-dom";
import "tailwindcss/tailwind.css";

const SportClubDetailCard = () => {
  const location = useLocation();

  const {
    image,
    sport_name,
    description,
    price,
    latitude,
    longitude,
    contact_info: {
      first_phone = "Unknown",
      second_phone = "",
      facebook = "",
      telegram = "",
      website = "",
    },
  } = location.state || {};

  const formattedWebsite =
    website && !/^https?:\/\//i.test(website) ? `http://${website}` : website;

  const endPoint = import.meta.env.VITE_BASE_IMAGE_URL;

  const hoveredPoi = {
    latitude: latitude,
    longitude: longitude,
  };

  return (
    <div className="flex flex-col lg:flex-row group w-full lg:w-[75vw] h-auto lg:h-[30vw] p-4 lg:p-10 border border-gray-100 rounded-xl shadow-md">
      <div className="w-full lg:w-1/2 h-auto">
        <img
          className="w-full h-full object-cover rounded-xl"
          src={`${endPoint}${image}` || "Unknown"}
          alt={sport_name || "Unknown"}
        />
      </div>
      <div className="mt-4 lg:mt-0 lg:ml-10 w-full lg:w-1/2 flex flex-col justify-center items-start">
        <h1 className="mb-2 lg:mb-4 text-xl lg:text-2xl text-black-900 font-bold ">
          {sport_name || "Unknown"}
        </h1>
        <p
          className="mb-2 text-sm lg:text-lg font-[Koh Santepheap] text-slate-500"
          dangerouslySetInnerHTML={{ __html: description || "No description" }}
        />
        <p className="my-2 text-sm lg:text-lg font-semibold text-black">
          Price : <span className="text-blue-900">{price || " Unknown"}</span>
        </p>
        <p className="my-2 text-sm lg:text-lg font-semibold text-black">
          Tel:{" "}
          <span className="text-blue-900">
            {first_phone && (
              <a href={`tel:${first_phone}`} className="text-blue-900">
                {first_phone}
              </a>
            )}
            {second_phone && (
              <>
                {" / "}
                <a href={`tel:${second_phone}`} className="text-blue-900">
                  {second_phone}
                </a>
              </>
            )}
          </span>
        </p>
        <GeocodeComponent latitude={latitude} longitude={longitude} hoveredPoi={hoveredPoi} />
        <div className="my-2 text-sm lg:text-lg font-semibold text-black flex items-center">
          Contact :
          {facebook && (
            <a href={facebook} target="_blank" rel="noopener noreferrer">
              <FaFacebook className="ml-2 lg:ml-4 text-blue-700 text-xl lg:text-2xl" />
            </a>
          )}
          {telegram && (
            <a href={telegram} target="_blank" rel="noopener noreferrer">
              <FaTelegram className="ml-2 lg:ml-4 text-blue-700 text-xl lg:text-2xl" />
            </a>
          )}
          {formattedWebsite && (
            <a
              href={formattedWebsite}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGlobe className="ml-2 lg:ml-4 text-blue-700 text-xl lg:text-2xl" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SportClubDetailCard;
