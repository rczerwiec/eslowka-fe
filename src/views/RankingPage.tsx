import { useNavigate } from "react-router-dom";
import { useFetchUsersQuery } from "../shared/store";
import { IUser } from "../shared/store/slices/UserSlice";

const RankingPage = () => {
    const response = useFetchUsersQuery("");
    const navigate = useNavigate();
    
    let content = <div>Loading...</div>
    if (response.isLoading) {
      content = <div>Loading...</div>;
    } else if (response.isError) {
      content = <div>Error...</div>;
      navigate("/app/folders");
    } else if (response.isSuccess) {
      content = response.data
        .map((user: IUser, index: number) => {
          return (
            <div className="p-2 text-base">
              <b>{index+1}.</b>{user.userName} <b>LEVEL:</b>{user.level} <b>XP:</b>{user.experience}
            </div>
          );
        })
        .sort((a: IUser, b: IUser) => b.experience - a.experience);
    }
    return (
      <div className="flex flex-col w-full h-full">
        <div
          className="flex pl-4 bg-fourth h-8  items-center
                                    text-fifth text-sm font-medium"
        >
          Ranking
        </div>
        <div
          className="flex pl-4 h-20 items-center
                                    text-black text-3xl font-medium"
        >
          Ranking
        </div>
        <div className="relative inline-block text-left">
          <ul className="pl-6 text-sm font-inter">{content}</ul>
        </div>
      </div>
    );
}

export default RankingPage;