import ReactMarkdown from "react-markdown";
import { useModal } from "../../shared/components/Modal";
import AIWordModal from "./AIWordModal";
import { useState } from "react";
import { IChatHistoryPart } from "../../shared/store/slices/ChatHistorySlice";
import { motion } from "framer-motion"

interface IProps{
    chatHistory: IChatHistoryPart[];
}


const ChatHistory = ({chatHistory}:IProps) => {
    let userType:string;
    const AIModal = useModal();
    let arraysOfWords: string[] = [];
    let arraysOfSentences: string[] = [];
    let renderedWords: any;
    const [selectedWord, setSelectedWord] = useState("");
    if(!chatHistory) {
        return <div></div>
    }
    let currentChatHistory = chatHistory.map((message: any, index: number) => {
        let formattedMessage: string = message.parts[0].text.toString();
        if(message.role === "user"){
            userType = "Ty:";
        } else {
            userType = "Bot Czarek:";
              arraysOfSentences = formattedMessage.split('\n');
              arraysOfSentences = formattedMessage.split(/(?<!\*)\*(?!\*)/);
              renderedWords = arraysOfSentences.map((sentence)=>{
                arraysOfWords = sentence.replaceAll('*',' ').replaceAll('\n','').split(' ');

                const renderedSentence = arraysOfWords.map((word)=>{
                    if(word!=""){
                        return <span onClick={()=>{
                            setSelectedWord(word)
                            AIModal.toggleModal();
                        }} className="hover:bg-secondary hover:p-1 py-1 cursor-pointer rounded-xl flex-none">{word}</span>
                    }
    
                })
                return <p className="flex flex-wrap gap-1">{renderedSentence}</p>
              })

              
     
        }
        let color:string = ""
        let position="justify-end items-right pl-16 pb-4"
        if(userType === "Ty:"){
            color = "bg-secondary"
            position = "pr-16"
        }

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={"flex m-4 " + position}
            key={index}
          >
            <div className={color + " shadow-lg p-4 w-fit max-w-[80%] rounded-2xl "}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="font-semibold text-sm text-gray/90">{userType}</div>
              </div>
              <div className="text-base leading-relaxed">
                {message.role === "model" ? (
                  <span className="flex flex-wrap flex-col gap-1">
                    {renderedWords}
                  </span>
                ) : (
                  <p className="text-white">
                    <ReactMarkdown>{message.parts[0].text}</ReactMarkdown>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        );})
    return (
        <>
        {currentChatHistory.length>0 ?         
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col overflow-y-auto max-h-[550px] max-lg:max-h-[450px] space-y-2"
        >
            {currentChatHistory}
        </motion.div>:<div></div>}

        <AIWordModal isVisible={AIModal.isVisible} onClose={AIModal.closeModal} word={selectedWord}/>
        </>
    );
}

export default ChatHistory;