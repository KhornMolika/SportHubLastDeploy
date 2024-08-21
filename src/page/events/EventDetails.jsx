import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetcheventsssById } from "../../redux/feature/eventSlice/eventSlices";
import { useParams } from "react-router-dom";
import EventDetailCard from "../../components/eventCardAll/EventDetailCard";
import SpringFramework from "../../assets/advertise/Spring​7-Sep-2024.png";
import WebDesign from "../../assets/advertise/Web​V3.png";
import Java from "../../assets/advertise/Java-AUG-2024.png";
import AOS from "aos";
import "aos/dist/aos.css";

export default function EventDetails() {
  const param = useParams();
  const seletByid = useSelector((state) => state?.event?.eventId);

  const dispachaaa = useDispatch();
  useEffect(() => {
    dispachaaa(fetcheventsssById(param.id));
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  return (
    <>
      <main className="bg-slate-100 overflow-x-hidden">
        <section className="flex flex-col lg:flex-row w-10/12 justify-end items-start h-auto mx-auto ">
          <section className="lg:w-2/3 w-full h-auto pb-5 mt-2 border-b border-b-[#222162]">
            <EventDetailCard
              slug={seletByid.slug}
              title={seletByid.title}
              img={seletByid.thumbnail}
              about={seletByid.about}
              date={seletByid.date}
              description={seletByid.description}
              id={seletByid.id}
            />
          </section>
          <section className="lg:w-1/3 w-full h-auto relative lg:mt-0 mb-4 mt-4">
            <section className="lg:absolute top-[160px] flex flex-row lg:flex-col gap-5">
              <div
                data-aos="fade-down"
                className="w-full lg:w-[75%] mx-auto h-auto cursor-pointer rounded-lg overflow-hidden"
              >
                <a
                  href="https://www.facebook.com/share/p/Jfre9QVzatKJBvXR/"
                  target="_blank"
                  className="block w-full h-full"
                >
                  <img
                    src={SpringFramework}
                    alt="advertisement"
                    className="rounded-lg w-full h-auto block"
                  />
                </a>
              </div>
              <div
                data-aos="fade-down"
                className="w-full lg:w-[75%] mx-auto h-auto cursor-pointer rounded-lg overflow-hidden"
              >
                <a
                  href="https://www.facebook.com/share/p/Nfz79nVWttFcbmDt/"
                  target="_blank"
                  className="block w-full h-full"
                >
                  <img
                    src={WebDesign}
                    alt="advertisement"
                    className="rounded-lg w-full h-auto block"
                  />
                </a>
              </div>
              <div
                data-aos="fade-down"
                className="w-full lg:w-[75%] mx-auto h-auto cursor-pointer rounded-lg overflow-hidden"
              >
                <a
                  href="https://www.facebook.com/share/p/4bvXMQrAgvN8JXhW/"
                  target="_blank"
                  className="block w-full h-full"
                >
                  <img
                    src={Java}
                    alt="advertisement"
                    className="rounded-lg w-full h-auto block"
                  />
                </a>
              </div>
            </section>
          </section>
        </section>
      </main>
    </>
  );
}
