import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  seleteAllEvents,
  fetchevents,
} from "../../redux/feature/eventSlice/eventSlices";
import EvenstCardHome from "../../components/eventCardAll/EvenstCardHome";
import EventLoadingCard from "../../components/eventCardAll/EventLoadingCard"; // Import the loading card
import AOS from "aos";
import "aos/dist/aos.css";
import Logo from "../../assets/SportHubLogo.png";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Hero from "../../assets/eventsPage/events2.jpg";

export default function EventHome() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  const events = useSelector(seleteAllEvents);
  const status = useSelector((state) => state.event.status); // Get the status from Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchevents());
  }, [dispatch]);

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
          <meta property="og:title" content="SportHubEvent" />
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
                <h1 data-aos="zoom-in" className="text-[56px]">
                  ព្រឹត្តិការណ៍កីឡា
                </h1>
                <h5
                  data-aos="zoom-in-up"
                  className="w-full max-w-[800px] mx-auto text-white font-bold dark:text-white pt-2 text-base md:text-lg lg:text-xl"
                >
                  Sport Hub
                  បង្កើតភាពងាយស្រួល​អ្នកប្រើប្រាស់ក្នុងការស្វែងរកព្រឹត្តិការណ៍កីឡាថ្មីៗ{" "}
                  <br />
                  អំពីកីឡារ​ ​​ប្រកបទៅដោយទំនុកចិត្តសម្រាប់អ្នកស្រឡាញ់កីឡា។
                </h5>
              </div>
            </div>
          </div>
        </header>
        <section className="bg-slate-100 pt-14 pb-2">
          <div className="mb-24">
            {status === "loading" ? (
              <EventLoadingCard />
            ) : (
              events.map((event, index) => (
                <div key={index} className="flex justify-center my-5">
                  <div>
                    <EvenstCardHome
                      slug={event.slug}
                      title={event.title}
                      img={event.thumbnail}
                      about={event.about}
                      date={event.date}
                      description={event.description}
                      id={event.id}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </HelmetProvider>
    </>
  );
}
