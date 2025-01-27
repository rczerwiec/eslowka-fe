import { IStory } from "../../../shared/store/slices/UserSlice";
import Button from "../../../shared/components/Button";
import { Colors } from "../../../shared/Enums/Stylings";
import GenerateOwnModal from "./GenerateOwnStoryModal";
import useModal from "../../../shared/components/Modal/useModal";

interface IProps {
  level: string | undefined;
  language: string | undefined;
  allStories: IStory[];
}

function CreateOwnStoryComponent({ level, language, allStories }: IProps) {
  // Modal when generating own story
  const GenerateStoryModal = useModal();

  return (
    <>
      <div className="flex justify-center items-center lg:pb-6">
        <Button
          onClick={GenerateStoryModal.toggleModal}
          bgColor={Colors.SECONDARY}
          className="text-lg font-bold py-3 px-8 bg-gradient-to-r from-secondary to-secondarylight text-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition"
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
      />
    </>
  );
}

export default CreateOwnStoryComponent;
