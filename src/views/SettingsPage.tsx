import { useSelector } from "react-redux";
import {
  RootState,
  useFetchUserQuery,
  useUpdateUserInfoMutation,
  useUpdateSettingsMutation,
} from "../shared/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ISettings } from "../shared/store/slices/UserSlice";
import FirstTitle from "../shared/components/FirstTitle";
import MainTitle from "../shared/components/MainTitle";
import { toast } from "react-toastify";

const SettingsPage = () => {
  const user = useSelector((state: RootState) => state.userProfile);
  const navigate = useNavigate();
  const response = useFetchUserQuery(user.value);
  const [saveSettings] = useUpdateSettingsMutation();
  const [saveInfo] = useUpdateUserInfoMutation();
  const [userName, setUsername] = useState("");
  const [settings, setSettings] = useState<ISettings>({
    language: "default",
    wordsPerTraining: 0,
    darkmode: false,
  });

  useEffect(() => {
    if (response.isSuccess) {
      setSettings(response.data.settings);
      setUsername(response.data.userName);
    } else if (response.isError) {
      navigate("/app/folders");
    }
  }, [response]);

  const licence = response.data?.accountType || "BŁĄD";
  const level = response.data?.level || "BŁĄD";
  const experience = response.data?.experience || "BŁĄD";
  const joinedDate = response.data?.joined || "BŁĄD";
  const streak = response.data?.streak || "BŁĄD";

  return (
    <div className="flex flex-col items-center w-full h-full bg-gray-100 p-6">
      <FirstTitle>Ustawienia</FirstTitle>
      <MainTitle>Edycja Ustawień</MainTitle>
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md mt-4">
        <div className="flex flex-col gap-4">
          <label className="text-lg font-semibold">Nazwa użytkownika:</label>
          <input
            type="text"
            className="bg-gray-200 p-3 w-full rounded-lg text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
            placeholder="Nazwa użytkownika"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="text-sm text-gray-600">
            <div>Typ licencji: <span className="font-bold">{licence}</span></div>
            <div>Poziom: <span className="font-bold">{level}</span></div>
            <div>Doświadczenie: <span className="font-bold">{experience}</span></div>
            <div>Data utworzenia konta: <span className="font-bold">{joinedDate}</span></div>
            <div>Streak dni: <span className="font-bold">{streak}</span></div>
          </div>

          <label className="text-lg font-semibold">Język:</label>
          <input
            type="text"
            className="bg-gray-200 p-3 w-full rounded-lg text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
            value={settings.language}
            readOnly
          />

          <label className="text-lg font-semibold">Tryb Ciemny:</label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.darkmode}
              onChange={(e) =>
                setSettings({ ...settings, darkmode: e.target.checked })
              }
              className="h-5 w-5 text-secondary focus:ring-secondary border-gray-300 rounded"
            />
            <span>{settings.darkmode ? "Włączony" : "Wyłączony"}</span>
          </div>

          <label className="text-lg font-semibold">Ilość Słówek Na Ćwiczenie:</label>
          <input
            type="number"
            className="bg-gray-200 p-3 w-full rounded-lg text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
            value={settings.wordsPerTraining}
            onChange={(e) => {
              const value = Math.min(Math.max(Number(e.target.value), 1), 15);
              setSettings({ ...settings, wordsPerTraining: value });
            }}
          />

          <button
            onClick={() => {
              saveInfo({ userName, userID: user.value });
              saveSettings({ updatedSettings: settings, userID: user.value }).then(()=>{
                toast.success("Pomyślnie nadpisano ustawienia!");
              })
            }}
            className="w-full bg-secondary text-white py-3 rounded-lg hover:bg-secondary-dark transition duration-200"
          >
            Zapisz Ustawienia
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
