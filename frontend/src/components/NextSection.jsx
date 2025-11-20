import React from "react";
import { motion } from "framer-motion";
import boyImg from "../assets/boy.png";

const NextSection = () => {
  return (
    <section className="relative w-full bg-white pt-24 pb-32 overflow-hidden">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[#341b79]"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Creates a sense of achievement <br /> and national recognition.
          </h2>

          <p className="mt-4 text-xl font-bold text-black leading-relaxed">
            India’s most leading & unique language aptitude challenge,
            as per school’s existing phonics program.
          </p>

          <p className="mt-5 text-base text-slate-700 leading-relaxed">
            It gives children from Nursery to Grade 3 the opportunity to:
            <br />• Explore new sounds & spelling patterns
            <br />• Strengthen language aptitude
            <br />• Compete with confidence — no extra coaching needed!
          </p>

          {/* FEATURES BOXES */}
          <div className="mt-10 space-y-8">

            {/* SCHOLARSHIP */}
            <div className="flex gap-4">
              <span className="text-4xl">🏆</span>
              <div>
                <h4 className="text-lg md:text-xl font-bold">
                  Bonus: Exclusive Scholarships!
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  State & National Level Scholarship (T&C Applied).
                  Students who excel can win rewards, recognition and scholarships
                  at district, state and national levels.
                </p>
              </div>
            </div>

            {/* HEALTHY COMPETITION */}
            <div className="flex gap-4">
              <span className="text-4xl text-yellow-400">⭐</span>
              <div>
                <h4 className="text-lg md:text-xl font-bold">
                  Encourage Healthy Competition
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Inspires students to learn confidently, compete nationally,
                  and showcase their phonics talent.
                </p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* RIGHT SIDE (BIG BLOB + IMAGE) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center md:justify-start"
        >
          {/* SUPER BIG PINK SHAPE */}
          <div
            className="
              absolute 
              right-[-120px]   /* Moves blob to start from page edge */
              top-[40px]
              w-[550px]       /* Much bigger */
              h-[520px]
              bg-[#ff008c]
              rounded-[60%_60%_0_60%]
              shadow-2xl
              z-0
            "
          ></div>

          {/* BOY IMAGE */}
          <motion.div
            initial={{ scale: 0.85 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div
              className="
                w-[330px] h-[330px]
                md:w-[380px] md:h-[380px]
                rounded-full overflow-hidden
                border-[10px] border-white shadow-xl
                -ml-10           /* Moves image closer to text */
              "
            >
              <img
                src={boyImg}
                alt="Student"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

export default NextSection;
