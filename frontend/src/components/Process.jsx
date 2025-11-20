import React from "react";
import boyImg from "../assets/schoolboy.png"; 
import studentIcon from "../assets/student.svg";
import schoolIcon from "../assets/school.svg";
import graduateIcon from "../assets/graduate.svg";
import mapIcon from "../assets/map.svg";

export default function OlympiadBottomSection() {
  return (
    <div className="w-full bg-white overflow-hidden">

      {/* ================= Stats Section ================= */}
      <section className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { icon: studentIcon, number: "1500+", label: "Students" },
            { icon: schoolIcon, number: "850+", label: "Schools" },
            { icon: graduateIcon, number: "500+", label: "Scholarships" },
            { icon: mapIcon, number: "15+", label: "States" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="w-32 h-32 flex items-center justify-center"
                style={{
                  background: "#ff007f",
                  borderRadius: "30% 40% 30% 40% / 40% 30% 40% 30%",
                }}
              >
                <img src={item.icon} alt="" className="w-16 h-16" />
              </div>
              <h3 className="text-3xl font-extrabold mt-4">{item.number}</h3>
              <p className="text-gray-600 text-lg font-semibold">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= Easy Steps Section ================= */}
      <section className="w-full bg-white py-20">

        {/* Heading */}
        <h2 className="text-center text-6xl md:text-7xl font-extrabold text-[#262483] mb-20 tracking-tight">
          Easy Steps to Join the Olympiad
        </h2>

        <div
          className="
            max-w-[90%] 
            mx-auto 
            px-4 
            flex flex-col md:flex-row 
            gap-16 
            items-center
          "
        >

          {/* ---------- Kid Image + Blob ---------- */}
          <div
            className="
              relative 
              w-[260px] h-[260px] 
              md:w-[320px] md:h-[320px] 
              flex-shrink-0
            "
            style={{ transform: "translateX(-7rem)" }} // more left shift
          >
            <svg
              viewBox="0 0 800 600"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-[-360px] top-[-100px] w-[820px] h-[520px] z-0"
            >
              <path
                fill="#FF007F"
                d="
                  M 0 260
                  C 0 140, 140 10, 340 40
                  C 490 65, 600 180, 650 260
                  C 700 330, 600 440, 420 470
                  C 240 480, 0 380, 0 260
                "
              />
            </svg>

            <img
              src={boyImg}
              alt="child"
              className="
                relative z-10 
                w-full h-full 
                rounded-full 
                border-[14px] 
                border-white 
                shadow-2xl 
                object-cover
              "
            />
          </div>

          {/* ---------- WIDER & SHORTER STEPS BOXES ---------- */}
          <div
            className="
              flex-1 
              grid 
              grid-cols-1 md:grid-cols-5 
              gap-6 
              pr-2
            "
          >
            {[
              {
                color: "#7C4DFF",
                text: "Register your school or individual child",
              },
              {
                color: "#0057FF",
                text: "Receive your Phonics Olympiad Kit with self-paced activities",
              },
              {
                color: "#00B4FF",
                text: "Practice anytime, anywhere - guided by fun learning material",
              },
              {
                color: "#00C08A",
                text: "Appear for the Championship (Conducted at your school)",
              },
              {
                color: "#7ED321",
                text: "Celebrate success with medals, certificates & scholarships!",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="
                  relative 
                  px-5 
                  py-8 
                  border-[5px] 
                  rounded-2xl 
                  h-[180px] 
                  bg-white 
                  shadow-md 
                  flex 
                  flex-col 
                  justify-center
                "
                style={{
                  borderColor: step.color,
                }}
              >
                {/* Step Number */}
                <div
                  className="
                    absolute 
                    -top-6 left-1/2 
                    transform -translate-x-1/2 
                    w-12 h-12 
                    rounded-full 
                    flex items-center justify-center 
                    font-extrabold text-lg 
                    bg-white shadow
                  "
                  style={{
                    border: `4px solid ${step.color}`,
                    color: step.color,
                  }}
                >
                  {index + 1}
                </div>

                {/* Step Text  */}
                <p
                  className="
                    font-bold 
                    text-[16px] 
                    leading-snug 
                    text-center
                  "
                  style={{ color: step.color }}
                >
                  {step.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
