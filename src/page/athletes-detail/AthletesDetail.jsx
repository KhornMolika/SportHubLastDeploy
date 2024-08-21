import { useLocation } from "react-router-dom";
import AthletesDetailComponent from "../../components/athletes/AthletesDetailComponent";
import SringFramework from "../../assets/advertise/Spring​7-Sep-2024.png";
import WebDesign from "../../assets/advertise/Web​V3.png";
import Java from "../../assets/advertise/Java-AUG-2024.png";

export default function AthletesDetail() {
  const location = useLocation();
  const athletes = location.state;


  return (
    <>
      <main className="bg-slate-100">
        <section className="flex flex-col lg:flex-row w-10/12 justify-end items-start h-auto mx-auto py-24">
          <section className="lg:w-2/3 w-full h-auto pb-5 mt-5 border-b border-b-[#222162]">
            <AthletesDetailComponent
              image={athletes.image}
              name={athletes.name}
              bio={athletes.biography}
              dob={athletes.dob}
              pob={athletes.pob}
              height={athletes.height}
              how_to_play={athletes.how_to_play}
              nationality={athletes.nationality}
              achievements={athletes.achievements}
            />
          </section>
          <section className="lg:w-1/3 w-full h-auto relative lg:mt-0 mt-10">
            <section className="lg:absolute top-[160px] flex flex-row lg:flex-col gap-5">
              <div className="w-full lg:w-[75%] mx-auto h-auto cursor-pointer rounded-lg overflow-hidden">
                <a
                  href="https://www.facebook.com/share/p/Jfre9QVzatKJBvXR/"
                  target="_blank"
                  className="block w-full h-full"
                >
                  <img
                    src={SringFramework}
                    alt="advertisement"
                    className="rounded-lg w-full h-auto block"
                  />
                </a>
              </div>
              <div className="w-full lg:w-[75%] mx-auto h-auto cursor-pointer rounded-lg overflow-hidden">
                <a
                  href="https://www.facebook.com/share/p/N2CX63TYUpmZ8Adj/"
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
              <div className="w-full lg:w-[75%] mx-auto h-auto cursor-pointer rounded-lg overflow-hidden">
                <a
                  href="https://www.facebook.com/share/p/N2CX63TYUpmZ8Adj/"
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
