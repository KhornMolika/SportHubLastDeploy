import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/SportHubLogo.png";
import axios from "axios";

export default function NewsComponentDetail({
  id,
  image,
  title,
  released_date,
  view,
  body,
}) {
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");

  const endPoint = import.meta.env.VITE_BASE_IMAGE_URL;
  const authToken = import.meta.env.VITE_ADMIN_TOKEN;
  const baseUrl = import.meta.env.VITE_BASE_URL.replace(/^http:/, "https:");

  useEffect(() => {
    axios
      .get(`${baseUrl}profile/`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include the token here
        },
      })
      .then((response) => {
        const { profile_image, username } = response.data; // Adjust based on your API response
        setProfileImage(profile_image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s");
        setUsername(username || "Unknown User");
      })
      .catch((error) => {
        console.error("Error fetching the profile data:", error);
      });
  }, [authToken]);

  return (
    <>
      <div className="w-full h-auto mt-28">
        <div className="flex flex-row justify-start items-center">
          <Link to="/">
            <img src={logo} alt="logo" className="h-7" />
          </Link>
          <Link to="/news">
            <h3 className="text-xl text-[#222162] font-semibold my-5">
              <span className="text-2xl text-red-800 px-2">|</span>
              ព័ត៌មាន
            </h3>
          </Link>
        </div>
        <h1 className="text-xl md:text-3xl text-[#222162] font-bold leading-normal">
          {title || "មិនមានចំណងជើងព័ត៌មាន"}
        </h1>
        <p>{view || "0"} views</p>
        <div className="flex items-center mb-5">
          <img
            src={profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"}
            alt="publisher image"
            className="w-[40px] h-[40px] object-cover rounded-full"
          />
          <p className="ml-4 text-md text-gray-800 font-semibold group-hover:text-[#222162]">
          {username || "Unknown User"}
          </p>
        </div>

        {/* news image */}
        <div className="pb-5 flex justify-center">
          <img
            src={`${endPoint}${
              image ||
              "https://i.pinimg.com/564x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg"
            }`}
            alt="news image"
            className="w-auto h-auto object-cover forced-color-adjust-auto rounded-lg"
          />
        </div>
        <p
          className="text-lg text-gray-900 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: body || "មិនមានអត្ថបទ" }}
        ></p>

        <p className="text-md text-blue-700 hover:text-blue-800 font-normal pt-5">
          ប្រភព​ ៖​ Sabay News
        </p>
      </div>
    </>
  );
}
