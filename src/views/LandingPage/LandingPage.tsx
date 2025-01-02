import { useNavigate } from "react-router-dom";
import LP_Navbar from "./components/LP_Navbar";
import MainSection from "./components/MainSection";
import Features from "./components/Features";
import Workflow from "./components/Workflow";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-gradient_from to-gradient_to">
      <LP_Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <MainSection />
        <Features/>
        <Workflow/>
        <Pricing/>
        <Testimonials/>
        <Footer/>
      </div>
    </div>
  );
};

export default LandingPage;
