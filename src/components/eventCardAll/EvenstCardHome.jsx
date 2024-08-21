import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import moment from "moment";
import HeadTags from "./HeadTags";
import { FacebookShareButton } from "react-share";
import { FaRegShareFromSquare } from "react-icons/fa6";

export default function EvenstCardHome({
  title,
  img,
  about,
  date,
  id,
  description,
  slug
}) {
  const endPoint = import.meta.env.VITE_BASE_IMAGE_URL;
  const formattedDate = moment(date).format("YYYY-MM-DD");
  const shareUrl = `${window.location.origin}/eventDetail/${id}`;

  return (
    <>
      <HeadTags
        title={title}
        metaDescription={description}
        ogImage={`${endPoint}${img}`}
      />
      <Link to={`/eventDetail/${id}`}>
        <section className="flex justify-center w-full px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md group">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 lg:w-2/5 overflow-hidden sm:rounded-t-lg md:rounded-l-lg md:rounded-r-none">
                <img
                  src={`${endPoint}${img}`}
                  alt={title}
                  className="h-[260px] w-full transition-transform duration-300 object-cover group-hover:scale-110 rounded-t-lg md:rounded-l-lg md:rounded-r-none"
                />
              </div>

              <div className="w-full md:w-1/2 lg:w-3/5 p-4 flex flex-col justify-between">
                <h5 className="text-xl text-wrap sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 truncate line-clamp-2">
                  {title}
                </h5>
                <p className="text-gray-700 dark:text-gray-400 mb-3 line-clamp-3">
                  {about}
                </p>
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex items-center w-[30px] justify-center text-[#172554] font-bold py-2 rounded-full mb-3 md:mb-0 md:mr-2">
                    <FacebookShareButton
                      url={shareUrl}
                      hashtag="#SportHub"
                      className="Demo__some-network__share-button flex items-center"
                    >
                      <FaRegShareFromSquare className="h-5 w-5" />
                    </FacebookShareButton>
                  </div>
                  <p className="text-gray-700 dark:text-gray-400">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Link>
    </>
  );
}
