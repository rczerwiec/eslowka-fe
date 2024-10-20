import { FaFire, FaSkull } from "react-icons/fa6";

interface IProps {
  streak: number;
  reverseStreak: number;
}

function IconStreak({ streak, reverseStreak }: IProps) {
  let streakIcon;
  if (streak >= 5 && streak < 15) {
    streakIcon = <FaFire className=" text-2xl text-orange-600" />;
  } else if (streak >= 15 && streak < 35) {
    streakIcon = <FaFire className=" text-2xl text-zinc-400" />;
  } else if (streak >= 35) {
    streakIcon = <FaFire className=" text-2xl text-gold" />;
  } else if (reverseStreak >= 5) {
    streakIcon = <FaSkull className=" text-2xl text-red-600" />;
  } else {
    streakIcon = <></>;
  }

  return (
    <div className="flex flex-col justify-center items-center pt-3">
      {streakIcon}
      {streak >= 5 || reverseStreak >= 5 ? (
        <div className="text-sm font-bold text-fifth">
          {reverseStreak >= 5 ? <>-{reverseStreak}</> : <>{streak}</>}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default IconStreak;
