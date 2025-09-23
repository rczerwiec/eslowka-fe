import { useState } from "react";
import { IStory } from "../../../shared/store/slices/UserSlice";
import { FaTrashAlt } from "react-icons/fa";
import { RootState, useDeleteStoryMutation } from "../../../shared/store";
import { useSelector } from "react-redux";

interface IProps {
  stories?: IStory[];
  onStorySelect: (story: IStory) => void;
  page: number;
  setAvailablePages: (page: number) => void;
}

function StoriesGridComponent({ stories, onStorySelect, page, setAvailablePages }: IProps) {
  const [removeStory] = useDeleteStoryMutation();
  const user = useSelector((state: RootState) => state.userProfile);

  let renderedStories;

  if (stories && stories.length > 0) {
    const availablePages = Math.ceil(stories.length / 8);
    setAvailablePages(availablePages);

    const paginatedStories = stories.slice(8 * (page - 1), 8 * page);

    renderedStories = paginatedStories.map((story) => {
      // Oblicz progress dla każdej historii
      const knownWords = story.words.filter((word) => word.known > 0);
      const knownWordsLength = knownWords.length;
      const totalWords = story.words.length;
      const percentage = totalWords > 0 ? knownWordsLength / totalWords : 0;

      return (
        <div
          key={story.id}
          className="flex flex-col bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden min-h-[240px] group"
        >
          {/* Górna sekcja karty */}
          <div className="flex justify-between items-center bg-gradient-to-r from-secondary to-secondarylight py-3 px-4">
            <div
              className="flex items-center gap-3 cursor-pointer flex-1"
              onClick={() => onStorySelect(story)}
            >
              <span
                className={`px-3 py-1 rounded-full text-white text-xs font-bold ${getLevelBgColor(
                  story.level
                )}`}
              >
                {story.level}
              </span>
              <span className="font-bold text-lg text-white truncate">{story.title}</span>
            </div>
            <button
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200"
              onClick={() => removeStory({ storyToRemove: story, userID: user.value })}
            >
              <FaTrashAlt className="text-sm" />
            </button>
          </div>

          {/* Opis */}
          <div
            className="p-4 flex-1 text-gray-700 text-sm overflow-hidden cursor-pointer"
            onClick={() => onStorySelect(story)}
          >
            <p className="line-clamp-3 text-ellipsis overflow-hidden leading-relaxed">{story.description}</p>
          </div>

          {/* Progress Bar Section */}
          <div className="px-4 pb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-600">Postęp</span>
              <span className="text-xs font-bold text-secondary">
                {knownWordsLength}/{totalWords}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-secondary to-secondarylight h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Dolna sekcja karty - język w prawym górnym rogu */}
          <div className="px-4 pb-3 flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {story.language}
            </div>
            <div className="text-xs text-gray-400">
              Kliknij, aby otworzyć
            </div>
          </div>
        </div>
      );
    });
  } else {
    renderedStories = <div className="text-center text-gray-500">Brak historii do wyświetlenia.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4">
      {renderedStories}
    </div>
  );
}

function getLevelBgColor(level: string): string {
  switch (level) {
    case "A1":
      return "bg-green-400";
    case "A2":
      return "bg-green-600";
    case "B1":
      return "bg-yellow-400";
    case "B2":
      return "bg-orange-400";
    case "C1":
      return "bg-red-600";
    case "C2":
      return "bg-violet-600";
    default:
      return "bg-gray-400";
  }
}

export default StoriesGridComponent;
