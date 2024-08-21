import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer } from "flowbite-react";
import sportHub from "../../assets/SportHubLogo.png";
import sportHubWhite from "../../assets/NavBarLogo.png";
import logo from "../../assets/04.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

export function FooterComponent() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });
  const [footerList, setFooterList] = useState([
    {
      name: "ទំព័រដើម",
      path: "/",
      active: false,
    },
    {
      name: "អំពីយើង",
      path: "/about-us",
      active: false,
    },
    {
      name: "ក្លឹបកីឡា",
      path: "/sport-club",
      active: false,
    },
    {
      name: "ព្រឹត្តិការណ៍",
      path: "/event-home",
      active: false,
    },
    {
      name: "ព័ត៌មាន",
      path: "/news",
      active: false,
    },
    {
      name: "ប្រវត្តិកីឡា",
      path: "/history",
      active: false,
    },
    {
      name: "តេលេក្រាម",
      active: false,
    },
    {
      name: "លេខទូរសព្ទ",
      active: false,
    },
    {
      name: "អីម៉ែល",
      active: false,
    },
  ]);

  const handleClick = (item) => {
    setFooterList((lists) =>
      lists.map((list) =>
        list.name === item.name
          ? { ...list, active: true }
          : { ...list, active: false }
      )
    );
  };

  const titlesList = [
    { title: "ស្វែងរក", startIndex: 0, endIndex: 3 },
    { title: "ផ្សេងៗ", startIndex: 3, endIndex: 6 },
    { title: "ទំនាក់ទំនង", startIndex: 6, endIndex: 9 },
  ];

  return (
    <section className="w-full h-auto">
      <div className="relative flex items-center justify-center h-[400px] large:h-[750px]">
        <img
          src={logo}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#172554] opacity-80"></div>
        <div className="relative text-center text-white p-4 ">
          <h1 data-aos="zoom-in-up" className="text-5xl font-bold mb-4">
            ស្វែងរកកីឡាផ្សេងទៀត
          </h1>
          <p data-aos="zoom-in" className="text-xl mb-6">
            ស្វែងរកកីឡាផ្សេងៗទៀតជាច្រើននៅប្រទេសកម្ពុជា!
          </p>
          <Link to="/sport-club">
            <button
              data-aos="zoom-in"
              className="px-24 py-2 bg-white text-[16px] text-black font-semibold rounded-md"
            >
              ចូលទៅកាន់ !
            </button>
          </Link>
        </div>
      </div>
      <Footer className="bg-[#172554] rounded-none">
        <div className="w-full text-white">
          <hr className="md:mt-14 mt-0 text-white " />
          <div className="p-10 mt-8 container mx-auto py-10 md:py-12 mb-10 flex flex-col gap-8 md:gap-6 md:flex-row md:justify-between text-center">
            <div className="grid grid-cols-3 gap-8 sm:gap-6 lg:gap-20">
              {titlesList.map((column, columnIndex) => (
                <div key={columnIndex}>
                  <h4 className="text-lg font-semibold mb-4 underline">
                    {column.title}
                  </h4>
                  <Footer.LinkGroup col>
                    {footerList
                      .slice(column.startIndex, column.endIndex)
                      .map((item, index) => (
                        <Link
                          to={item.path}
                          key={index}
                          onClick={() => handleClick(item)}
                          className={`block py-1 hover:text-blue-500 text-white`}
                        >
                          {item.name}
                        </Link>
                      ))}
                  </Footer.LinkGroup>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 text-center">
              <img
                src={sportHubWhite}
                className="w-full max-w-[120px] mx-auto object-cover md:mx-0"
                alt="SportHub Logo"
              />
            </div>
          </div>
          <hr className="my-4 text-white" />
          <div className="px-10 container mx-auto flex flex-col gap-4 sm:flex-row sm:items-center justify-center text-white py-2 mb-1 text-center">
            <div>
              <p className="text-[12px] text-gray-400">
                © 2024 Copyright SportHub by{" "}
                <a
                  href="https://www.istad.co/"
                  target="_blank"
                  className="underline hover:text-white"
                >
                  ISTAD
                </a>
                . All Rights Reserved.
              </p>
            </div>
            {/* <div className="flex gap-5 text-[12px] items-center text-gray-400 justify-center sm:justify-start">
              <p>Privacy policy</p>
              <p>Terms & conditions</p>
            </div> */}
          </div>
        </div>
      </Footer>
    </section>
  );
}
