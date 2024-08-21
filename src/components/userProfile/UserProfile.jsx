import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  selectUserProfile,
  selectUserStatus,
  logout,
} from "../../redux/feature/user/userSlice";
import { removeAccessToken } from "../../lib/secureLocalStorage";
import placeHolder from "../../assets/placeholder.jpeg";
import { IoIosLogOut } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const UserProfile = ({ onLogout, active }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const profile = useSelector(selectUserProfile);
  const status = useSelector(selectUserStatus);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (location.pathname === "/view-profile") {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, location]);

  const { username, email, profile_image, social_links } = profile;

  const handleProfileClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    removeAccessToken();
    onLogout();
  };

  const handleNavigateToUserDetail = (profile) => {
    navigate("/view-profile", { state: profile });
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".profile-img")
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="w-8 h-8 rounded-full md:mr-4 cursor-pointer mx-auto profile-img">
        <img
          src={placeHolder}
          alt="profile img"
          className="w-full h-full object-cover rounded-full border border-gray-300"
        />
      </div>
    );
  }

  return (
    <>
      <div className="w-auto h-auto rounded-full relative">
        <div
          className="w-8 h-8 rounded-full mr-2 md:mr-4 cursor-pointer mx-auto profile-img"
          onClick={handleProfileClick}
        >
          <img
            src={profile_image || placeHolder}
            alt="profile img"
            className="w-full h-full object-cover rounded-full border border-gray-300"
          />
        </div>
        {showDropdown && (
          <div
            ref={dropdownRef} // Attach ref to the dropdown container
            className="absolute top-7 -left-12 w-auto transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-10 cursor-pointer"
          >
            <div
              onClick={() => handleNavigateToUserDetail(profile)}
              className="flex flex-row justify-center items-center p-3 hover:bg-gray-100"
            >
              <div className="w-10 h-10 rounded-full cursor-pointer mx-auto mr-3">
                <img
                  src={profile_image || placeHolder}
                  alt="profile img"
                  className="w-full h-full object-cover rounded-full border border-gray-300"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold flex items-center">
                  {username}
                  {social_links && (
                    <a
                      href={social_links}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-600"
                    >
                      <FaFacebook size={14} />
                    </a>
                  )}
                </h2>
                <p className="text-gray-600">{email}</p>
              </div>
            </div>
            <hr />
            <button
              onClick={handleLogout}
              className="w-full hover:bg-gray-100 text-lg font-semibold text-gray-700 px-4 py-2 rounded-lg flex justify-center items-center"
            >
              ចាកចេញ <IoIosLogOut className="ml-2 text-gray-700" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
