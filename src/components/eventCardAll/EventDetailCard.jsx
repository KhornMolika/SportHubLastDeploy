import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/SportHubLogo.png";
import moment from "moment";

export default function EventDetailCard({
  slug,
  title,
  img,
  about,
  date,
  description,
  id,
}) {
  const endPoint = import.meta.env.VITE_BASE_IMAGE_URL;
  const formattedDate = moment(date).format("YYYY-MM-DD");
  return (
    <>
      <div className=" w-full h-auto mt-28">
        <div className="flex flex-row justify-start items-center">
          <Link to="/">
            <img src={logo} alt="logo" className="h-7" />
          </Link>
          <Link to="/event-home">
            <h3 className="text-xl text-[#222162] font-semibold my-5">
              <span className=" text-2xl text-red-800 px-2">|</span>
              ព្រឹត្តិការណ៍
            </h3>
          </Link>
        </div>
        <h1 className="text-xl md:text-3xl text-[#222162] font-bold leading-normal">
          {title || "មិនមានចំណងជើងព័ត៌មាន"}
        </h1>
        <p className="flex items-center text-gray-500 text-sm py-5">
          {formattedDate}
        </p>
        <div className="pb-5 flex justify-center ">
          <img
            src={`${endPoint}${
              img ||
              "https://i.pinimg.com/564x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg"
            }`}
            alt="news image"
            className="w-auto h-auto object-cover forced-color-adjust-auto rounded-lg "
          />
        </div>
        <p
          className="text-lg text-gray-900 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description || "មិនមានអត្ថបទ" }}
        ></p>

        <p className="text-md text-blue-700 hover:text-blue-800 font-normal pt-5">
          ប្រភព​ ៖​ Sabay News
        </p>
      </div>
    </>
  );
}
