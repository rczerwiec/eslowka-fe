import { IoMdArrowRoundBack } from "react-icons/io";
import { IoChevronForward } from "react-icons/io5";
import character1 from "../../../shared/img/character1.svg";
import { useNavigate } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import Character from "../../../shared/components/Character";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store";
import { useEffect } from "react";
import FirstTitle from "../../../shared/components/FirstTitle";
import MainTitle from "../../../shared/components/MainTitle";
import { toast } from "react-toastify";

const TrainingPage = () => {
  const navigate = useNavigate();
  const folder = useSelector((state: RootState) => state.folderProfile);
  useEffect(() => {
    if (folder.id === undefined) {
      navigate("/app/folders");
    }
  }, [folder.id, navigate]);

  const handleNavigation = (route: string) => {
    if (folder.words.length === 0) {
      toast.error("Folder musi mieć dodane jakieś słówka!");
    } else {
      navigate(route);
    }
  };

  return (
    <div className="relative flex w-full min-h-full bg-gray-50">
      <div className="flex flex-col w-full max-w-6xl mx-auto px-6 py-6 lg:py-10">
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm rounded-2xl px-5 sm:px-6 py-4">
          <MainTitle>Wybierz Tryb</MainTitle>
          <button
            onClick={() => navigate("/app/folders")}
            className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-white transition hover:bg-secondarylight focus:outline-none focus:ring-2 focus:ring-secondary/40"
          >
            <IoMdArrowRoundBack />
            <span>Powrót</span>
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <ModeButton
            title="Słówko - Tłumaczenie"
            onClick={() => handleNavigation("/app/folders/training/play")}
          />
          <ModeButton
            title="Słówko - Tłumaczenie (Odwrotne)"
            onClick={() => handleNavigation("/app/folders/training/playReversed")}
          />
          <ModeButton
            title="Słówko - Tłumaczenie - Ze Słuchu"
            onClick={() => handleNavigation("/app/folders/training/playHear")}
          />
          <ModeButton
            title="Słówko - Tłumaczenie (Odwrotne) - Ze Słuchu"
            onClick={() => handleNavigation("/app/folders/training/playHearReversed")}
          />
        </div>
      </div>

      <Character
        alt="character1"
        className="absolute z-0 w-1/5 bottom-0 right-0 max-lg:hidden"
        character={character1}
      />
    </div>
  );
};

const ModeButton = ({ title, onClick }: { title: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="group relative flex items-center gap-4 w-full p-5 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-sm rounded-2xl transition transform hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-secondary/30"
  >
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondarylight text-white shadow-sm">
      <FaPlayCircle className="text-xl" />
    </div>
    <div className="flex-1 text-left">
      <span className="block text-base sm:text-lg font-semibold text-gray-800">{title}</span>
      <span className="mt-0.5 block text-xs text-gray-500">Kliknij, aby rozpocząć trening</span>
    </div>
    <IoChevronForward className="text-gray-400 group-hover:text-secondary transition" />
    <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-secondary/20"></span>
  </button>
);

export default TrainingPage;
