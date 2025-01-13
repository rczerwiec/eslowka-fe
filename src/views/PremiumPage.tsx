import FirstTitle from "../shared/components/FirstTitle";
import MainTitle from "../shared/components/MainTitle";
import Pricing from "./LandingPage/components/Pricing";

const PremiumPage = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <FirstTitle>Premium</FirstTitle>
      <MainTitle>Premium</MainTitle>
      <div className="relative inline-block text-left px-4">
        <Pricing/>
      </div>
    </div>
  );
};

export default PremiumPage;
