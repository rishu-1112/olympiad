import { useState } from "react";
import Hero from "./components/Hero";
import Partners from "./components/Partners";
import NextSection from "./components/NextSection";
import Footer from "./components/Footer";
import WhyParticipate from "./components/WhyParticipate";
import Process from "./components/Process";
import Registration from "./components/RegistrationForm";
import StickyRegisterBtn from "./components/StickyRegisterBtn";
import PhonicsBooksSection from "./components/PhonicsBooksSection";

function App() {
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <>
    <div id="popup-root" className="relative z-[1]"></div>
    <Registration showRegistration={showRegistration} setShowRegistration={setShowRegistration}/>
    <StickyRegisterBtn onClick={() => setShowRegistration(true)} />
    <Hero/>
    <PhonicsBooksSection/>
    <Partners/>
    <NextSection/>
    <WhyParticipate/>
    <Process/>
    <Footer/>
    </>
  )
}

export default App;
