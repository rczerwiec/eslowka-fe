import { useSelector } from "react-redux";
import { RootState, useFetchUserQuery } from "../shared/store";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
    const user = useSelector((state: RootState) => state.userProfile);
    const navigate= useNavigate();
    const response = useFetchUserQuery(user.value);

    let renderContent;
    if (response.isLoading) {
        renderContent = <div>Ładowanie ustawień...</div>;
      } else if (response.isError) {
        renderContent = <div>Error</div>;
        navigate("/app/folders");
      } else if (response.isSuccess) {
        const userData = response.data;
        console.log(userData);
        renderContent = <div className="flex flex-col pl-4">
            <div>USTAWIENIA:</div>
            <div>Język:{userData.settings.language}</div>
            <div>Tryb Ciemny:{userData.settings.darkmode.toString()}</div>
            <div>Ilość Słówek Na Trening:{userData.settings.wordsPerTraining.toString()}</div>
        </div>;
      }

    return (
      <div className="flex flex-col w-full h-full">
        <div
          className="flex pl-4 bg-fourth h-8  items-center
                                    text-fifth text-sm font-medium"
        >
          Ustawienia
        </div>
        <div
          className="flex pl-4 h-20 items-center
                                    text-black text-3xl font-medium"
        >
          Ustawienia
        </div>
        <div className="relative inline-block text-left">{renderContent}</div>
      </div>
    );
}

export default SettingsPage;