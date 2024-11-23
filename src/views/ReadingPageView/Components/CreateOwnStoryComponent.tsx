import { IStory } from "../../../shared/store/slices/UserSlice";
import Button from "../../../shared/components/Button";
import { Colors } from "../../../shared/Enums/Stylings";
import GenerateOwnModal from "./GenerateOwnStoryModal";
import useModal from "../../../shared/components/Modal/useModal";

interface IProps{
    level: string | undefined,
    language: string | undefined,
    allStories: IStory[],
}

function CreateOwnStoryComponent({level,language,allStories}:IProps){
   //Modal when generating own story
   const GenerateStoryModal = useModal();



    return (
      <>
        <div className="flex px-4 justify-center items-center pt-2">
          <Button
            onClick={GenerateStoryModal.toggleModal}
            bgColor={Colors.SECONDARY}
          >
            Wygeneruj własną historię
          </Button>
        </div>
        <GenerateOwnModal
          isVisible={GenerateStoryModal.isVisible}
          onClose={GenerateStoryModal.closeModal}
          level={level}
          language={language}
          allStories={allStories}
        ></GenerateOwnModal>
      </>
    );
}

export default CreateOwnStoryComponent