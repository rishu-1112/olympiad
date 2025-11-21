import Hero from "./components/Hero";
import Partners from "./components/Partners";
import NextSection from "./components/NextSection";
import Footer from "./components/Footer";
import WhyParticipate from "./components/WhyParticipate";
import Process from "./components/Process";
import Registration from "./components/RegistrationForm";
function App() {
  return (
    <>
    <div id="popup-root" className="relative z-[1]"></div>
    <Registration/>
    <Hero/>
    <Partners/>
    <NextSection/>
    <WhyParticipate/>
    <Process/>
    <Footer/>
    </>
  )
}

export default App;
