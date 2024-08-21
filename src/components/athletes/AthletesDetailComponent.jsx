import { Link } from "react-router-dom";
import logo from "../../assets/SportHubLogo.png";

export default function AthletesDetailComponent({
  image,
  name,
  bio,
  dob,
  pob,
  height,
  how_to_play,
  nationality,
  achievements,
}) {
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
          {name || "មិនមានចំណងជើងព័ត៌មាន"}
        </h1>
        <img
          src={`${endPoint}${
            image ||
            "https://i.pinimg.com/564x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg"
          }`}
          alt="news image"
          className="w-full h-auto object-cover forced-color-adjust-auto rounded-lg mb-2"
        />
        <p className="font-bold text-lg tracking-wider mt-7">
          ថ្ងៃខែឆ្នាំកំណើត: <span className="font-normal">{dob}</span>
        </p>
        <p className="font-bold text-lg tracking-wider leading-9">
          ទីកន្លែងកំណើត: <span className="font-normal">{pob}</span>
        </p>
        <p className="font-bold text-lg tracking-wider leading-9">
          មុខតំណែង: <span className="font-normal">{how_to_play}</span>
        </p>
        <p className="font-bold text-lg tracking-wider	leading-9">
          កម្ពស់: <span className="font-normal">{height}</span>
        </p>
        <p className="font-bold text-lg tracking-wider leading-9">
          សញ្ជាតិ: <span className="font-normal">{nationality}</span>
        </p>
        <p className="text-lg font-normal text-gray-900 leading-loose">
          <span className="font-bold">ជីវប្រវត្តិ: </span>
          <span
            dangerouslySetInnerHTML={{ __html: bio || "មិនមានអត្ថបទ" }}
          ></span>
        </p>

        <p className="text-lg font-normal text-gray-900 leading-loose">
          <span className="font-bold">សមិទ្ធិផល: </span>
          <span
            dangerouslySetInnerHTML={{ __html: achievements || "មិនមានអត្ថបទ" }}
          ></span>
        </p>
      </div>
    </>
  );
}
