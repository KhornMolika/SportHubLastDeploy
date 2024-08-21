import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/SportHubLogo.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { getAccessToken } from "../../lib/secureLocalStorage.js";
import UserProfile from "../userProfile/UserProfile.jsx";
import { PiMapPinAreaBold } from "react-icons/pi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import axios from "axios";

export function NavBarComponent() {
  const [navbarList, setNavbarList] = useState([
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
      name: "អំពីយើង",
      path: "/about-us",
      active: false,
    },
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(getAccessToken())
  );

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (
      location.pathname === "/view-profile" ||
      location.pathname === "/user-detail"
    ) {
      navigate("/");
    }
  };

  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef(null);
  const menuButtonRef = useRef(null); // Ref for the menu button

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const endPoint = import.meta.env.VITE_SPORT_URL;

  const fetchAllSportClubs = async () => {
    let allData = [];
    let url = `${baseUrl}${endPoint}`;

    while (url) {
      url = url.replace(/^http:/, "https:");
      try {
        const response = await axios.get(url);
        const data = response.data;
        allData = [...allData, ...data.results];
        url = data.next;
      } catch (error) {
        console.error("There was an error fetching the data!", error);
        url = null;
      }
    }

    setAPIData(allData);
  };

  useEffect(() => {
    fetchAllSportClubs();
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = APIData.filter((item) =>
        item.sport_name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  const handleClick = (item) => {
    setNavbarList((lists) => {
      return lists.map((list) => {
        if (list.name === item.name) {
          return {
            ...list,
            active: true,
          };
        } else {
          return {
            ...list,
            active: false,
          };
        }
      });
    });
    setIsNavOpen(false);
  };

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (
      location.pathname === "/view-profile" ||
      location.pathname === "/map" ||
      location.pathname === "/"
    ) {
      setNavbarList((lists) =>
        lists.map((list) => ({
          ...list,
          active: false,
        }))
      );
    }
  }, [location.pathname]);

  const handleSearchItemClick = (item) => {
    navigate("/sportclub-details", { state: item });
    setSearchInput("");
  };

  const renderProfileSection = () => {
    if (isAuthenticated) {
      return <UserProfile onLogout={handleLogout} />;
    }
    return (
      <Link
        to="/login"
        className="bg-[#172554] text-white py-2 px-5 rounded-full font-extrabold"
      >
        ចូល
      </Link>
    );
  };

  const handleNavToggle = () => {
    setIsNavOpen((prevIsNavOpen) => !prevIsNavOpen);
  };

  const handleClickOutside = (event) => {
    if (
      navRef.current &&
      !navRef.current.contains(event.target) &&
      !menuButtonRef.current.contains(event.target)
    ) {
      setIsNavOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="fixed w-full top-0 z-50 bg-white border-b border-gray-200">
      <div className="w-11/12 mx-auto">
        <nav className="flex items-center justify-between py-4">
          <Link to="/">
            <img
              className="w-[40px] cursor-pointer"
              src={logo}
              alt="SportHub Logo"
            />
          </Link>

          <div className="flex-1 hidden lg:flex items-center justify-center space-x-6 xl:ml-32">
            {navbarList.map((list, index) => (
              <Link
                onClick={() => handleClick(list)}
                to={list.path}
                key={index}
                className={`font-semibold px-4 py-2 ${
                  list.active
                    ? "text-[#172554] border-b-2 border-[#172554]"
                    : "text-black border-b-2 border-transparent"
                } hover:border-[#172554] hover:text-[#172554] transition-all duration-300`}
              >
                {list.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="relative hidden lg:block">
              <PiMapPinAreaBold
                onClick={() => navigate("/map")}
                className="absolute top-1/2 ml-1 transform -translate-y-1/2 left-3 text-2xl cursor-pointer"
              />
              <input
                type="text"
                placeholder="ស្វែងរកក្លឹបកីឡា"
                onChange={(e) => searchItems(e.target.value)}
                value={searchInput}
                className="pl-12 pr-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <FaMagnifyingGlass className="absolute top-1/2 transform -translate-y-1/2 right-4 text-base" />
              {searchInput && (
                <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-2xl shadow-lg max-h-60 overflow-y-auto z-10">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSearchItemClick(item)}
                      >
                        {item.sport_name}
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-gray-500">រកមិនឃើញលទ្ធផល</div>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {renderProfileSection()}
              <button
                ref={menuButtonRef} // Add ref to menu button
                className="block lg:hidden text-black focus:ring-0"
                onClick={handleNavToggle}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>

        <div
          ref={navRef}
          id="navbar-collapse"
          className={`lg:hidden space-y-4 py-4 px-4 border-t border-gray-200 ${
            isNavOpen ? "flex flex-col" : "hidden"
          }`}
        >
          <div className="relative w-full mx-auto">
            <input
              type="text"
              placeholder="Search Sport Club"
              onChange={(e) => searchItems(e.target.value)}
              value={searchInput}
              className="pl-12 pr-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
            />
            <PiMapPinAreaBold
              onClick={() => navigate("/map")}
              className="absolute top-1/2 ml-1 transform -translate-y-1/2 left-3 text-2xl cursor-pointer"
            />
            <FaMagnifyingGlass className="absolute top-1/2 transform -translate-y-1/2 right-4 text-base" />
            {searchInput && (
              <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-2xl shadow-lg max-h-60 overflow-y-auto z-10">
                {filteredResults.length > 0 ? (
                  filteredResults.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSearchItemClick(item)}
                    >
                      {item.sport_name}
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-gray-500">No results found</div>
                )}
              </div>
            )}
          </div>
          {navbarList.map((list, index) => (
            <Link
              onClick={() => handleClick(list)}
              to={list.path}
              key={index}
              className={`font-semibold px-4 py-2 ${
                list.active
                  ? "text-[#172554] border-b-2 border-[#172554]"
                  : "text-black border-b-2 border-transparent"
              } hover:border-[#172554] hover:text-[#172554] transition-all duration-300`}
            >
              {list.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NavBarComponent;
