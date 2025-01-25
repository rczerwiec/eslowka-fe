import { FC } from "react";
import { FaFire } from "react-icons/fa6";

interface StatsComponentInterface {
  streak: number;
  experience: number;
  level: number;
}

function StatsComponent({ streak, experience, level }: StatsComponentInterface) {
  // Formatowanie doświadczenia
  let experienceFormatted = `${experience} XP`;
  if (experience >= 1000) {
    const exp = experience.toString();
    if (experience < 1_000_000) {
      experienceFormatted = `${exp.slice(0, exp.length - 3)},${exp.slice(-3, -1)}k XP`;
    } else {
      experienceFormatted = `${exp.slice(0, exp.length - 6)},${exp.slice(-6, -3)}kk XP`;
    }
  }

  return (
    <div className="flex items-center gap-4 px-4 py-2 rounded-l-lg max-lg:bg-secondary">
      {/* Licznik streak */}
      <div className="flex items-center gap-2 text-white">
        <FaFire className="text-2xl text-white" />
        <span className="font-inter font-semibold text-xl">{streak}</span>
      </div>

      {/* Poziom i doświadczenie */}
      <div className="flex flex-col items-center justify-center bg-secondarylight text-white rounded-lg px-2 py-2">
        <div className="text-lg font-bold">{level} LVL</div>
        <div className="text-sm">{experienceFormatted}</div>
      </div>
    </div>
  );
}

export default StatsComponent;
