import { useNavigate } from "react-router-dom";
import { useFetchUsersQuery } from "../shared/store";
import { IUser } from "../shared/store/slices/UserSlice";
import FirstTitle from "../shared/components/FirstTitle";
import MainTitle from "../shared/components/MainTitle";

const RankingPage = () => {
  const response = useFetchUsersQuery("");
  const navigate = useNavigate();

  let content = <div>Loading...</div>;
  if (response.isLoading) {
    content = <div>Loading...</div>;
  } else if (response.isError) {
    content = <div>Error...</div>;
    navigate("/app/folders");
  } else if (response.isSuccess) {
    const sortedData = response.data.map((user:IUser)=> user).sort((a: IUser, b: IUser) => {
      console.log(b);
      console.log(a);
      return b.experience - a.experience});

    content = sortedData
      .map((user: IUser, index: number) => {
        return (
          <div className="p-2 text-base">
            <b>{index + 1}.</b>
            {user.userName} <b>LEVEL:</b>
            {user.level} <b>XP:</b>
            {user.experience}
          </div>
        );
      })
  }
  return (
    <div className="flex flex-col w-full h-full">
      <FirstTitle>Ranking</FirstTitle>
      <MainTitle>Ranking</MainTitle>
      <div className="relative inline-block text-left">
        <ul className="pl-6 text-sm font-inter">{content}</ul>
      </div>
    </div>
  );
};

export default RankingPage;
