import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHistory from "./ChatHistory";

function AIChatPage() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<
    Array<{ type: any; message: any }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInput = (e: any) => {
    setUserInput(e.target.value);
  };

  const apikey = process.env.REACT_APP_GEMINI_API_KEY;
  //console.log(apikey);
  let genAI;
  if (apikey !== undefined) {
    genAI = new GoogleGenerativeAI(apikey);
  }
  const model = genAI?.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

  const sendMessage = async () => {
    if (userInput.trim() === "") return;
    setIsLoading(true);

    try {
      const result = await model?.generateContent(userInput);
      const response = await result?.response;
      //console.log(response);
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response?.text() },
      ]);
    } catch {
      console.log("Error!");
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div
        className="flex pl-4 bg-fourth h-8  items-center
                                    text-fifth text-sm font-medium"
      >
        ESłówka - Chat AI 1.0.0
      </div>
      <div
        className="flex pl-4 h-20 items-center
                                    text-black text-3xl font-medium"
      >
        Chat AI
      </div>

      <div className="relative inline-block text-left font-inter">
        <div className="container mx-auto px-4 py-8">
          <div className="text-3xl font-bold">Twój Chat z AI:</div>
          <ChatHistory chatHistory={chatHistory}></ChatHistory>
          {isLoading && (
            <>
              <div>
                <div className="flex justify-center items-center h-12">
                  <div className="animate-spin w-12 h-12 text-black">O</div>
                </div>
              </div>
            </>
          )}
          <div className="flex mt-4">
            <div className="flex flex-col">
              <div className="flex justify-center items-center font-inter text-fifth font-bold">
                Wprowadź swoją wiadomość!
              </div>
              <div>
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
              </div>
            </div>
          </div>
          <button
            className="bg-secondary font-inter text-white font-bold text-xl w-fit px-16 py-2 rounded-xl"
            onClick={clearChat}
          >
            Wyczysc Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIChatPage;
