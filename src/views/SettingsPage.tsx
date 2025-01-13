import { useSelector } from "react-redux";
import { RootState, useFetchUserQuery, useUpdateUserInfoMutation, useUpdateSettingsMutation } from "../shared/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ISettings } from "../shared/store/slices/UserSlice";
import FirstTitle from "../shared/components/FirstTitle";
import MainTitle from "../shared/components/MainTitle";

const SettingsPage = () => {
    const user = useSelector((state: RootState) => state.userProfile);
    const navigate= useNavigate();
    const response = useFetchUserQuery(user.value);
    const [saveSettings] = useUpdateSettingsMutation();
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

    const licence = response.data?.accountType || 'BŁAD';
    const level = response.data?.level || 'BŁAD';
    const experience = response.data?.experience || 'BŁĄD';
    const joinedDate = response.data?.joined || 'BŁĄD';
    const streak = response.data?.streak || 'BŁĄD';

    return (
      <div className="flex flex-col w-full h-full">
      <FirstTitle>Ustawienia</FirstTitle>
      <MainTitle>Edycja Ustawień</MainTitle>
        <div className="relative inline-block text-left">
          <div className="flex flex-col pl-4 w-fit justify text-lg font-inter gap-2">
          <label>Nazwa użytkownika:</label>
            <input
              type="text"
              className="bg-fifth_light p-4 w-full h-16 rounded-md font-inter text-xs font-extralight"
              placeholder="Nazwa użytkownika"
              value={userName}
              onChange={(e) => {
                setUsername(e.target.value)}}
            ></input>
            <div>Typ licencji:{licence}</div>
            <div>Poziom:{level}</div>
            <div>Doświadczenie:{experience}</div>
            <div>Data utworzenia konta:{joinedDate}</div>
            <div>Streak dni:{streak}</div>
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