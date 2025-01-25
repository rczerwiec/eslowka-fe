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
    <div className="bg-gradient-to-r from-gradient_from to-gradient_to font-inter">
      {/* Nawigacja */}
      <LP_Navbar />

      {/* Główna zawartość */}
      <div className="max-w-7xl mx-auto pt-20 px-6 space-y-20">
        <MainSection />
        <div className="transition-opacity duration-500">
          <Features />
        </div>
        <div className="bg-gray-100 py-16 px-2 rounded-lg shadow-md">
          <Workflow />
        </div>
        <div className="transition-transform duration-500 transform hover:scale-105">
          <Pricing />
        </div>
        <div className="bg-gray-900 text-white py-16 rounded-lg shadow-md">
          <Testimonials />
        </div>
      </div>

      {/* Stopka */}
      <Footer />
    </div>
  );
};

export default LandingPage;
