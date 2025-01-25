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

    renderedStories = paginatedStories.map((story) => (
      <div
        key={story.id}
        className="flex flex-col shadow-lg bg-white hover:bg-gray-100 hover:shadow-xl transition rounded-lg overflow-hidden"
      >
        <div className="flex justify-between items-center bg-secondary py-2 px-3">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onStorySelect(story)}
          >
            <span
              className={`p-2 rounded-md text-white text-sm font-semibold ${getLevelBgColor(story.level)}`}
            >
              {story.level}
            </span>
            <span className="font-bold text-lg truncate">{story.title}</span>
          </div>
          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => removeStory({ storyToRemove: story, userID: user.value })}
          >
            <FaTrashAlt />
          </button>
        </div>
        <div
          className="p-4 flex-1 text-gray-700 text-sm overflow-hidden cursor-pointer"
          onClick={() => onStorySelect(story)}
        >
          <p className="line-clamp-3 text-ellipsis overflow-hidden">{story.description}</p>
        </div>
        <div
          className="text-center text-white bg-secondarylight py-2 cursor-pointer"
          onClick={() => onStorySelect(story)}
        >
          {story.language}
        </div>
      </div>
    ));
  } else {
    renderedStories = <div className="text-center text-gray-500">Brak historii do wyświetlenia.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
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