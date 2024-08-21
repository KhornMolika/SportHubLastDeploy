import { useLocation } from "react-router-dom";
import HistoryDetailComponent from "../../components/history/HistoryDetailComponent";
import SpringFramework from "../../assets/advertise/Spring​7-Sep-2024.png";
import WebDesign from "../../assets/advertise/Web​V3.png";
import Java from "../../assets/advertise/Java-AUG-2024.png";

export default function HistoryDetail() {
  const location = useLocation();
  const history = location.state;

  return (
    <>
      <main className="bg-slate-100">
        <section className="flex flex-col lg:flex-row w-10/12 justify-end items-start h-auto mx-auto py-24">
          <section className="lg:w-2/3 w-full h-auto pb-5 mt-5 border-b border-b-[#222162]">
            <HistoryDetailComponent
              image={history.thumbnail}
              title={history.title}
              body={history.body}
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
                    src={SpringFramework}
                    alt="advertisement"
                    className="rounded-lg w-full h-auto block"
                  />
                </a>
              </div>
              <div className="w-full lg:w-[75%] mx-auto h-auto cursor-pointer rounded-lg overflow-hidden">
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
              <div className="w-full lg:w-[75%] mx-auto h-auto cursor-pointer rounded-lg overflow-hidden">
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
