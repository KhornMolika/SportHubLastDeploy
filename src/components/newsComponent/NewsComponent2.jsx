import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt } from "react-icons/fa";
import { formatDate, formatViews } from "../../components/common/newsUtils";

export default function NewsComponent2({
  id,
  image,
  title,
  released_date,
  view,
  handleNewsDetail,
}) {
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");
  const formattedDate = formatDate(released_date);
  const formattedViews = formatViews(view);
  const endPoint = import.meta.env.VITE_BASE_IMAGE_URL;
  const baseUrl = import.meta.env.VITE_BASE_URL.replace(/^http:/, "https:");

  const authToken = import.meta.env.VITE_ADMIN_TOKEN;
  useEffect(() => {
    axios
      .get(`${baseUrl}profile/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setProfileImage(data.profile_image);
        setUsername(data.username);
      })
      .catch((error) => {
        console.error("Error fetching the profile data:", error);
      });
  }, []);

  return (
    <div
      onClick={handleNewsDetail}
      className="card mx-3 h-[406px] bg-white border-s-1 rounded-xl group cursor-pointer"
    >
      <div className="w-full h-[230px] overflow-hidden rounded-t-xl">
        <img
          src={`${endPoint}${image || "default_image_url"}`}
          alt="news"
          className="w-full h-full object-cover rounded-t-xl transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="px-5 py-4 flex flex-col justify-between h-[176px]">
        <div>
          <h3 className="text-lg font-bold line-clamp-2 mb-3 group-hover:text-[#222162]">
            {title || "No Title"}
          </h3>
        </div>
        <div className="flex flex-col gap-3 justify-center">
          <div className="mt-2 flex justify-between text-sm text-gray-500">
            <p className="flex items-center">
              <FaCalendarAlt className="mr-2 w-[12px]" /> {formattedDate}
            </p>
            <p>{formattedViews} views</p>
          </div>
          <div className="flex items-center">
            <img
              src={
                profileImage ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"
              }
              alt="publisher image"
              className="w-[40px] h-[40px] object-cover rounded-full"
            />
            <p className="ml-4 text-md text-gray-800 font-semibold group-hover:text-[#222162]">
              {username || "Unknown User"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
