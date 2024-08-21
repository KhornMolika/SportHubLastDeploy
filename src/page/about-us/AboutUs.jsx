import React from "react";
import BgMentor from "../../assets/MentorBG-01.png";
import BgMember from "../../assets/BG-01.jpg";
import UserCardComponent from "../../components/userCard/UserCardComponent";
import MentorOne from "../../assets/mentors/MrChayya.JPG";
import MentorTwo from "../../assets/mentors/MsJessica.JPG";
import TeamSportHub from "../../assets/teamMember/IMG_8539.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Logo from "../../assets/SportHubLogo.png";

export default function AboutUs() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });
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
        <header>
          <section className="relative bg-[#23305d] h-[600px] -z-50">
            <div className="w-11/12 mx-auto z-40 lg:w-10/12">
              <div className="flex flex-col lg:flex-row absolute top-[50px] lg:top-[130px] gap-5 lg:gap-10 items-center justify-center">
                <div className="h-[368px] w-full lg:w-[522px] flex justify-center items-center relative pt-4 pr-4">
                  <div className="absolute top-0 right-0 w-[95%] h-[80%] border-r-[10px] border-t-[10px] border-[#172554]"></div>
                  <img
                    data-aos="fade-right"
                    src={TeamSportHub}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-white text-center lg:text-left">
                  <h1
                    data-aos="zoom-in"
                    className="text-4xl lg:text-6xl font-extrabold mb-3 lg:mb-5"
                  >
                    អំពីយើង
                  </h1>
                  <p
                    data-aos="fade-left"
                    className="w-full lg:w-[650px] leading-7 text-[16px] lg:text-[20px]"
                  >
                    Sport Hub ជា Website
                    ដែលជាបណ្តុំនៃពត៌មាននិងទិន្នន័យអំពីកីឡាដែលបានបង្កើតឡើងដោយពួកយើងដែលជាក្រុមនិស្សិតនៃមជ្ឈមណ្ឌលអភិវឌ្ឍន៍វិទ្យាសាស្ត្រ
                    និងបច្ចេកវិទ្យាកម្រិតខ្ពស់ (CSTAD)។ CSTAD
                    គឺជាមជ្ឈមណ្ឌលដែលបណ្តុះចំណេះដឹងផ្នែកបច្ចេកវិទ្យាកម្រិតខ្ពស់និងមានឈ្មោះបោះសម្លេងនៅប្រទេសកម្ពុជា។
                    ក្រុមរបស់យើងគឺផ្តោតសំខាន់ទៅលើការជួយសម្រួលភាពងាយស្រួលរបស់អ្នកប្រើប្រាស់របស់យើង
                    ក៏ដូចជាអ្នកដែលចូលចិត្តវិស័យកីឡានៅប្រទេសកម្ពុជាដើម្បីឲ្យពួកគេកាន់តែមានភាពងាយស្រួលជាងមុនក្នុងការស្វែងរកពត៌មានអំពីកីឡា។
                    Sport Hub នៅពេលនេះគឺជា Webpage
                    ដែលលោកអ្នកអាចធ្វើការចូលរុករកពត៌មាន
                    និងចំណេះដឹងផ្សេងៗអីពីកីឡា។
                    ពួកយើងក៏រួមចំណែកដើម្បីដោះស្រាយនូវបញ្ហាផ្សេងៗរបស់អ្នករាល់គ្នាដែរដែលទាក់ទងនិងកីឡា
                    និងការប្រើប្រាស់ webpage របស់យើង
                    ពួកយើងរីករាយក្នុងការជួយដោះស្រាយបញ្ហារបស់លោកអ្នក។
                  </p>
                </div>
              </div>
            </div>
          </section>
        </header>
        <main className="overflow-hidden">
          <section
            className="relative bg-cover h-full w-full border-none -z-50"
            style={{ backgroundImage: `url(${BgMentor})` }}
          >
            <div className="text-center font-bold text-4xl text-white">
              <h3 data-aos="zoom-in-up" className="pt-4">
                អ្នកណែនាំរបស់យើង
              </h3>
              <section className="flex flex-wrap-reverse justify-center py-14">
                <div
                  data-aos="fade-right"
                  className="h-[215px] w-[255px] flex justify-center items-center relative m-4"
                >
                  <div className="absolute bottom-0 left-0 w-[50%] h-[50%] border-l-[3px] border-b-[3px] border-white"></div>
                  <div className="h-[200px] w-[240px] relative overflow-hidden flex justify-center items-center">
                    <div className="absolute inset-0 bg-[#172554] transform origin-bottom-left -z-20"></div>
                    <div className="z-50 flex justify-center items-center h-full">
                      <div className="text-center">
                        <img
                          src={MentorOne}
                          alt=""
                          className="h-[120px] w-[120px] object-cover rounded-full border-4 border-white mx-auto"
                        />
                        <h4 className="text-[#172554] text-[18px] font-bold">
                          លោកគ្រូ ចាន់ ឆៃយ៉ា
                        </h4>
                      </div>
                    </div>
                    <div className="absolute w-[700px] inset-0 bg-white transform rotate-[30deg] mt-5 origin-top-left -z-10"></div>
                  </div>
                </div>
                <div
                  data-aos="fade-left"
                  className="h-[215px] w-[255px] flex justify-center items-center relative m-4"
                >
                  <div className="absolute top-0 right-0 w-[50%] h-[50%] border-r-[3px] border-t-[3px] border-white"></div>
                  <div className="h-[200px] w-[240px] relative overflow-hidden flex justify-center items-center">
                    <div className="absolute inset-0 bg-[#172554] transform origin-bottom-left -z-20"></div>
                    <div className="z-50 flex justify-center items-center h-full">
                      <div className="text-center">
                        <img
                          src={MentorTwo}
                          alt=""
                          className="h-[120px] w-[120px] object-cover rounded-full border-4 border-white mx-auto"
                        />
                        <h4 className="text-[#172554] text-[18px] font-bold">
                          អ្នកគ្រូ ស៊ុន ជេសសុីកា
                        </h4>
                      </div>
                    </div>
                    <div className="absolute w-[700px] inset-0 bg-white transform rotate-[30deg] mt-5 origin-top-left -z-10"></div>
                  </div>
                </div>
              </section>
            </div>
          </section>
          <section className="relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${BgMember})`,
                opacity: 0.4,
                zIndex: -1,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(23, 37, 84, 0.9)",
                zIndex: -1,
              }}
            />
            <div className="relative text-center font-bold text-4xl text-white">
              <h3 data-aos="zoom-in" className="pt-14">
                ក្រុមរបស់ពួកយើង
              </h3>
            </div>
            <div className="relative z-[5] w-11/12 mx-auto">
              <UserCardComponent />
            </div>
            <div className="text-center text-white max-w-[780px] mx-auto pb-14 px-4 md:px-8">
              <p data-aos="zoom-in" className="text-base lg:text-lg xl:text-xl">
                ពួកយើងគឺជាស្ថាបនិកនៃ SportHub
                ហើយយើងប្រឹងប្រែងអស់ពីសមត្ថភាពដើម្បីបំពេញតម្រូវការរបស់អតិថិជនរបស់យើង
                ដើម្បីជួយសម្រួលដល់ការស្វែងរកទិន្នន័យ និងព័ត៌មានផ្សេងៗអំពីកីឡា ។
              </p>
            </div>
          </section>
          <section className="w-11/12 lg:w-9/12 mx-auto my-20">
            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-10 mb-12">
              <div
                data-aos="fade-right"
                className="relative mt-5 bg-[#172554] w-full lg:w-[573px] h-auto xl:h-[351px] lg:h-[420px] p-5 rounded-lg text-white"
              >
                <div>
                  <i className="fa-solid fa-quote-left text-[30px] md:text-[40px]"></i>
                </div>
                <div className="flex flex-col py-2 px-10 gap-5 md:gap-12">
                  <div>
                    <h4 className="text-[34px] font-bold mb-5 underline">
                      គោលដៅរបស់យើង
                    </h4>
                    <p className="text-[12px] font-light md:text-[16px] leading-7">
                      ដើម្បីដឹកនាំកីឡាដែលមានសមត្ថភាពខ្ពស់ដើម្បីផ្តល់ឱកាសដ៏
                      អស្ចារ្យដែលធ្វើអោយជីវិតកាន់តែមានថាមពល។ យើងជឿថាភាព
                      ជោគជ័យនៃកីឡាធ្វើឱ្យមនុស្សសប្បាយចិត្ត។ វាបង្កើតវេទិកា​ដ៏មាន
                      អានុភាពមួយដើម្បីបំផុសគំនិត និងមានឥទ្ធិពលលើការផ្លាស់ប្តូរជា
                      វិជ្ជមានយូរអង្វែងសម្រាប់បុគ្គល និងសង្គម។
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-5 right-5 text-[30px] md:text-[40px]">
                  <i className="fa-solid fa-quote-right"></i>
                </div>
              </div>

              <div
                data-aos="fade-left"
                className="relative mt-5 bg-[#172554] w-full lg:w-[573px] h-auto xl:h-[351px] lg:h-[420px] p-5 rounded-lg text-white"
              >
                <div>
                  <i className="fa-solid fa-quote-left text-[30px] md:text-[40px]"></i>
                </div>
                <div className="flex flex-col py-2 px-10 gap-5 md:gap-12">
                  <div>
                    <h4 className="text-[34px] font-bold mb-5 underline">
                      ជំនឿរបស់យើង
                    </h4>
                    <p className="text-[12px] font-light md:text-[16px] :leading-7">
                      យើងជឿជាក់លើថាមពលនៃកីឡាដើម្បីផ្តល់នូវឥទ្ធិពលវិជ្ជមាន
                      សម្រាប់បុគ្គល និងសម្រាប់សង្គម យើងជឿជាក់លើថាមពលនៃ ភាពជោគជ័យ
                      ថាមពលនៃការតភ្ជាប់និងថាមពលនៃការសហការ។
                      ប្រសិនបើអ្នកជាអ្នកគាំទ្រកីឡា អ្នកបានមកដល់កន្លែងត្រឹមត្រូវ
                      ហើយ! SportHub.com" ត្រូវបានបង្កើតឡើងដោយមនុស្ស ដូចអ្នក -
                      អ្នកនិយមកីឡា។
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-5 right-5 text-[30px] md:text-[40px]">
                  <i className="fa-solid fa-quote-right"></i>
                </div>
              </div>
            </div>
          </section>
        </main>
      </HelmetProvider>
    </>
  );
}
