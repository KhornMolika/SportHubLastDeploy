import React from "react";

export default function HistoryComponent({ image, title, body, onClick }) {
  const endPoint = import.meta.env.VITE_BASE_IMAGE_URL;
  return (
    <>
      <section onClick={onClick} className="w-[310px] h-[350px] ">
        <div className="w-full h-full relative max-w-lg overflow-hidden bg-cover bg-no-repeat rounded-md shadow-md cursor-pointer group">
          <img
            className="w-full h-full object-cover"
            src={`${endPoint}${image}`}
            alt="Lourvre"
          />
          <div className="absolute bottom-0 text-center w-full px-2 overflow-hidden bg-white transition-all duration-500 ease-in-out h-[50px] group-hover:h-[85px] group-hover:text-[#172554]">
            <h1 className="text-xl font-bold my-2 line-clamp-1">{title}</h1>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
              <p
                className="text-[16px] font-bold line-clamp-1"
                dangerouslySetInnerHTML={{ __html: body || "មិនមានអត្ថបទ" }}
              ></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
