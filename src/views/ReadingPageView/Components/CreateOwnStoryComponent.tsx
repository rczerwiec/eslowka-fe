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
      <div className="bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm border border-gray-200 shadow-xl rounded-3xl p-8 mb-6 relative overflow-hidden">
        {/* Dekoracyjne elementy */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/10 to-secondarylight/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondarylight/10 to-secondary/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10 text-center">
          {/* Ikona */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-secondary to-secondarylight rounded-2xl mb-4 shadow-lg">
            <span className="text-white text-2xl">✨</span>
          </div>
          
          {/* Tytuł */}
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Stwórz własną historię</h3>
          
          {/* Opis */}
          <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
            Wygeneruj spersonalizowaną historię do nauki z AI. Wybierz temat, a Czarek stworzy dla Ciebie idealną historię!
          </p>
          
          {/* Przycisk */}
          <Button
            onClick={GenerateStoryModal.toggleModal}
            bgColor={Colors.SECONDARY}
            className="inline-flex items-center gap-3 text-lg font-bold py-4 px-8 bg-gradient-to-r from-secondary to-secondarylight text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-secondarylight hover:to-secondary"
          >
            <span className="text-xl">🚀</span>
            <span>Wygeneruj własną historię</span>
          </Button>
          
          {/* Dodatkowe informacje */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <span>🤖</span>
              <span>AI Powered</span>
            </div>
            <div className="flex items-center gap-1">
              <span>📚</span>
              <span>Personalizowane</span>
            </div>
            <div className="flex items-center gap-1">
              <span>⚡</span>
              <span>Szybkie</span>
            </div>
          </div>
        </div>
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
