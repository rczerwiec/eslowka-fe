import { useEffect, useState } from "react";
import GenerateOwnStoryModal from "./Components/GenerateOwnStoryModal";
import LanguageSelectorComponent from "./Components/LanguageSelectorComponent";
import StoriesGridComponent from "./Components/StoriesGridComponent";
import { useSelector } from "react-redux";
import { RootState, useGetUserStoriesQuery, useUpdateWordInStoryMutation } from "../../shared/store";
import PageTemplate from "../../shared/components/PageTemplate";
import { IStory } from "../../shared/store/slices/UserSlice";
import AIWordModal from "../AIChat/AIWordModal";
import useModal from "../../shared/components/Modal/useModal";

function ReadingPage() {
  const [page, setPage] = useState(1);
  const [availablePages, setAvailablePages] = useState(1);
  const [language, setLanguage] = useState<string>();
  const [level, setLevel] = useState<string>();
  const [selectedStory, setSelectedStory] = useState<IStory | undefined>();
  const [selectedWord, setSelectedWord] = useState("");
  const StoryModal = useModal();
  const GenerateStoryModal = useModal();

  const user = useSelector((state: RootState) => state.userProfile);
  const { data: userStories, isSuccess } = useGetUserStoriesQuery(user.value);
  const [updateWord] = useUpdateWordInStoryMutation();

  const filterStories = (stories: IStory[], lang?: string, lvl?: string): IStory[] => {
    return stories.filter((story) => {
      if (!story.language || !story.level) return true;
      const matchesLanguage = lang ? story.language === lang : true;
      const matchesLevel = lvl ? story.level === lvl : true;
      return matchesLanguage && matchesLevel;
    });
  };

  const stories = isSuccess ? filterStories(userStories, language, level) : [];
  const allStories = isSuccess ? userStories : [];
  const knownWords = selectedStory?.words.filter((word) => word.known > 0) ?? [];
  const knownWordsLength = knownWords.length;
  const percentage = selectedStory ? knownWordsLength / selectedStory.words.length : 0;

  const handleWordClick = (word: any) => {
    if (!selectedStory) return;
    const updatedWords = selectedStory.words.map((w) =>
      w.id === word.id ? { ...w, known: (w.known + 1) % 4 } : w
    );
    setSelectedStory({ ...selectedStory, words: updatedWords });
    updateWord({
      userID: user.value,
      storyID: selectedStory.id,
      storyWordID: word.id,
      word,
    });
  };

  const handleWordContextMenu = (word: string, event: React.MouseEvent) => {
    event.preventDefault();
    setSelectedWord(word);
    StoryModal.toggleModal();
  };

  return (
    <PageTemplate
      firstTitle="Ćwicz Czytanie"
      mainTitle="Ćwicz Czytanie"
      backButton
      childrenButton={
        selectedStory && (
          <button
            className="flex items-center text-xl bg-secondary rounded-xl px-4 py-2 hover:cursor-pointer hover:bg-secondarylight transition duration-200"
            onClick={() => setSelectedStory(undefined)}
          >
            Wróć
          </button>
        )
      }
    >
      {!selectedStory ? (
        <div className="flex flex-col gap-6">
          <LanguageSelectorComponent
            changeLangaugeState={setLanguage}
            changeLevelState={setLevel}
            setPage={setPage}
            page={page}
            availablePages={availablePages}
            onGenerateStory={GenerateStoryModal.toggleModal}
          />
          <div className="px-4 lg:px-8">
            <div className="max-h-[calc(100vh-400px)] overflow-y-auto">
              <StoriesGridComponent
                stories={stories}
                onStorySelect={setSelectedStory}
                page={page}
                setAvailablePages={setAvailablePages}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg rounded-2xl overflow-hidden">
          {/* Header sekcja */}
          <div className="bg-gradient-to-r from-secondary to-secondarylight p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-white/20 text-white text-sm font-bold rounded-full">
                  {selectedStory.level}
                </span>
                <h1 className="font-bold text-xl sm:text-2xl text-white">
                  {selectedStory.title}
                </h1>
              </div>
              
              {/* Progress sekcja */}
              <div className="flex items-center gap-4 bg-black/20 rounded-xl px-4 py-3">
                <div className="text-white text-sm font-semibold">
                  Postęp: {knownWordsLength}/{selectedStory.words.length}
                </div>
                <div className="w-32 bg-black/30 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-white h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage * 100}%` }}
                  ></div>
                </div>
                <div className="text-white text-xs font-bold">
                  {Math.round(percentage * 100)}%
                </div>
              </div>
            </div>
          </div>

          {/* Słowa sekcja */}
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Słowa w historii</h2>
              <p className="text-sm text-gray-600">
                Kliknij słowo, aby zmienić jego status. Kliknij prawym przyciskiem, aby dodać do folderu.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 max-h-[34rem] overflow-y-auto p-4 bg-gray-50 rounded-xl border border-gray-200 relative">
              {selectedStory.words.map((word) => {
                const getWordStatus = (known: number) => {
                  switch (known) {
                    case 1: return { bg: "bg-green-100", border: "border-green-300", text: "text-green-800" };
                    case 2: return { bg: "bg-orange-100", border: "border-orange-300", text: "text-orange-800" };
                    case 3: return { bg: "bg-red-100", border: "border-red-300", text: "text-red-800" };
                    default: return { bg: "bg-gray-100", border: "border-gray-300", text: "text-gray-800" };
                  }
                };

                const status = getWordStatus(word.known);

                return (
                  <div
                    key={word.id}
                    className={`group relative px-3 py-2 ${status.bg} ${status.border} ${status.text} border rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-md`}
                    onClick={() => handleWordClick(word)}
                    onContextMenu={(e) => handleWordContextMenu(word.word, e)}
                  >
                    <span className="font-medium text-sm">{word.word}</span>
                    
                    {/* Hover tooltip - dynamic positioning */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 tooltip-top">
                      Kliknij, aby zmienić status
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Statystyki */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {selectedStory.words.filter(w => w.known === 1).length}
                </div>
                <div className="text-sm text-green-700 font-medium">Znane</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {selectedStory.words.filter(w => w.known === 2).length}
                </div>
                <div className="text-sm text-orange-700 font-medium">Częściowo</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {selectedStory.words.filter(w => w.known === 3).length}
                </div>
                <div className="text-sm text-red-700 font-medium">Trudne</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {selectedStory.words.filter(w => w.known === 0).length}
                </div>
                <div className="text-sm text-gray-700 font-medium">Nowe</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <AIWordModal
        isVisible={StoryModal.isVisible}
        onClose={StoryModal.closeModal}
        word={selectedWord}
      />
      <GenerateOwnStoryModal
        isVisible={GenerateStoryModal.isVisible}
        onClose={GenerateStoryModal.closeModal}
        level={level}
        language={language}
        allStories={allStories}
      />
    </PageTemplate>
  );
}

export default ReadingPage;