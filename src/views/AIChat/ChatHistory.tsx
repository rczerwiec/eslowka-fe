import ReactMarkdown from "react-markdown";

const ChatHistory = ({chatHistory}:any) => {

    let userType:string;
    let currentChatHistory = chatHistory.map((message: any, index: number) => {
        if(message.type === "user"){
            userType = "Ty:";
        } else {
            userType = "Bot Czarek:";
        }
        return(
        <div className="mt-4" key={index}>
            <div className="">
                <div className="font-bold text-lg">-{userType}</div>
                <div className="p-2 text-base">
                <ReactMarkdown>{message.message}</ReactMarkdown>
                </div>

            </div>
        </div>
    )})

    return (
        <div className="chat-history overflow-y-scroll h-[550px] my-4">
            {currentChatHistory}
        </div>
    );
}

export default ChatHistory;