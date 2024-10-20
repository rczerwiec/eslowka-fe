import ReactMarkdown from "react-markdown";
import { useModal } from "../../shared/components/Modal";
import AIWordModal from "./AIWordModal";
import { useState } from "react";
import { IChatHistoryPart } from "../../shared/store/slices/ChatHistorySlice";

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
              console.log("Sentences:", arraysOfSentences);
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
                console.log(sentence)
                return <p className="flex flex-wrap gap-1">{renderedSentence}</p>
              })

              
     
        }
        let color:string = ""
        let position="justify-end items-right"
        if(userType === "Ty:"){
            color = "bg-secondary"
            position = ""
        }

        return(
        <div className={"flex m-4 "+position} key={index}>
            <div className={color+"  shadow-xl p-3 w-fit rounded-xl "}>
                <div className="font-bold text-lg">{userType}</div>
                <div className="p-1 text-base">
                {message.role === 'model' ? (<span className="flex flex-wrap flex-col gap-1">{renderedWords}</span>) : (<p><ReactMarkdown>
                    {message.parts[0].text}</ReactMarkdown></p>)} 
                </div>

            </div>
        </div>
    )})
    return (
        <>
        {currentChatHistory.length>0 ?         <div className="flex flex-col overflow-y-scroll max-h-[550px] max-lg:max-h-[450px] max-w-[1300px] border border-solid border-fifth rounded-xl p-4">
            {currentChatHistory}
        </div>:<div></div>}

        <AIWordModal isVisible={AIModal.isVisible} onClose={AIModal.closeModal} word={selectedWord}/>
        </>
    );
}

export default ChatHistory;