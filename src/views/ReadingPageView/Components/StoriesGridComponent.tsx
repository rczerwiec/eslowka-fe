import { useState } from "react";
import { IStory } from "../../../shared/store/slices/UserSlice";

interface IProps{
  stories?: any;
  onStorySelect: (story: IStory) => void;
  page:number;
  setAvailablePages: (page: number) => void;
}


function StoriesGridComponent({stories, onStorySelect,page,setAvailablePages}:IProps) {
  

  let renderedStories;
  if (stories) {
    if (stories.length > 0) {
      
      let availablePages = stories.length / 10;
      console.log(availablePages)
      availablePages = ~~availablePages + 1;
      setAvailablePages(availablePages);
      stories = stories.slice(10 * (page - 1), 10 * page - 1+1)
      renderedStories = stories.map((story: any) => {
        // let storyWords = story.words.map((word: any, index: number) => {
        //   if (word.word != "") {
        //     let bgColor = ""
        //     if(word.known === false){
        //       bgColor = "bg-green-400"
        //     }

        //     return (
        //       <span
        //         onClick={() => {}}
        //         className={"hover:bg-secondary hover:p-1 py-1 cursor-pointer rounded-xl flex-none "+bgColor}
        //       >
        //         {word.word}
        //       </span>
        //     );
        //   }
        // });
        return (
          <div
            onClick={() => {
              onStorySelect(story);
            }}
            className="flex flex-col shadow-lg h-full min-h-60 max-h-60 bg-white hover:bg-fourth hover:cursor-pointer rounded-lg m-2"
          >
            <div className="flex justify-between items-center bg-secondary py-1 rounded-lg">
              <div className=" ">
                {story.level === "A1" ? (
                  <span className="bg-green-400 p-2 rounded-lg border-black border-2">
                    {story.level}
                  </span>
                ) : story.level === "A2" ? (
                  <span className="bg-green-600 p-2 rounded-lg border-black border-2">
                    {story.level}
                  </span>
                ) : story.level === "B1" ? (
                  <span className="bg-yellow-400 p-2 rounded-lg border-black border-2">
                    {story.level}
                  </span>
                ) : story.level === "B2" ? (
                  <span className="bg-orange-400 p-2 rounded-lg border-black border-2">
                    {story.level}
                  </span>
                ) : story.level === "C1" ? (
                  <span className="bg-red-600 p-2 rounded-lg border-black border-2">
                    {story.level}
                  </span>
                ) : story.level === "C2" ? (
                  <span className="bg-violet-600 p-2 rounded-lg border-black border-2">
                    {story.level}
                  </span>
                ) : (
                  <span className="bg-black p-2 rounded-lg border-black border-2">
                    {story.level}
                  </span>
                )}
                <span className="p-2">{story.title}</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center h-full justify-between text-base p-2 text-left text-black font-thin ">
              <span className="flex flex-wrap flex-col gap-1">
                {story.description}
              </span>
            </div>
            <span className="flex text-white bg-secondarylight rounded-b-lg p-1 justify-center">{story.language}</span>
          </div>
        );
      });
    } else {
      renderedStories = <div>Brak historii do wyświetlenia.</div>;
    }
  }

  return (
    <div className="grid grid-cols-5 grid-rows-2 border-solid border-b-2 px-4 font-inter pt-2 gap-2">
      {renderedStories}
    </div>
  );
}

export default StoriesGridComponent;
