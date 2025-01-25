import { BiCheckCircle } from "react-icons/bi";
import { pricingOptions } from "../../../constants";

const Pricing = () => {
  return (
    <div id="pricing" className="mt-20 px-6 font-inter">
      {/* Nagłówek */}
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide font-bold">
        Cennik
      </h2>
      <p className="text-center text-lg text-neutral-500 max-w-3xl mx-auto mb-12">
        Wybierz plan, który najlepiej odpowiada Twoim potrzebom i zacznij naukę już teraz!
      </p>

      {/* Karty cenowe */}
      <div className="flex flex-wrap justify-center gap-8">
        {pricingOptions.map((option, index) => (
          <div
            key={index}
            className={`w-full sm:w-1/2 lg:w-1/3 p-4 hover:shadow-xl transition-shadow ${
              option.title === "Pro" ? "transform scale-105" : ""
            }`}
          >
            <div className="p-8 border border-neutral-300 rounded-xl bg-white shadow-md">
              {/* Tytuł planu */}
              <p className="text-4xl font-semibold text-gray-800 mb-6">
                {option.title}
                {option.title === "Pro" && (
                  <span className="bg-gradient-to-r from-secondary to-secondarylight text-transparent bg-clip-text text-xl ml-2">
                    (Najczęściej wybierane!)
                  </span>
                )}
              </p>
              {/* Cena */}
              <p className="mb-8">
                <span className="text-5xl font-bold bg-gradient-to-r from-main to-secondary text-transparent bg-clip-text">
                  {option.price}
                </span>
                <span className="text-neutral-500 ml-2 tracking-tight">
                  {index === 2 ? "/Rok" : "/Miesiąc"}
                </span>
              </p>
              {/* Funkcje */}
              <ul className="mb-8 space-y-4">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <BiCheckCircle className="text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              {/* Przycisk subskrypcji */}
              <a
                href="#"
                className="inline-flex justify-center items-center text-center w-full py-3 mt-6 bg-gradient-to-r from-secondarylight to-secondary text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
              >
                Subskrybuj
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
