import React from "react";
import video1 from "../../../constants/vid1.mp4";
import video2 from "../../../constants/vid2.mp4";

const MainSection = () => {
  return (
    <div id="main" className="flex flex-col items-center mt-6 lg:mt-12 font-inter px-6">
      {/* Nagłówek */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide font-bold">
        Najlepsza platforma do nauki {" "}
        <span className="bg-gradient-to-r from-white to-white text-transparent bg-clip-text animate-pulse">
          słówek online!
        </span>
      </h1>
      {/* Opis */}
      <p className="mt-8 text-lg sm:text-xl text-center text-neutral-500 max-w-4xl">
        Twórz własne zbiory słówek i odkrywaj możliwości zaawansowanych narzędzi opartych na sztucznej inteligencji. Ucz
        się efektywnie, rozwijaj swoje umiejętności i dołącz do społeczności setek zadowolonych użytkowników!
      </p>
      {/* Przycisk CTA */}
      <div className="flex flex-wrap justify-center my-10 gap-4">
        <a
          href="/signup"
          className="bg-gradient-to-r from-secondary to-secondarylight text-white py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
        >
          Zacznij za darmo!
        </a>
        <a
          href="#"
          className="py-3 px-6 border border-white text-white rounded-lg hover:bg-secondary hover:text-white hover:scale-105 transition-transform"
        >
          Dokumentacja
        </a>
      </div>
      {/* Sekcja z wideo */}
      <div className="flex flex-wrap justify-center mt-10 gap-6">
        <video
          autoPlay
          loop
          muted
          className="rounded-xl w-full sm:w-[45%] border border-secondarylight shadow-lg transition-transform hover:scale-105"
        >
          <source src={video1} type="video/mp4" />
          Twoja przeglądarka nie wspiera filmów!
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-xl w-full sm:w-[45%] border border-secondarylight shadow-lg transition-transform hover:scale-105"
        >
          <source src={video2} type="video/mp4" />
          Twoja przeglądarka nie wspiera filmów!
        </video>
      </div>
    </div>
  );
};

export default MainSection;
