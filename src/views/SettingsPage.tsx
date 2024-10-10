import { useSelector } from "react-redux";
import { RootState, useFetchUserQuery, useUpdateUserInfoMutation, useUpdateUserSettingsMutation } from "../shared/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ISettings } from "../shared/store/slices/UserSlice";

const SettingsPage = () => {
    const user = useSelector((state: RootState) => state.userProfile);
    const navigate= useNavigate();
    const response = useFetchUserQuery(user.value);
    const [saveSettings] = useUpdateUserSettingsMutation();
    const [saveInfo] = useUpdateUserInfoMutation();
    const [userName, setUsername] = useState("");
    const [settings, setSettings] = useState<ISettings>({language: "default", wordsPerTraining: 0, darkmode: false});
    let renderContent=<div>XD</div>;
    useEffect(()=>{
    if (response.isLoading) {
        renderContent = <div>Ładowanie ustawień...</div>;
      } else if (response.isError) {
        renderContent = <div>Error</div>;
        navigate("/app/folders");
      } else if (response.isSuccess) {
        setSettings(response.data.settings);
        setUsername(response.data.userName);
      }
    },[response]);

    

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
          Edytuj Ustawienia
        </div>
        <div className="relative inline-block text-left">
          <div className="flex flex-col pl-4">
          <label>Nazwa użytkownika:</label>
            <input
              type="text"
              className="bg-fifth_light p-4 w-full h-16 rounded-md font-inter text-xs font-extralight"
              placeholder="Nazwa użytkownika"
              value={userName}
              onChange={(e) => {
                setUsername(e.target.value)}}
            ></input>
            <div>Poziom:{response.data.level}</div>
            <div>Doświadczenie:{response.data.experience}</div>
            <div>Data utworzenia konta:{response.data.joined}</div>
            <div>Streak dni:{response.data.streak}</div>
            <div>Język:{settings.language}</div>
            <div>Tryb Ciemny:{settings.darkmode.toString()}</div>
            <label>Ilość Słowek Na Ćwiczenie:</label>
            <input
              type="number"
              className="bg-fifth_light p-4 w-full h-16 rounded-md font-inter text-xs font-extralight"
              placeholder="Treść zgłoszenia"
              value={settings.wordsPerTraining}
              onChange={(e) => {
                if (Number(e.target.value) > 15) {
                  setSettings({ ...settings, wordsPerTraining: 15 });
                } else if (Number(e.target.value) <= 1) {
                  setSettings({ ...settings, wordsPerTraining: 1 });
                } else {
                  setSettings({
                    ...settings,
                    wordsPerTraining: Number(e.target.value),
                  });
                }
              }}
            ></input>
            <div onClick={()=>{
                saveInfo({userName: userName, userID: user.value})
                saveSettings({updatedSettings: settings, userID: user.value})
            }} className="flex  m-8 p-4 bg-secondary hover:bg-third hover:cursor-pointer rounded-lg shadow-md items-center justify-center">
              Zapisz Ustawienia
            </div>
          </div>
        </div>
      </div>
    );
}

export default SettingsPage;