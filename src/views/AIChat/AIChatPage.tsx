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
  //console.log(chatHistoryGlobal);
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
      //console.log(totalTokens?.toString());
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
        //console.log("CHAT SESSION:",countResult?.totalTokens); // 10
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

      //console.log("pushuje");
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
    <div className="relative flex w-full min-h-full bg-gray-50">
      <div className="flex flex-col w-full max-w-6xl mx-auto px-6 py-6 lg:py-10">
        {/* Header */}
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm rounded-2xl px-5 sm:px-6 py-4 mb-8">
          <div>
            <MainTitle>Chat AI</MainTitle>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Czarek jest online</span>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg rounded-2xl p-6 mb-6">
          {chatHistory.length > 0 ? (
            <ChatHistory chatHistory={chatHistoryGlobal.object} />
          ) : (
            !isLoading && (
              <div className="flex flex-col items-center justify-center max-h-[550px] max-lg:max-h-[450px] border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary to-secondarylight rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-2xl">🤖</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Witaj w Chat AI!</h3>
                <p className="text-gray-600 max-w-md">
                  Jestem Czarek, Twój asystent do nauki języków. Zapytaj mnie o słówka, gramatykę lub poproś o pomoc w nauce!
                </p>
              </div>
            )
          )}
          {isLoading && (
            <div className="flex flex-col items-center justify-center max-h-[550px] max-lg:max-h-[450px] border-2 border-dashed border-gray-200 rounded-xl p-12">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin w-12 h-12 border-t-4 border-secondary rounded-full"></div>
                <p className="text-gray-600 font-medium">Czarek myśli...</p>
              </div>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg rounded-2xl p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Napisz do Czarka</h3>
            <p className="text-sm text-gray-600">Zadaj pytanie lub poproś o listę słówek do nauki</p>
          </div>
          
          <form
            className="flex flex-col sm:flex-row gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <div className="flex-1">
              <input
                className="w-full h-12 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all duration-200 outline-none"
                type="text"
                placeholder="Np. 'Wygeneruj listę słówek o jedzeniu po niemiecku'"
                value={userInput}
                onChange={handleUserInput}
                disabled={isLoading}
              />
            </div>
            <button
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-secondarylight text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Wysyłanie...
                </>
              ) : (
                <>
                  <span>Wyślij</span>
                  <span>📤</span>
                </>
              )}
            </button>
          </form>
          
          <div className="flex justify-center mt-4">
            <button
              className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-all duration-200"
              onClick={clearChat}
            >
              <span>🗑️</span>
              <span className="font-medium">Wyczyść Chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIChatPage;
