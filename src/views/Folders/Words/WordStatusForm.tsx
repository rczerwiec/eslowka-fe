import { FC, useState } from "react";
import { IWord } from "../../../shared/store/slices/FolderSlice";
import { FaCheckCircle, FaFrownOpen } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { useUpdateWordStatusMutation } from "../../../shared/store";

const AddWordsForm: FC<{ word: IWord }> = (props): JSX.Element => {
  const [status, setStatus] = useState(props.word.known);
  const [updateStatus] = useUpdateWordStatusMutation();
  const changeStatus = async (changeTo: number) => {
    setStatus(changeTo);
    await updateStatus({
      word: {
        word: props.word.word,
        folderId: props.word.folderId,
        translation: props.word.translation,
        id: props.word.id,
        known: changeTo,
        repeated: props.word.repeated,
        streak: props.word.streak,
        reverseStreak: props.word.reverseStreak,
      },
      folderID: props.word.folderId,
    });
  }

  let renderStatus;
  if (status === 0){
    renderStatus = (
        <div className="flex justify-center gap-3">
            <FaFrownOpen className="text-red-500 border rounded-lg border-black"/>
            <GrInProgress className="hover:cursor-pointer" onClick={()=>{changeStatus(1)}} />
            <FaCheckCircle className="hover:cursor-pointer" onClick={()=>{changeStatus(2)}} />
        </div>
)
  }
  else if (status === 1){
    renderStatus = (
    <div className="flex justify-center gap-3">
    <FaFrownOpen className="hover:cursor-pointer" onClick={()=>{changeStatus(0)}}/>
    <GrInProgress className="text-orange-600 border rounded-lg border-black" />
    <FaCheckCircle className="hover:cursor-pointer" onClick={()=>{changeStatus(2)}} />
</div>)}
  else{
    renderStatus = (
    <div className="flex justify-center gap-3">
    <FaFrownOpen className="hover:cursor-pointer" onClick={()=>{changeStatus(0)}} />
    <GrInProgress className="hover:cursor-pointer" onClick={()=>{changeStatus(1)}} />
    <FaCheckCircle className="text-green-500 border rounded-lg border-black" />
</div>)
  }

  return (
        <>
        {renderStatus}
        </>
  );
};

export default AddWordsForm;

// let statusIcon = <div className="flex justify-center items-center h-14 p-4"><FaCheckCircle className="flex justify-center items-center h-14 text-green-500" /></div>;
// if (word.known === 0) {
//   statusIcon = <div className="flex justify-center items-center h-14 p-4"><FaFrownOpen className="flex justify-center items-center h-14 text-red-500" /></div>;
// } else if (word.known === 1) {
//   statusIcon = <div className="flex justify-center items-center h-14 p-4"><GrInProgress className="flex justify-center items-center h-14 text-orange-500"/></div>
// }
