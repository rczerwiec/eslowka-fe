import React from "react";
import { features } from "../../../constants";

const Features = () => {
  return (
    <div
      id="features"
      className="relative mt-20 border-b border-neutral-300 py-16 font-inter"
    >
      {/* Nagłówek sekcji */}
      <div className="text-center">
        <span className="bg-secondarylight text-neutral-800 rounded-full text-sm px-6 py-2 font-bold uppercase shadow-md">
          Funkcje
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-16 font-extrabold tracking-wide">
          Łatwo ucz się {" "}
          <span className="bg-gradient-to-r from-white to-white text-transparent bg-clip-text">
            nowych słówek
          </span>
        </h2>
        <p className="text-lg mt-4 text-neutral-500 max-w-3xl mx-auto">
          Oferujemy narzędzia zaprojektowane z myślą o Twojej skuteczności w
          nauce języków. Zobacz, co możemy Ci zaoferować!
        </p>
      </div>
      {/* Lista funkcji */}
      <div className="flex flex-wrap justify-center mt-10 lg:mt-16 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/3 p-4 hover:shadow-lg transition-shadow rounded-lg"
          >
            <div className="flex gap-4 items-start">
              {/* Ikona */}
              <div className="flex h-12 w-12 p-2 bg-secondarylight text-neutral-800 justify-center items-center rounded-full shadow-md">
                {feature.icon}
              </div>
              {/* Treść */}
              <div>
                <h5 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.text}
                </h5>
                <p className="text-md text-neutral-500">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
