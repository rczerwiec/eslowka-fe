import { useState } from "react";
import { GoogleGenerativeAI} from "@google/generative-ai";
import ChatHistory from "./ChatHistory";
import FirstTitle from "../../shared/components/FirstTitle";
import MainTitle from "../../shared/components/MainTitle";
import { IChatHistoryPart, IParts } from "../../shared/store/slices/ChatHistorySlice";
import { useDispatch, useSelector } from "react-redux";
import {change} from "../../shared/store/slices/ChatHistorySlice";
import { RootState } from "../../shared/store";

function AIChatPage() {
  const [userInput, setUserInput] = useState("");
  const chatHistoryGlobal = useSelector((state: RootState) => state.chatProfile);
  const dispatch = useDispatch();
  const [chatHistory, setChatHistory] = useState<IChatHistoryPart[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(chatHistoryGlobal);
  const handleUserInput = (e: any) => {
    setUserInput(e.target.value);
  };

  // gemini api key
  const apikey = process.env.REACT_APP_GEMINI_API_KEY;

  //generate AI object based on api
  let genAI;
  if (apikey !== undefined) {
    genAI = new GoogleGenerativeAI(apikey);
  }
  const model = genAI?.getGenerativeModel({
    model: "gemini-1.5-flash-8b",
    systemInstruction:
      `Jesteś Czarek, jesteś robotem który wspomoże użytkowników portalu esłówka.pl w nauce języków. Zawsze staraj się brnąć do sytuacji, w której wygenerujesz liste pojedynczych słówek z danego języka, pytaj jakiego języka rozmówca chce się uczyć. Doradzaj, poprawiaj błędy gdy Twój rozmówca pisze w innym języku niż polski oraz generuj przydatne listy słówek do nauki.`,
  });

  const sendMessage = async () => {
    if (userInput.trim() === "") return;
    setIsLoading(true);

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    try {
      const chatSession = await model?.startChat({generationConfig, history: chatHistory});
      let response = "";
      const result = await chatSession?.sendMessage(userInput);
      if(result !== undefined){
        response = await result.response.text();
      }

      console.log("pushuje");
      setChatHistory([
        ...chatHistory,
      ]);
      dispatch(change({chatHistory}))
    } catch(e) {
      console.log("Error!",e);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
    dispatch(change({chatHistory}))
  };

  return (
    <div className="flex flex-col w-full h-full">
      <FirstTitle
      >
        ESłówka - Chat AI 1.0.2
      </FirstTitle>
      <MainTitle
      >
        Chat AI
      </MainTitle>
      <div className="relative inline-block text-left font-inter">
        <div className="flex flex-col justify-center items-center container mx-auto px-4 py-8">
        {chatHistory.length > 0 ? (<ChatHistory chatHistory={chatHistoryGlobal.object} />) : (<span>{isLoading ? (<></>) : (<div className="flex flex-col max-h-[550px] max-lg:max-h-[450px] max-w-[1300px] border border-solid border-fifth rounded-xl p-4">Rozpocznij chat, wpisując swoją wiadomość poniżej!</div>)}</span>)}
          {isLoading && (
            <>
              <div className="flex flex-col max-h-[550px] max-lg:max-h-[450px] max-w-[1300px] border border-solid border-fifth rounded-xl p-4">
                <div className="flex justify-center items-center h-12">
                  <div className="animate-spin w-12 h-12 text-black">O</div>
                </div>
              </div>
            </>
          )}

          <div className="flex mt-4 justify-center items-center">
            <div className="flex flex-col ">
              <div className="flex justify-center items-center font-inter text-fifth font-bold">
                Wprowadź swoją wiadomość!
              </div>
              <div>
                <form className="flex max-lg:flex-col justify-center items-center gap-1">
              <input
                className="bg-fifth_light h-10 rounded-md p-3 w-[20rem]"
                type="text"
                placeholder="twoja wiadomosc"
                value={userInput}
                onChange={handleUserInput}
              ></input>
              <button
                className="bg-secondary font-inter text-white font-bold text-xl w-fit px-16 py-2 rounded-xl"
                onClick={sendMessage}
                disabled={isLoading}
              >
                Wyslij
              </button>
              </form>
              </div>
            </div>
            
          </div>
          <div className="flex mt-4 justify-center items-center">          <button
            className="bg-secondary font-inter text-white font-bold text-xl w-fit px-16 py-2 rounded-xl"
            onClick={clearChat}
          >
            Wyczysc Chat
          </button></div>


        </div>
      </div>
      
    </div>
  );
}

export default AIChatPage;
