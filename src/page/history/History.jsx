import React, { useEffect } from "react";
import Hero from "../../assets/historyPage/history.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContents,
  selectHistoryOfBasketball,
  selectHistoryOfBokator,
  selectHistoryOfFootball,
  selectHistoryOfKunKhmer,
  selectHistoryOfVolleyball,
} from "../../redux/feature/content/contentSlice";
import { useNavigate } from "react-router-dom";
import HistoryComponent from "../../components/history/HistoryComponent.jsx";
import AthletesComponent from "../../components/athletes/AthletesComponent.jsx";
import {
  selectAllAthletes,
  fetchAthletes,
} from "../../redux/feature/athletes/athletesSlice";
import HistoryLoadingCard from "../../components/history/HistoryLoadingCard";
import AOS from "aos";
import "aos/dist/aos.css";
import Logo from "../../assets/SportHubLogo.png";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function History() {
  const football = useSelector(selectHistoryOfFootball);
  const volleyball = useSelector(selectHistoryOfVolleyball);
  const basketball = useSelector(selectHistoryOfBasketball);
  const bokator = useSelector(selectHistoryOfBokator);
  const kun_khmer = useSelector(selectHistoryOfKunKhmer);
  const athletes = useSelector(selectAllAthletes);

  const contentStatus = useSelector((state) => state.content.status);
  const athletesStatus = useSelector((state) => state.athlete.status);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  useEffect(() => {
    dispatch(fetchAthletes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchContents());
  }, [dispatch]);

  const handleHistoryDetail = (history) => {
    navigate("/history-detail", { state: history });
  };

  const handleAthletesDetail = (athlete) => {
    navigate("/athletes-detail", { state: athlete });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>SportHub</title>
          <meta
            name="description"
            content="SportHub - Your ultimate destination for sports clubs and activities."
          />
          <meta
            name="keywords"
            content="sports, clubs, activities, SportHub, fitness, workouts, athletic clubs, local sports, team sports, individual sports, recreational activities, sport events, sports community, sports enthusiasts, sports leagues, exercise, health and fitness, gym memberships, personal training, sports coaching, sports training, outdoor sports, indoor sports, youth sports, adult sports, sports programs, sports facilities, sports nutrition, sports gear, sport tournaments, sports tournaments, sport camps, fitness classes, wellness, physical fitness, sports news, sports updates, sports schedules"
          />

          <meta name="author" content="SportHub Team" />
          <meta property="og:title" content="SportHub" />
          <meta
            property="og:description"
            content="Find and join sports clubs and activities near you with SportHub."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.sporthub.com" />
          <meta property="og:image" content={Logo} />
        </Helmet>
        <header className="relative">
          <img
            className="object-cover h-[585px] w-full top-0 -z-30"
            src={Hero}
            alt="Background image description"
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
          />
          <div className="w-10/12 mx-auto">
            <div className="absolute top-[330px] text-white font-extrabold">
              <div className="inline-block">
                <h1
                  data-aos="zoom-in"
                  className="text-[34px] md:text-[48px] lg:text-[56px]"
                >
                  ប្រវត្តិនៃកីឡា
                </h1>
                <h5
                  data-aos="zoom-in-up"
                  className="w-full max-w-[800px] mx-auto text-white font-bold pt-4 dark:text-white text-base md:text-lg lg:text-xl"
                >
                  Sport Hub
                  បង្កើតភាពងាយស្រួល​អ្នកប្រើប្រាស់ក្នុងការស្វែងយល់ពីប្រវត្តិរបស់កីឡានីមួយៗ​{" "}
                  <br />
                  ​​ប្រកបទៅដោយទំនុកចិត្តសម្រាប់អ្នកស្រឡាញ់កីឡា។
                </h5>
              </div>
            </div>
          </div>
        </header>

        <section className="flex justify-center items-center flex-col gap-5 mx-auto bg-slate-200 py-10">
          {/* History Sections */}
          {contentStatus === "Loading" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, index) => (
                <HistoryLoadingCard key={index} />
              ))}
            </div>
          ) : (
            <>
              {football.length > 0 && (
                <section className="mb-10">
                  <h1
                    data-aos="zoom-in"
                    className="text-center text-4xl text-gray-900 font-bold mb-8 hover:text-[#172554]"
                  >
                    ប្រវត្តិនៃកីឡាបាល់បាត់
                  </h1>
                  <div
                    data-aos="fade-up"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                  >
                    {football.map((history, index) => (
                      <HistoryComponent
                        key={index}
                        title={history.title}
                        image={history.thumbnail}
                        body={history.body}
                        onClick={() => handleHistoryDetail(history)}
                      />
                    ))}
                  </div>
                </section>
              )}
              {volleyball.length > 0 && (
                <section className="mb-10">
                  <h1
                    data-aos="zoom-in"
                    className="text-center text-4xl text-gray-900 font-bold mb-8 hover:text-[#172554]"
                  >
                    ប្រវត្តិនៃកីឡាបាល់ទះ
                  </h1>
                  <div
                    data-aos="fade-up"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                  >
                    {volleyball.map((history, index) => (
                      <HistoryComponent
                        key={index}
                        title={history.title}
                        image={history.thumbnail}
                        body={history.body}
                        onClick={() => handleHistoryDetail(history)}
                      />
                    ))}
                  </div>
                </section>
              )}
              {basketball.length > 0 && (
                <section className="mb-10">
                  <h1
                    data-aos="zoom-in"
                    className="text-center text-4xl text-gray-900 font-bold mb-8 hover:text-[#172554]"
                  >
                    ប្រវត្តិនៃកីឡាបាល់បោះ
                  </h1>
                  <div
                    data-aos="fade-up"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                  >
                    {basketball.map((history, index) => (
                      <HistoryComponent
                        key={index}
                        title={history.title}
                        image={history.thumbnail}
                        body={history.body}
                        onClick={() => handleHistoryDetail(history)}
                      />
                    ))}
                  </div>
                </section>
              )}
              {kun_khmer.length > 0 && (
                <section className="mb-10">
                  <h1
                    data-aos="zoom-in"
                    className="text-center text-4xl text-gray-900 font-bold mb-8 hover:text-[#172554]"
                  >
                    ប្រវត្តិនៃប្រដាល់គុនខ្មែរ
                  </h1>
                  <div
                    data-aos="fade-up"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                  >
                    {kun_khmer.map((history, index) => (
                      <HistoryComponent
                        key={index}
                        title={history.title}
                        image={history.thumbnail}
                        body={history.body}
                        onClick={() => handleHistoryDetail(history)}
                      />
                    ))}
                  </div>
                </section>
              )}
              {bokator.length > 0 && (
                <section className="mb-10">
                  <h1
                    data-aos="zoom-in"
                    className="text-center text-4xl text-gray-900 font-bold mb-8 hover:text-[#172554]"
                  >
                    ប្រវត្តិនៃគុនល្បុក្កតោ
                  </h1>
                  <div
                    data-aos="fade-up"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                  >
                    {bokator.map((history, index) => (
                      <HistoryComponent
                        key={index}
                        title={history.title}
                        image={history.thumbnail}
                        body={history.body}
                        onClick={() => handleHistoryDetail(history)}
                      />
                    ))}
                  </div>
                </section>
              )}
              {athletesStatus === "Loading" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[...Array(3)].map((_, index) => (
                    <HistoryLoadingCard key={index} />
                  ))}
                </div>
              ) : (
                <section className="mb-10">
                  <h1
                    data-aos="zoom-in"
                    className="text-center text-4xl text-gray-900 font-bold mb-8 hover:text-[#172554]"
                  >
                    ប្រវត្តិនៃកីឡាករ
                  </h1>
                  <div
                    data-aos="fade-up"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                  >
                    {athletes.map((athlete, index) => (
                      <AthletesComponent
                        key={index}
                        name={athlete.name}
                        image={athlete.image}
                        nationality={athlete.nationality}
                        onClick={() => handleAthletesDetail(athlete)}
                      />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </section>
      </HelmetProvider>
    </>
  );
}
