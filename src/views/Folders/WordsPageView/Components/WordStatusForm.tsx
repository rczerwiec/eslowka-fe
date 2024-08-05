import { FC, useState } from "react";
import { IWord } from "../../../../shared/store/slices/FolderSlice";
import { FaCheckCircle, FaFrownOpen } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { RootState, useUpdateWordStatusMutation } from "../../../../shared/store";
import { useSelector } from "react-redux";

const WordStatusForm: FC<{ word: IWord }> = (props): JSX.Element => {
  const user = useSelector((state: RootState) => state.userProfile);
  const [status, setStatus] = useState(props.word.known);
  const [updateStatus] = useUpdateWordStatusMutation();
  const changeStatus = async (changeTo: number) => {
    setStatus(changeTo);
    await updateStatus({updatedWord:{
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
    }, userID: user.value });
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

export default WordStatusForm;