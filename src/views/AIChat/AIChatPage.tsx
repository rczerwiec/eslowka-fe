import { useState } from "react";
import { GoogleGenerativeAI} from "@google/generative-ai";
import ChatHistory from "./ChatHistory";
import FirstTitle from "../../shared/components/FirstTitle";
import MainTitle from "../../shared/components/MainTitle";
import { IChatHistoryPart, IParts } from "../../shared/store/slices/ChatHistorySlice";
import { useDispatch, useSelector } from "react-redux";
import {change} from "../../shared/store/slices/ChatHistorySlice";
import { RootState } from "../../shared/store";
import { toast } from "react-toastify";

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
    if(isLoading){
      toast.error("Generowanie danych jest w toku...");
      return;
    }
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
      const countResultTokensFromInput = await model?.countTokens(
        userInput,
      );

      const totalTokens = countResultTokensFromInput?.totalTokens;
      console.log(totalTokens?.toString());
      if (totalTokens !== undefined) {
        if(totalTokens > 850) {
          toast.error("Przekroczono ilość tokenów!");
          return;
        }
      }

      const chatSession = await model?.startChat({generationConfig, history: chatHistory});

 


    
      let response = "";
      const result = await chatSession?.sendMessage(userInput);
      if(chatSession !== undefined){
        const countResult = await model?.countTokens({
          generateContentRequest: { contents: await chatSession?.getHistory()},
        });
        console.log("CHAT SESSION:",countResult?.totalTokens); // 10
        if (countResult !== undefined) {
          if(countResult.totalTokens > 1650) {
            toast.error("Przekroczono ilość tokenów!");
            return;
          }
        }
      }
     
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
    <div className="flex flex-col w-full h-full bg-gray-100 p-6">
      <FirstTitle>ESłówka - Chat AI 1.0.2</FirstTitle>
      <MainTitle>Chat AI</MainTitle>
      <div className="container mx-auto px-4 py-8 font-inter">
        {chatHistory.length > 0 ? (
          <ChatHistory chatHistory={chatHistoryGlobal.object} />
        ) : (
          !isLoading && (
            <div className="flex flex-col items-center justify-center max-h-[550px] max-lg:max-h-[450px] max-w-[1300px] border border-gray-300 rounded-xl p-6 text-gray-600 text-center">
              Rozpocznij chat, wpisując swoją wiadomość poniżej!
            </div>
          )
        )}
        {isLoading && (
          <div className="flex flex-col items-center justify-center max-h-[550px] max-lg:max-h-[450px] max-w-[1300px] border border-gray-300 rounded-xl p-6">
            <div className="animate-spin w-12 h-12 border-t-4 border-secondary rounded-full"></div>
          </div>
        )}

        <div className="flex flex-col mt-6 items-center gap-4">
          <div className="text-lg font-semibold text-fifth">Wprowadź swoją wiadomość!</div>
          <form
            className="flex flex-col sm:flex-row justify-center items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              className="bg-gray-200 h-12 rounded-lg p-4 w-80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
              type="text"
              placeholder="Twoja wiadomość"
              value={userInput}
              onChange={handleUserInput}
            />
            <button
              className="bg-secondary text-white font-bold text-lg px-8 py-3 rounded-lg hover:bg-secondary-dark transition duration-200"
              type="submit"
              disabled={isLoading}
            >
              Wyślij
            </button>
          </form>
          <button
            className="bg-red-500 text-white font-bold text-lg px-8 py-3 rounded-lg hover:bg-red-600 transition duration-200"
            onClick={clearChat}
          >
            Wyczyść Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIChatPage;
