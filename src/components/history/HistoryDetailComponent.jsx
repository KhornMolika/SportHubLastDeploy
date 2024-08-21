import { Link } from "react-router-dom";
import logo from "../../assets/SportHubLogo.png";

export default function HistoryDetailComponent({ image, title, body }) {
  const endPoint = import.meta.env.VITE_BASE_IMAGE_URL;
  return (
    <>
      <div className=" w-full h-auto">
        <div className="flex flex-row justify-start items-center">
          <Link to="/">
            <img src={logo} alt="logo" className="h-7" />
          </Link>
          <Link to="/history">
            <h3 className="text-xl text-[#222162] font-semibold my-5">
              <span className=" text-2xl text-red-800 px-2">|</span>
              ប្រវត្តិកីឡា
            </h3>
          </Link>
        </div>
        <h1 className="text-center text-2xl md:text-3xl text-[#222162] font-bold leading-normal mb-8">
          {title || "មិនមានចំណងជើងព័ត៌មាន"}
        </h1>
        <img
          src={`${endPoint}${
            image ||
            "https://i.pinimg.com/564x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg"
          }`}
          alt="news image"
          className="w-full h-auto object-cover forced-color-adjust-auto rounded-lg mb-5"
        />
        <p
          className="text-lg text-gray-900 leading-loose"
          dangerouslySetInnerHTML={{ __html: body || "មិនមានអត្ថបទ" }}
        ></p>
      </div>
    </>
  );
}
