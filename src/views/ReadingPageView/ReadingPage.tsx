import { useEffect, useState } from "react";
import CreateOwnStoryComponent from "./Components/CreateOwnStoryComponent";
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
        <div className="flex flex-col gap-6 ">
          <LanguageSelectorComponent
            changeLangaugeState={setLanguage}
            changeLevelState={setLevel}
            setPage={setPage}
            page={page}
            availablePages={availablePages}
          />
          <span className="lg:hidden">
          <CreateOwnStoryComponent level={level} language={language} allStories={allStories} />
          </span>
          <StoriesGridComponent
            stories={stories}
            onStorySelect={setSelectedStory}
            page={page}
            setAvailablePages={setAvailablePages}
          />
          <span className="max-lg:hidden">
          <CreateOwnStoryComponent level={level} language={language} allStories={allStories} />
          </span>
        </div>
      ) : (
  <div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-md font-inter">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div className="font-bold text-lg sm:text-xl text-gray-800">
        Tytuł: {selectedStory.title} ({selectedStory.level})
      </div>
      <div className="flex justify-center items-center gap-4 font-bold mt-2 sm:mt-0 text-gray-700">
        <div className="text-sm">
          {knownWordsLength}/{selectedStory.words.length}
        </div>
        <progress className="rounded-xl w-36 h-2" value={percentage}></progress>
      </div>
    </div>
    {/* Add scrolling for the word list on smaller screens */}
    <div className="flex flex-wrap gap-3 border p-4 rounded-xl bg-gray-50 max-h-[34rem] overflow-x-auto">
      {selectedStory.words.map((word) => {
        const bgColor =
          word.known === 1
            ? "bg-green-400"
            : word.known === 2
            ? "bg-orange-400"
            : word.known === 3
            ? "bg-red-600"
            : "bg-gray-200";

        return (
          <div
            key={word.id}
            className={`p-2 text-sm sm:text-base ${bgColor} rounded-lg hover:shadow-md cursor-pointer transition-transform transform hover:scale-105`}
            onClick={() => handleWordClick(word)}
            onContextMenu={(e) => handleWordContextMenu(word.word, e)}
          >
            {word.word}
          </div>
        );
      })}
    </div>
  </div>
)}
      <AIWordModal
        isVisible={StoryModal.isVisible}
        onClose={StoryModal.closeModal}
        word={selectedWord}
      />
    </PageTemplate>
  );
}

export default ReadingPage;