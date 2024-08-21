import React from "react";
import { Link } from "react-router-dom";
import PlaceHolder from "../../assets/placeholder.jpeg";
import Makara from "../../assets/teamMember/IMG_8478.jpg";
import Porkeat from "../../assets/teamMember/IMG_8472.jpg";
import Molika from "../../assets/teamMember/IMG_8509.jpg";
import SreyPhea from "../../assets/teamMember/IMG_8522.jpg";
import Phallin from "../../assets/teamMember/IMG_8466.jpg";
import Neasa from "../../assets/teamMember/IMG_8469.jpg";
import Phara from "../../assets/teamMember/IMG_8501.jpg";
import Theavy from "../../assets/teamMember/IMG_8513.jpg";
import Ratana from "../../assets/teamMember/IMG_8531.jpg";
import SunLy from "../../assets/teamMember/IMG_8487.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const memberData = [
  {
    name: "មួក ​មករា",
    position: "ប្រធានក្រុម",
    image: Makara,
    socialMedia: {
      github: "https://github.com/MoukMakara",
      facebook:
        "https://www.facebook.com/profile.php?id=100081203739484&mibextid=kFxxJD",
      telegram: "https://t.me/MakaraMouk",
    },
  },
  {
    name: "សេង ប៉ូគៀត",
    position: "សមាជិកក្រុម",
    image: Porkeat,
    socialMedia: {
      github: "https://github.com/SengPorkeat",
      facebook: "https://www.facebook.com/profile.php?id=61554036325891",
      telegram: "https://t.me/porkeat",
    },
  },
  {
    name: "ដា ផារ៉ា",
    position: "សមាជិកក្រុម",
    image: Phara,
    socialMedia: {
      github: "https://github.com/DaPhara",
      facebook: "https://www.facebook.com/ahra.krkzin?mibextid=LQQJ4d",
      telegram: "https://t.me/Ye_Qie23",
    },
  },
  {
    name: "សាន់ នៀសា",
    position: "សមាជិកក្រុម",
    image: Neasa,
    socialMedia: {
      github: "https://github.com/Sanneasa168",
      facebook: "https://www.facebook.com/bouy.nong.35?mibextid=LQQJ4d",
      telegram: "https://t.me/San_Neasa",
    },
  },
  {
    name: "សៀន ស៊ុនលី",
    position: "សមាជិកក្រុម",
    image: SunLy,
    socialMedia: {
      github: "https://github.com/seansunly",
      facebook: "https://www.facebook.com/sean.sunly.3?mibextid=LQQJ4d",
      telegram: "https://t.me/sean_sunly",
    },
  },
  {
    name: "ថោង ស្រីភា",
    position: "សមាជិកក្រុម",
    image: SreyPhea,
    socialMedia: {
      github: "https://github.com/Srey-phea",
      facebook: "https://www.facebook.com/thaong.sreyphea.73?mibextid=ZbWKwL",
      telegram: "https://t.me/Phea_004",
    },
  },
  {
    name: "ខន ម៉ូលីកា",
    position: "សមាជិកក្រុម",
    image: Molika,
    socialMedia: {
      github: "https://github.com/KhornMolika",
      facebook: "https://www.facebook.com/daffoshida?mibextid=JRoKGi",
      telegram: "https://t.me/khornmolika",
    },
  },
  {
    name: "ស៊ូ ផល្លីន",
    position: "សមាជិកក្រុម",
    image: Phallin,
    socialMedia: {
      github: "https://github.com/souphallin",
      facebook: "https://www.facebook.com/phallin.love.505?mibextid=kFxxJD",
      telegram: "https://t.me/Sou_Lin",
    },
  },
  {
    name: "សុខ សុធាវី",
    position: "សមាជិកក្រុម",
    image: Theavy,
    socialMedia: {
      github: "https://github.com/soksotheavy",
      facebook: "https://www.facebook.com/sotheavy.sok.77?mibextid=LQQJ4d",
      telegram: "https://t.me/Sotheavy_99",
    },
  },
  {
    name: "កែវ រតនា",
    position: "សមាជិកក្រុម",
    image: Ratana,
    socialMedia: {
      github: "https://github.com/ChingChangTT",
      facebook:
        "https://www.facebook.com/profile.php?id=100092272211823&mibextid=ZbWKwL",
      telegram: "https://t.me/callmemoonna",
    },
  },
];

const UserCardComponent = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 justify-center py-20">
      {memberData.map((member, index) => (
        <UserCard
          key={index}
          name={member.name}
          position={member.position}
          image={member.image}
          socialMedia={member.socialMedia}
        />
      ))}
    </div>
  );
};

export function UserCard({
  name,
  position,
  image,
  socialMedia: { github, facebook, telegram },
}) {
  return (
    <section className="flex justify-center">
      <div className="h-[230px] w-[205px] flex justify-center items-center relative">
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] border-l-[3px] border-b-[3px] border-white"></div>
        <div
          data-aos="zoom-in"
          className="h-[218px] w-[193px] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#172554] transform origin-bottom-left -z-20"></div>
          <div className="z-50 flex justify-center items-center h-full">
            <div className="text-center">
              <img
                src={image || PlaceHolder}
                alt={name}
                className="h-[120px] w-[120px] object-cover rounded-full border-4"
              />
              <h4 className="font-bold text-lg mt-2">{name || "មិនស្គាល់"}</h4>
              <p className="text-base my-1">{position || "ទាត់ខ្យល់"}</p>
              <div className="flex justify-center text-base gap-2">
                {github && (
                  <a
                    href={github}
                    className="fa-brands fa-github"
                    target="_blank"
                    aria-label="GitHub"
                  ></a>
                )}
                {facebook && (
                  <a
                    href={facebook}
                    className="fa-brands fa-facebook"
                    target="_blank"
                    aria-label="Facebook"
                  ></a>
                )}
                {telegram && (
                  <a
                    href={telegram}
                    className="fa-brands fa-telegram"
                    target="_blank"
                    aria-label="Telegram"
                  ></a>
                )}
              </div>
            </div>
          </div>
          <div className="absolute w-[700px] inset-0 bg-white transform rotate-[30deg] mt-5 origin-top-left -z-10"></div>
        </div>
      </div>
    </section>
  );
}

export default UserCardComponent;
