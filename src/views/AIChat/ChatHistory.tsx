import ReactMarkdown from "react-markdown";
import markdownToTxt from 'markdown-to-txt';
import { useModal } from "../../shared/components/Modal";
import AIWordModal from "./AIWordModal";
import { useState } from "react";



const ChatHistory = ({chatHistory}:any) => {
    let userType:string;
    const AIModal = useModal();
    let arraysOfWords: string[] = [];
    let renderedWords: any;
    const [selectedWord, setSelectedWord] = useState("");
    let currentChatHistory = chatHistory.map((message: any, index: number) => {
        let formattedMessage: string = message.message.toString();
        if(message.type === "user"){
            userType = "Ty:";
        } else {
            userType = "Bot Czarek:";
              arraysOfWords = formattedMessage.replaceAll('*',' ').replaceAll('\n','').split(' ');
              console.log(arraysOfWords);
              renderedWords =arraysOfWords.map((word)=>{
                if(word!=""){
                    return <div onClick={()=>{
                        AIModal.toggleModal();
                        setSelectedWord(word)
                    }} className="hover:bg-secondary hover:p-2 py-2 cursor-pointer rounded-xl flex-none"><ReactMarkdown>{word}</ReactMarkdown></div>
                }

            })
        }
        return(
        <div className="mt-4" key={index}>
            <div className="">
                <div className="font-bold text-lg">-{userType}</div>
                <div className="p-2 text-base w-fit">
                {message.type === 'bot' ? (<div className="w-20 flex gap-1">{renderedWords}</div>) : (<ReactMarkdown>
                    {message.message}</ReactMarkdown>)} 

                </div>

            </div>
        </div>
    )})
    return (
        <>
        <div className="flex flex-col overflow-y-scroll h-[550px] max-w-700 my-4">
            {currentChatHistory}
        </div>
        <AIWordModal isVisible={AIModal.isVisible} onClose={AIModal.closeModal} word={selectedWord}/>
        </>
    );
}

export default ChatHistory;