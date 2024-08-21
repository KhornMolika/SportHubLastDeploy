import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { getAccessToken } from "../../lib/secureLocalStorage";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { IoMdFemale, IoMdMale } from "react-icons/io";

export default function UserProfile() {
  const location = useLocation();
  const profile = location.state;
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL.replace(/^http:/, "https:");
  const endPointOfUserProfile = import.meta.env.VITE_GET_USER_PROFILE;

  const [profileData, setProfileData] = useState(profile || {});
  const [selectedImage, setSelectedImage] = useState(
    profileData.profile_image || "https://via.placeholder.com/150"
  );

  const handleNavigateToUserDetail = (profile) => {
    navigate("/user-detail", { state: profile });
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        console.error("Access token not available");
        return;
      }

      const response = await axios.get(`${baseUrl}${endPointOfUserProfile}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setProfileData(response.data);
      setSelectedImage(
        response.data.profile_image || "https://via.placeholder.com/150"
      );
    } catch (error) {
      console.error(
        "Error fetching profile data:",
        error.response ? error.response.data : error.message
      );
    }
  };
  // left-[-180px] mt-10"
  return (
    <>
      <main className="flex flex-col lg:flex-row items-center justify-center lg:justify-start">
        <section className="flex items-center justify-center lg:h-screen lg:w-[50%] relative mt-20 lg:mt-0 lg:ml-[-380px] lg:bottom-[-10px]">
          <div className="bg-[#172554] h-[30vh] w-[30vh] lg:h-[100vh] lg:w-[100vh] rounded-full relative flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Profile"
              className="h-[30vh] w-[30vh] object-cover rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:w-[320px] lg:h-[320px] lg:translate-x-[200px] lg:border-white lg:border-[20px]"
            />
          </div>
        </section>
        <section className="lg:h-screen flex flex-col justify-center items-start lg:w-[50%] text-left p-4 lg:p-0 lg:ml-72 xl:ml-56">
          <div className="mb-2 lg:mb-8 lg:w-full">
            <p className="text-gray-600 text-lg lg:text-[30px] lg:mb-3 mb-0">
              ឈ្មោះអ្នកប្រើប្រាស់:
            </p>
            <p className="font-medium text-2xl lg:text-[50px]">
              {profileData.username ? (
                profileData.username
              ) : (
                <span className="font-bold">មិនមានឈ្មោះពេញ</span>
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 justify-start items-center lg:w-[70%]">
            <div className="lg:w-full mb-2 lg:mb-4">
              <p className="text-gray-600 text-base lg:text-lg">ភេទ:</p>
              <div className="flex items-center">
                {profileData.gender === "M" ? (
                  <IoMdMale className="text-blue-500" />
                ) : profileData.gender === "F" ? (
                  <IoMdFemale className="text-pink-500" />
                ) : (
                  <span className="font-bold">មិនបានបញ្ជាក់</span>
                )}
              </div>
            </div>
            <div className="lg:w-full mb-2 lg:mb-4">
              <p className="text-gray-600 text-base lg:text-lg">
                ថ្ងៃខែឆ្នាំកំណើត:
              </p>
              <p className="font-medium">
                {profileData.dob ? (
                  format(new Date(profileData.dob), "yyyy-MM-dd")
                ) : (
                  <span className="font-bold">មិនបញ្ជាក់ថ្ងៃកំណើត</span>
                )}
              </p>
            </div>
            <div className="lg:w-full mb-2 lg:mb-4">
              <p className="text-gray-600 text-base lg:text-lg">Email:</p>
              <p className="font-medium">
                {profileData.email ? (
                  profileData.email
                ) : (
                  <span className="font-bold">មិនមានអីម៉ែល</span>
                )}
              </p>
            </div>
            <div className="lg:w-full mb-2 lg:mb-4">
              <p className="text-gray-600 text-base lg:text-lg">លេខទូរស័ព្ទ:</p>
              <p className="font-medium">
                {profileData.phone_number ? (
                  profileData.phone_number
                ) : (
                  <span className="font-bold">មិនមានលេខទូរស័ព្ទ</span>
                )}
              </p>
            </div>
            <div className="lg:w-full mb-2 lg:mb-4">
              <p className="text-gray-600 text-base lg:text-lg">ទីតាំង:</p>
              <p className="font-medium">
                {profileData.location ? (
                  profileData.location
                ) : (
                  <span className="font-bold">មិនមានទីតាំង</span>
                )}
              </p>
            </div>
            <div className="lg:w-full mb-2 lg:mb-4">
              <p className="text-gray-600 text-base lg:text-lg">Facebook:</p>
              {profileData.social_links ? (
                <a
                  href={profileData.social_links}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                >
                  <FaFacebook size={25} />
                </a>
              ) : (
                <span className="font-bold">មិនមានFacebook</span>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleNavigateToUserDetail(profile)}
              className="border-blue-500 border-2 bg-transparent hover:border-transparent hover:bg-blue-500 hover:text-white text-blue-500 font-bold py-1 px-4 rounded mt-5 lg:mt-3"
            >
              កែប្រែ
            </button>
            <button
              onClick={() => handleNavigateBack()}
              className="border-red-500 border-2 bg-transparent hover:border-transparent hover:bg-red-500 hover:text-white text-red-500 font-bold py-1 px-4 rounded mt-5 lg:mt-3"
            >
              ថយក្រោយ
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
