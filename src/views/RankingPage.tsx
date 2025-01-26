import { useNavigate } from "react-router-dom";
import { useFetchUsersQuery } from "../shared/store";
import { IUser } from "../shared/store/slices/UserSlice";
import FirstTitle from "../shared/components/FirstTitle";
import MainTitle from "../shared/components/MainTitle";

const RankingPage = () => {
  const response = useFetchUsersQuery("");
  const navigate = useNavigate();

  let content = <div className="text-center text-gray-500">Ładowanie...</div>;

  if (response.isLoading) {
    content = <div className="text-center text-gray-500">Ładowanie...</div>;
  } else if (response.isError) {
    content = <div className="text-center text-red-500">Wystąpił błąd. Przekierowanie...</div>;
    setTimeout(() => navigate("/app/folders"), 3000);
  } else if (response.isSuccess) {
    const sortedData = response.data
      .map((user: IUser) => user)
      .sort((a: IUser, b: IUser) => b.experience - a.experience);

    content = (
      <div className="flex flex-col items-center">
        {sortedData.map((user: IUser, index: number) => (
          <div
  key={user.userName}
  className={`flex items-center justify-between w-3/4 max-w-md p-4 my-2 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow ${
    index === 0 ? "border-yellow-400 border-2" : "border border-gray-300"
  }`}
>
  <div className="flex items-center gap-4 w-2/3"> {/* Dostosowana szerokość */}
    <span
      className={`text-xl font-bold ${
        index === 0
          ? "text-yellow-500"
          : index === 1
          ? "text-gray-500"
          : index === 2
          ? "text-orange-400"
          : "text-gray-800"
      }`}
    >
      {index + 1}
    </span>
    <div className="truncate text-base font-semibold text-gray-700 w-full">
      {user.userName} {/* Nick obsługuje długie teksty */}
    </div>
  </div>
  <div className="flex-shrink-0 text-sm text-gray-600 text-right w-1/3"> {/* Zabezpieczenie dla XP i level */}
    <b>Level:</b> {user.level} | <b>XP:</b> {user.experience}
  </div>
</div>

        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full h-full bg-gray-100 p-6">
      <FirstTitle>Ranking</FirstTitle>
      <MainTitle>Tablica Wyników</MainTitle>
      <div className="w-full max-w-xl mt-4 rounded-lg bg-white shadow-md p-6">
        {content}
      </div>
    </div>
  );
};

export default RankingPage;
