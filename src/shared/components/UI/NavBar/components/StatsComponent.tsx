import { FC } from "react";
import { FaFire } from "react-icons/fa6";

interface StatsComponentInterface{
    streak: number;
    experience: number;
    level: number;
}

function StatsComponent({streak, experience, level}:StatsComponentInterface){

      let experience_spring = experience.toString()+"XP";
      if (experience > 999 && experience < 9999) {
        experience_spring =
        experience.toString().slice(0, 1) + ',' + experience.toString().slice(1, 3) + 'k XP';
      } else if (experience > 9999 && experience < 99999) {
        experience_spring =
        experience.toString().slice(0, 2) + ',' + experience.toString().slice(2, 4) + 'k XP';
      } else if (experience > 99999 && experience < 999999) {
        experience_spring =
        experience.toString().slice(0, 3) + ',' + experience.toString().slice(3, 5) + 'k XP';
      } else if (experience > 999999 && experience < 9999999) {
        experience_spring =
        experience.toString().slice(0, 1) + ',' + experience.toString().slice(1, 6) + 'kk XP';
      }
      

    return (
      <div className="flex items-center ml-6 ">
        <div className="flex flex-col justify-center items-center font-bold font-inter text-[10px] mr-3">
          <div className="text-base">{level} LVL</div>
          <div>{experience_spring}</div>
          </div>
        <div className="font-bold font-inter text-2xl">{streak}</div>
        <div>
          <FaFire className="text-xl" />
        </div>
      </div>
    );
  };

  export default StatsComponent;