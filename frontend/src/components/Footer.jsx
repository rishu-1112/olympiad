import React from "react";

const Footer = () => {
  return (
    <footer className="relative w-full mt-0">

      {/* 🌊 STATIC WAVY EDGE */}
      <div className="absolute -top-[120px] left-0 w-full h-[180px] overflow-hidden">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#ff008c"
            fillOpacity="1"
            d="
              M0,224L60,213.3C120,203,240,181,360,170.7C480,160,600,160,720,176C840,192,960,224,1080,229.3C1200,235,1320,213,1380,202.7L1440,192 
              L1440,320 L0,320Z
            "
          ></path>
        </svg>
      </div>

      {/* 🌈 MAIN FOOTER CONTENT */}
      <div className="bg-gradient-to-br from-[#ff008c] via-[#9124a3] to-[#341b79] text-white pt-40 pb-16 px-10 md:px-20 lg:px-32 relative z-10">

        {/* ONLY BRAND INFO BLOCK */}
        <div className="flex justify-center text-center">
          <div className="max-w-md">
            <h3 className="text-2xl font-extrabold">Phonics Olympiad</h3>
            <p className="mt-4 text-sm leading-relaxed opacity-90">
              Empowering early learners with confidence, creativity, problem solving, 
              and phonics excellence through India's most innovative Olympiad platform.
            </p>
          </div>
        </div>

        {/* COPYRIGHT */}
        <p className="text-center text-xs opacity-80 mt-12">
          ©2025 (Phonics Olympiads) - ALL RIGHTS RESERVED | PRIVACY POLICY
        </p>

        {/* META DISCLAIMER */}
        <p className="text-[10px] opacity-70 leading-relaxed text-center mt-6 max-w-4xl mx-auto">
          This site is not a part of the Facebook website or Facebook Inc. Additionally, 
          this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of 
          FACEBOOK, Inc. Please be advised that revenues and results shown are extraordinary 
          and are not intended to serve as guarantees. Your results in life are up to you. 
          We aim to help by providing great content, direction, and strategies that have 
          worked for us and our students, and that we believe can move you forward. All of 
          our terms, privacy policies, and disclaimers for this program and website can be 
          accessed via the link above. We value transparency and hold ourselves (and you) 
          to a high standard of integrity. Thank you for visiting. We hope this training 
          and content bring you great value.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
